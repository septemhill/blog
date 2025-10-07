import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { POSTS_PER_PAGE } from '../lib/config';
import { getSortedPostsData, PostData } from '../lib/posts';
import Pagination from '../components/Pagination';

export default function Home({
  allPosts,
}: {
  allPosts: PostData[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 客戶端分頁的當前頁碼
  
  // 使用 useMemo 篩選文章，避免不必要的重複計算
  const filteredPosts = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    if (!lowerCaseQuery) {
      return allPosts; // 如果沒有搜尋關鍵字，顯示所有文章
    }
    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseQuery) || // 搜尋標題
        post.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery)) // 搜尋標籤
    );
  }, [searchQuery, allPosts]);
  
  // 計算客戶端分頁的總頁數和要顯示的文章
  const clientTotalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const postsToDisplay = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );
  
  // 當搜尋關鍵字改變時，重置回第一頁
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 搜尋輸入框 */}
      <div className="mb-8 flex justify-end">
        <input
          type="text"
          placeholder="搜尋文章標題或標籤..."
          className="w-full sm:w-1/2 md:w-1/3 p-3 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      
      <ul className="space-y-6">
        {postsToDisplay.length === 0 ? (
          <p className="text-gray-400 text-center">沒有找到符合條件的文章。</p>
        ) : (
          postsToDisplay.map(({ id, date, title, tags }) => (
            <li
              key={id}
              className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
            >
              <Link
                href={`/posts/${id}`}
                className="text-2xl font-semibold text-blue-600 hover:underline"
              >
                {title}
              </Link>
              <br />
              <small className="text-gray-500">{date}</small>
              <div className="mt-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 hover:bg-gray-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </li>
          ))
        )}
      </ul>
      {/* 客戶端分頁元件，只有在總頁數大於1時顯示 */}
      {clientTotalPages > 1 && (
        <Pagination
          totalPages={clientTotalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
  
export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getSortedPostsData();

  return {
    props: {
      allPosts, // 將所有文章傳遞給 Home 元件
    },
  };
};
