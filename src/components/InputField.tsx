import React, { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

type InputFieldProps = {
    type: string
    name: string
    label: string
    placeholder: string
    required: boolean
    register?: UseFormRegister<any>
    disabled?: boolean
    error?: string | undefined
    defaultValue?: string | number
  }

const InputField = ({
    type,
    name,
    label,
    placeholder,
    required,
    register,
    disabled,
    error,
    defaultValue,
  }: InputFieldProps) => {

  return (
    <div className='w-full relative'>
        <label htmlFor={name} className="font-bold">{label}</label>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`w-full bg-transparent p-3 px-4 border-2 border-secondary rounded-md focus:ring-red-600  ${error ? " border-red-500" : "border-black" }`}
          {...register && register(name, { required })}
          disabled={disabled}
          defaultValue={defaultValue}
          style={{
            WebkitBoxShadow: "0 0 0px 1000px transparent inset",
            transition: "background-color 5000s ease-in-out 0s"
        }}
        />
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}

export default InputField