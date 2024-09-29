import Image from 'next/image'

interface ImageLayoutProps {
  images?: string[]
}

const SingleImage = ({ image }: { image?: string }) => (
  <div className="z-10 flex items-center justify-center border border-[#363d5540]">
    <Image
      src={image || ''}
      alt="message"
      width={400}
      height={400}
      className="h-[173px] w-[255px] object-cover"
    />
  </div>
)

const DoubleImage = ({ images }: { images?: string[] }) => (
  <div className="flex gap-[10px]">
    {images?.map((image) => (
      <div
        key={image}
        className=" w-[150px] border border-[#363d5540]"
      >
        <Image
          src={image || ''}
          alt="message"
          width={400}
          height={400}
          className="h-[173px] w-[150px] object-cover"
        />
      </div>
    ))}
  </div>
)

const TripleImage = ({ images }: { images?: string[] }) => (
  <div className="flex justify-between gap-[10px]">
    <div className="h-[173px] w-[91px] border border-[#363d5540]">
      <Image
        src={images?.[0] || ''}
        alt="message"
        width={400}
        height={400}
        className="h-[173px] w-[91px] object-cover"
      />
    </div>
    <div className="flex flex-col gap-[6px]">
      {images?.slice(1).map((image) => (
        <div
          key={image}
          className="h-[82px] w-[195px] border border-[#363d5540]"
        >
          <Image
            src={image || ''}
            alt="message"
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  </div>
)

const QuadImage = ({ images }: { images?: string[] }) => (
  <div className="grid grid-cols-2 gap-[10px]">
    {images?.map((image) => (
      <div key={image} className="h-[82px] w-[153px] border border-[#363d5540]">
        <Image
          src={image || ''}
          alt="message"
          width={400}
          height={400}
          className="h-[82px] w-[153px] object-cover"
        />
      </div>
    ))}
  </div>
)

const PentaImage = ({ images }: { images?: string[] }) => (
  <div className="flex gap-[10px]">
    <div className="flex flex-col gap-[10px]">
      {images?.slice(0, 2).map((image) => (
        <div
          key={image}
          className="h-[97px] w-[154px] border border-[#363d5540]"
        >
          <Image
            src={image || ''}
            alt="message"
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-[10px]">
      {images?.slice(2, 5).map((image) => (
        <div
          key={image}
          className="h-[62px] w-[154px] border border-[#363d5540]"
        >
          <Image
            src={image || ''}
            alt="message"
            width={400}
            height={400}
            className="h-[62px] w-[154px] object-cover"
          />
        </div>
      ))}
    </div>
  </div>
)

const ImageLayout = ({ images }: ImageLayoutProps) => {
  switch (images?.length) {
    case 1:
      return <SingleImage image={images[0]} />
    case 2:
      return <DoubleImage images={images} />
    case 3:
      return <TripleImage images={images} />
    case 4:
      return <QuadImage images={images} />
    case 5:
      return <PentaImage images={images} />
    default:
      return <PentaImage images={images?.slice(0, 5) || []} />
  }
}

export default ImageLayout
