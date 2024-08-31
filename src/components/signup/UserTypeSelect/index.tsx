import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface IUserTypeSelectProps {
  onNext: () => void
  setUserType: Dispatch<SetStateAction<string>>
}

const UserTypeSelect = ({ onNext, setUserType }: IUserTypeSelectProps) => {
  const onClickUserType = (userType: string) => {
    if (userType === 'STUDENT') {
      setUserType('STUDENT')
    } else if (userType === 'PROFESSOR') {
      setUserType('PROFESSOR')
    }
    onNext()
  }

  return (
    <div className="mx-auto w-[60%]">
      <p className="w-full pr-[20px] pt-[11px] text-right text-[11px]">
        <span className="text-red-400">*</span> 표시는 필수 항목입니다.
      </p>
      <div className="mt-[45px] flex flex-col items-center justify-center">
        <p className="pb-[17px] text-[36px] font-bold">회원구분</p>
        <p>
          유형에 따라 제공되는 서비스가 다르니 본인에 해당하는 회원 유형을
          선택해주세요.
        </p>
      </div>
      <div className="mt-[84px] flex w-full justify-center gap-[36px]">
        <button
          type="button"
          className="flex w-[275px] flex-col items-center rounded-[14px] border border-black pb-[58px]"
          onClick={() => onClickUserType('STUDENT')}
        >
          <p className="mt-[29px] text-[32px] text-primary">학생</p>
        </button>
        <p className="text-[22px]">회원가입</p>
        <div className="mt-[20px]">
          <Image
            src="/images/svg/student.svg"
            alt="student icon"
            width={129}
            height={124}
          />
        </div>
      </div>
      <div
        className="flex w-[275px] cursor-pointer flex-col items-center rounded-[14px] border border-black"
        onClick={() => onClickUserType('PROFESSOR')}
      >
        <p className="mt-[29px] text-[32px] text-primary">교수</p>
        <p className="text-[22px]">회원가입</p>
        <div className="mt-[2px]">
          <Image
            src="/images/svg/professor.svg"
            alt="student icon"
            width={167}
            height={167}
          />
        </div>
      </div>
    </div >
  )
}

export default UserTypeSelect
