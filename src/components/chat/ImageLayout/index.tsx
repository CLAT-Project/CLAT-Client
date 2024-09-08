import Image from 'next/image'

interface ImageLayoutProps {
  images: string[];
}

const SingleImage = ({ image }: { image: string }) => (
  <div className="flex justify-center items-center z-10 border border-[#363d5540]">
    <Image src={image} alt="message" width={400} height={400} className='w-[255px] h-[173px] object-cover' />
  </div>
);

const DoubleImage = ({ images }: { images: string[] }) => (
  <div className="flex gap-[10px] ">
    {images.map((image) => (
      <div key={image} className="w-[150px] h-[150px] border border-[#363d5540]">
        <Image src={image} alt="message" width={400} height={400} className='w-[150px] h-[173px] object-cover' />
      </div>
    ))}
  </div>
);

const TripleImage = ({ images }: { images: string[] }) => (
  <div className="flex gap-[10px] justify-between">
    <div className="w-[91px] h-[173px]  border border-[#363d5540]">
      <Image src={images[0]} alt="message" width={400} height={400} className='w-[91px] h-[173px] object-cover' />
    </div>
    <div className="flex flex-col gap-[6px]">
      {images.slice(1).map((image) => (
        <div key={image} className="w-[195px] h-[82px] border border-[#363d5540]">
          <Image src={image} alt="message" width={400} height={400} className='w-full h-full object-cover' />
        </div>
      ))}
    </div>
  </div>
);

const QuadImage = ({ images }: { images: string[] }) => (
  <div className="grid grid-cols-2 gap-[10px] ">
    {images.map((image) => (
      <div key={image} className="w-[153px] h-[82px] border border-[#363d5540]">
        <Image src={image} alt="message" width={400} height={400} className='w-[153px] h-[82px] object-cover' />
      </div>
    ))}
  </div>
);

const PentaImage = ({ images }: { images: string[] }) => (
  <div className="flex gap-[10px]">
    <div className="flex flex-col gap-[10px]">
      {images.slice(0, 2).map((image) => (
        <div key={image} className="w-[154px] h-[97px] border border-[#363d5540]">
          <Image src={image} alt="message" width={400} height={400} className='w-full h-full object-cover' />
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-[10px]">
      {images.slice(2, 5).map((image) => (
        <div key={image} className="w-[154px] h-[62px] border border-[#363d5540]">
          <Image src={image} alt="message" width={400} height={400} className='w-[154px] h-[62px] object-cover ' />
        </div>
      ))}
    </div>
  </div>
);


const ImageLayout = ({ images }: ImageLayoutProps) => {
  switch (images.length) {
    case 1:
      return <SingleImage image={images[0]} />;
    case 2:
      return <DoubleImage images={images} />;
    case 3:
      return <TripleImage images={images} />;
    case 4:
      return <QuadImage images={images} />;
    case 5:
      return <PentaImage images={images} />;
    default:
      return <PentaImage images={images.slice(0, 5)} />;
  }
};

export default ImageLayout;