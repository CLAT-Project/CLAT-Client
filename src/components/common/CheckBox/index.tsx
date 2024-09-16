'use client'

interface ICheckBoxProps {
  label: string
  checked: boolean
  onChange: (isChecked: boolean, key: string) => void
  keyProp: string
}

const CheckBox = ({ label, checked, onChange, keyProp }: ICheckBoxProps) => {
  const id = `checkbox-${keyProp}`
  return (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked, keyProp)}
      />
      <label htmlFor={id} className="cursor-pointer text-sm">
        {label}
      </label>
    </div>
  )
}

export default CheckBox
