import React, { ChangeEvent, useRef } from 'react'

interface IVerificationCodeInputProps {
  digits?: number
  onChange: (value: string, index: number) => void
}

const VerificationCodeInput = ({
  digits = 6,
  onChange,
}: IVerificationCodeInputProps) => {
  const inputsRef = useRef<HTMLInputElement[]>([])

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target

    if (/^[0-9]$/.test(value)) {
      if (index < digits - 1) {
        inputsRef.current[index + 1]?.focus()
      }
    } else {
      event.target.value = ''
    }
    onChange(value, index)
  }

  return (
    <div className="flex w-[379px] justify-start gap-2">
      {Array.from({ length: digits }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el as HTMLInputElement
          }}
          type="text"
          maxLength={1}
          pattern="[0-9]*"
          className="h-[50px] w-[50px] rounded-[14px] bg-verify px-5 text-center text-xl"
          onChange={(e) => handleInputChange(index, e)}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (
              e.key === 'Backspace' &&
              index > 0 &&
              e.currentTarget.value === ''
            ) {
              inputsRef.current[index - 1]?.focus()
            }
          }}
        />
      ))}
    </div>
  )
}

export default VerificationCodeInput
