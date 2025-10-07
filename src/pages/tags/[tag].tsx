import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { getAllTags, getPostsByTag, PostData } from '@/lib/posts';
import Pagination from '@/components/Pagination';
import { POSTS_PER_PAGE } from '@/lib/config';

export default function Tag({ 
  allPosts, 
  tag, 
}: { 
  allPosts: PostData[], 
  tag: string, 
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Client-side pagination logic
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const postsToDisplay = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Posts tagged with: <span className="text-blue-600">{tag}</span>
      </h1>
      <ul className="space-y-6">
        {postsToDisplay.map(({ id, date, title, tags }) => (
          <li
            key={id}
            className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
          >
            <Link href={`/posts/${id}`} className="text-2xl font-semibold text-blue-600 hover:underline">
                {title}
            </Link>
            <br />
            <small className="text-gray-500">
              {date}
            </small>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map(t => (
                <Link key={t} href={`/tags/${t}`} className={`text-sm px-2 py-1 rounded-full transition-colors duration-200 ${t === tag ? 'bg-blue-600 text-white cursor-default' : 'bg-gray-600 text-gray-200 hover:bg-gray-500'}`}>
                    {t}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      )}
       <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags();
  const paths = tags.map((tag) => ({
    params: { tag },
  }));
  // Note: We are not pre-generating /tags/[tag]/page/[pageNumber] paths.
  // The pagination is now handled on the client-side, so only the main tag page is needed at build time.
  // If you wanted to keep static pagination for tags, you would need a different file structure like /tags/[tag]/[page].tsx
  // and generate all those paths here.

  return {
    paths,
    // fallback: false means pages for tags that don't exist will 404.
    // This is fine since we are handling pagination on the client.
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.tag) {
    return {
      notFound: true,
    };
  }
  const tag = params.tag as string;
  const allPosts = getPostsByTag(tag);

  return {
    props: {
      allPosts,
      tag,
    },
  };
};
