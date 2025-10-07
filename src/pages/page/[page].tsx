import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getSortedPostsData, PostData, getNumberOfPages } from '@/lib/posts';
import Pagination from '@/components/Pagination';
import { POSTS_PER_PAGE } from '@/lib/config';

// This component is almost identical to the homepage, but it's for paginated pages.
export default function Page({ 
  posts, 
  totalPages, 
  currentPage 
}: { 
  posts: PostData[], 
  totalPages: number, 
  currentPage: number 
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="space-y-6">
        {posts.map(({ id, date, title, tags }) => (
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
              {tags.map(tag => (
                <Link key={tag} href={`/tags/${tag}`} className="text-sm bg-gray-600 text-gray-200 px-2 py-1 rounded-full hover:bg-gray-500 transition-colors duration-200">
                    {tag}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} currentPage={currentPage} basePath="" />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPages = getNumberOfPages();
  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { page: String(i + 2) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = Number(params?.page) || 1;
  const allPostsData = getSortedPostsData();
  const totalPages = getNumberOfPages();

  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = allPostsData.slice(startIndex, endIndex);

  return {
    props: {
      posts,
      totalPages,
      currentPage: page,
    },
  };
};
