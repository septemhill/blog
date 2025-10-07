import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
};

const Avatar = ({ src, alt }: Props) => {
  return (
    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
      <Image
        src={src}
        alt={alt}
        width={128}
        height={128}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default Avatar;
