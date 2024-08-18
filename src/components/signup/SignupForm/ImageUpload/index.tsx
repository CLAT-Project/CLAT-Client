import React, { useRef } from 'react'

interface ImageUploadProps {
  onChange: (file: File | null, filename: string) => void
  selectedImgName: string
}

const ImageUpload = ({ onChange, selectedImgName }: ImageUploadProps) => {
  const imgRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (imgRef.current) {
      imgRef.current.click()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]

    if (imageFile) {
      onChange(imageFile, imageFile.name)
    } else {
      onChange(null, '')
    }
  }

  return (
    <div className="relative flex items-center gap-5">
      <input
        className={`hidden`}
        type="file"
        accept="image/*"
        ref={imgRef}
        onChange={handleChange}
      />
      <div className="flex w-[540px] items-center justify-between">
        <label className="required relative text-[14px]">증명서</label>
        <p className="signup-input flex items-center">
          <span>{selectedImgName}</span>
        </p>
      </div>
      <div
        className="cursor-pointer rounded-[8px] bg-primary px-[23px] py-[7px] text-[14px] text-white"
        onClick={handleClick}
      >
        파일 선택
      </div>
      <div className="absolute -bottom-2 left-1/4 h-[10px]">
        <p className="color-[0a0a0a] mt-1 text-[10px]">
          재직/재학 증명서를 첨부해주십시오.
        </p>
      </div>
    </div>
  )
}

export default ImageUpload
