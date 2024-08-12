interface IInputFiledProps {
  label: string
  type: string
  placeholder?: string
  isButton: boolean
  buttonText?: string
}

const InputField = ({
  label,
  type,
  placeholder,
  isButton,
  buttonText,
}: IInputFiledProps) => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex w-[540px] items-center justify-between ">
        <label className="min-w-[80px] text-[14px]">{label}</label>
        <input className="signup-input" type={type} placeholder={placeholder} />
      </div>
      {isButton && (
        <button className="rounded-[8px] bg-primary px-[23px] py-[7px] text-[14px] text-white">
          {buttonText}
        </button>
      )}
    </div>
  )
}

export default InputField
