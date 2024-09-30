import React, { ChangeEvent, useRef } from 'react'

interface IVerificationCodeInputProps {
  digits?: number
  onChange: (value: string, index: number) => void
  onComplete?: (data: { roomKey: string }) => void
  roomKey?: string
}

const VerificationCodeInput = ({
  digits = 6,
  onChange,
  onComplete,
  roomKey,
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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Enter' && index === digits - 1) {
      onComplete?.({ roomKey: roomKey || '' })
    } else if (
      e.key === 'Backspace' &&
      index > 0 &&
      (e.target as HTMLInputElement).value === ''
    ) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex w-[379px] justify-center gap-2">
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
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  )
}

export default VerificationCodeInput
