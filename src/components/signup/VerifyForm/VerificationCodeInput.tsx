import React, { ChangeEvent, ReactHTMLElement, useRef } from 'react';

interface IVerificationCodeInputProps {
  digits?: number;
  onChange: (value: string, index: number) => void;
}

const VerificationCodeInput = ({ digits = 6, onChange }: IVerificationCodeInputProps) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (/^[0-9]$/.test(value)) {
      if (index < digits - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    } else {
      event.target.value = "";
    }
    onChange(value, index);
  };

  return (
    <div className="flex gap-2 justify-start w-[379px]">
      {Array.from({ length: digits }, (_, index) => (
        <input
          key={index}
          ref={el => { inputsRef.current[index] = el as HTMLInputElement; }}
          type="text"
          maxLength={1}
          pattern="[0-9]*"
          className="bg-verify w-[50px] h-[50px] rounded-[14px] px-5 text-xl text-center"
          onChange={(e) => handleInputChange(index, e)}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Backspace" && index > 0 && e.currentTarget.value === '') {
              inputsRef.current[index - 1]?.focus();
            }
          }}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;
