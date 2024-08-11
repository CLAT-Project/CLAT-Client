"use client";

import { useState } from "react";

interface ICheckBoxProps {
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean, key: string) => void;
  keyProp: string;
};

const CheckBox = ({ label, checked, onChange, keyProp }: ICheckBoxProps) => {

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked, keyProp)}
        className="form-checkbox h-4 w-4"
      />
      <span className="text-sm">{label}</span>
    </label>
  )
}

export default CheckBox