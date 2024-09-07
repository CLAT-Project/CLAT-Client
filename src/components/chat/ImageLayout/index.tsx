import Image from 'next/image'

interface ImageLayoutProps {
  images: string[];
}

const SingleImage = ({ image }: { image: string }) => (
  <div className="flex justify-center items-center w-[225px] h-[175px]  z-10">
    <Image src={image} alt="message" width={400} height={400} className='w-full h-full' />
  </div>
);

const DoubleImage = ({ images }: { images: string[] }) => (
  <div className="flex gap-[10px] ">
    {images.map((image) => (
      <div key={image} className="w-[150px] h-[150px]  z-10">
        <Image src={image} alt="message" width={400} height={400} className='w-full h-full' />
      </div>
    ))}
  </div>
);

const TripleImage = ({ images }: { images: string[] }) => (
  <div className="flex gap-[10px] justify-between">
    <div className="w-[91px] h-[173px]  z-10">
      <Image src={images[0]} alt="message" width={400} height={400} className='w-[91px] h-[173px]' />
    </div>
    <div className="flex flex-col gap-[6px]">
      {images.slice(1).map((image) => (
        <div key={image} className="w-[195px] h-[82px]  z-10">
          <Image src={image} alt="message" width={400} height={400} className='w-full h-full' />
        </div>
      ))}
    </div>
  </div>
);

const QuadImage = ({ images }: { images: string[] }) => (
  <div className="grid grid-cols-2 gap-[10px] ">
    {images.map((image) => (
      <div key={image} className="w-[153px] h-[82px]  z-10">
        <Image src={image} alt="message" width={400} height={400} className='w-[153px] h-[82px]' />
      </div>
    ))}
  </div>
);

const PentaImage = ({ images }: { images: string[] }) => (
  <div className="flex gap-[10px]">
    <div className="flex flex-col gap-[10px]">
      {images.slice(0, 2).map((image) => (
        <div key={image} className="w-[154px] h-[97px]  z-10">
          <Image src={image} alt="message" width={400} height={400} className='w-full h-full ' />
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-[10px]">
      {images.slice(2, 5).map((image) => (
        <div key={image} className="w-[154px] h-[62px]   z-10">
          <Image src={image} alt="message" width={400} height={400} className='w-[154px] h-[62px]  ' />
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