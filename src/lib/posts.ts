import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  id: string;
  contentHtml?: string;
  title: string;
  date: string;
  tags: string[];
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      tags: matterResult.data.tags,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
    tags: matterResult.data.tags,
    ...matterResult.data,
  };
}

export function getAllTags() {
    const allPosts = getSortedPostsData();
    const allTags = new Set<string>();
    allPosts.forEach(post => {
        post.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
}

export function getPostsByTag(tag: string): PostData[] {
    const allPosts = getSortedPostsData();
    return allPosts.filter(post => post.tags.includes(tag));
}

import { POSTS_PER_PAGE } from './config';

export function getNumberOfPages(): number {
    const allPosts = getSortedPostsData();
    return Math.ceil(allPosts.length / POSTS_PER_PAGE);
}

export function getNumberOfPagesByTag(tag: string): number {
    const allPosts = getPostsByTag(tag);
    return Math.ceil(allPosts.length / POSTS_PER_PAGE);
}
