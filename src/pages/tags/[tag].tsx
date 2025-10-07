import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getAllTags, getPostsByTag, PostData, getNumberOfPagesByTag } from '../../lib/posts';
import Pagination from '../../components/Pagination';
import { POSTS_PER_PAGE } from '../../lib/config';

export default function Tag({ 
  posts, 
  tag, 
  totalPages, 
  currentPage 
}: { 
  posts: PostData[], 
  tag: string, 
  totalPages: number, 
  currentPage: number 
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Posts tagged with: <span className="text-blue-600">{tag}</span>
      </h1>
      <ul className="space-y-6">
        {posts.map(({ id, date, title, tags }) => (
          <li key={id} className="border p-4 rounded-lg">
            <Link href={`/posts/${id}`} className="text-2xl font-semibold text-blue-600 hover:underline">
                {title}
            </Link>
            <br />
            <small className="text-gray-500">
              {date}
            </small>
            <div className="mt-2">
              {tags.map(t => (
                <Link key={t} href={`/tags/${t}`} className={`text-sm ${t === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} px-2 py-1 rounded-full mr-2 hover:bg-gray-300`}>
                    {t}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} currentPage={currentPage} basePath={`/tags/${tag}`} />
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
  const paths = tags.map(tag => ({
    params: { tag },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.tag) {
    return {
      notFound: true,
    };
  }
  const tag = params.tag as string;
  const allPostsForTag = getPostsByTag(tag);
  const totalPages = getNumberOfPagesByTag(tag);
  const posts = allPostsForTag.slice(0, POSTS_PER_PAGE);

  return {
    props: {
      posts,
      tag,
      totalPages,
      currentPage: 1,
    },
  };
};
