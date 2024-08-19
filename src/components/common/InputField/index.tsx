import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface IInputFiledProps {
  label: string
  type: string
  name: string
  placeholder?: string
  isButton: boolean
  buttonText?: string
  register?: UseFormRegister<any>
  errors?: FieldErrors<any>
  validationRules?: any
  onClickBtn?: (data?: any) => void
}

const InputField = ({
  label,
  type,
  name,
  placeholder,
  isButton,
  buttonText,
  register,
  errors,
  validationRules,
  onClickBtn,
}: IInputFiledProps) => {
  return (
    <>
      <div className="relative flex items-center gap-5">
        <div className="flex w-[540px] items-center justify-between">
          <label className="required relative text-[14px]">{label}</label>
          <input
            className={`signup-input ${errors?.[name] ? 'border-red-500' : ''}`}
            type={type}
            placeholder={placeholder}
            {...(register && register(name, validationRules))}
          />
        </div>
        {isButton && (
          <div
            className="cursor-pointer rounded-[8px] bg-primary px-[23px] py-[7px] text-[14px] text-white"
            onClick={onClickBtn}
          >
            {buttonText}
          </div>
        )}
        <div className="absolute -bottom-3 left-1/4 h-[10px]">
          {errors?.[name]?.message && (
            <p className="mt-1 text-[10px] text-red-500">
              {errors?.[name]?.message.toString()}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default InputField
