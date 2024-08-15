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
}: IInputFiledProps) => {
  return (
    <>
      <div className="flex items-center gap-5 border relative">
        <div className="flex w-[540px] items-center justify-between">
          <label className="min-w-[80px] text-[14px]">{label}</label>
          <input
            className={`signup-input ${errors?.[name] ? 'border-red-500' : ''}`}
            type={type}
            placeholder={placeholder}
            {...(register && register(name, validationRules))}
          />
        </div>
        {isButton && (
          <button className="rounded-[8px] bg-primary px-[23px] py-[7px] text-[14px] text-white">
            {buttonText}
          </button>
        )}
        <div className='h-[10px] absolute -bottom-4 left-1/2'>
          {errors?.[name] && (
            <p className="mt-1 text-sm text-red-500">
              모든 필드를 입력해주세요.
            </p>
          )}
        </div>
      </div>

    </>
  )
}

export default InputField
