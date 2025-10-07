import Meta from '@/components/Meta';
import Avatar from '@/components/Avatar';
import { useRouter } from 'next/router';

const AboutPage = () => {
  const router = useRouter();
  const basePath = router.basePath || ''; // 獲取 basePath，如果未設定則為空字串

  return (
    <>
      <Meta title="關於我" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-left p-8">
          <Avatar src={`${basePath}/avatar.jpg`} alt="我的頭像" /> {/* 動態設定圖片路徑 */}
          <div className="text-left text-[#7c7ced]">
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
