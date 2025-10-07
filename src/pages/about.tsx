import Meta from '@/components/Meta';
import Avatar from '@/components/Avatar';

const AboutPage = () => {
  return (
    <>
      <Meta title="關於我" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-left p-8">
          <Avatar src="/avatar.jpg" alt="我的頭像" />
          <div className="text-left text-[#7c7ced]">
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
