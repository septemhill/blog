import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPostIds, getPostData, PostData } from '@/lib/posts';
import Link from 'next/link';

export default function Post({ postData }: { postData: PostData }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <article>
        <h1 className="text-4xl font-bold mb-2">{postData.title}</h1>
        <div className="text-gray-500 mb-4">
          {postData.date}
        </div>
        <div className="mb-4">
            {postData.tags.map(tag => (
                <Link key={tag} href={`/tags/${tag}`} className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 hover:bg-gray-300">
                    {tag}
                </Link>
            ))}
        </div>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} />
      </article>
      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
