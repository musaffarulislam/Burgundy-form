import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import formValidation, { formValidationWithOtp } from '../utils/formValidation';
import SteinStore from 'stein-js-client';
import InputField from './InputField';
import msg91 from "msg91";
import { format } from 'date-fns';
import logo from "../assets/burgundylogo.jpeg"

msg91.initialize({authKey: "414527A3UZtDGsK1x65be1349P1"})
const otp = msg91.getOTP("66277d73d6fc052234233db1", { length: 4 });

const store = new SteinStore('https://api.steinhq.com/v1/storages/6627b7044a642363121f8025');

interface Idata {
  name: string;
  phoneNumber: string;
  otp?: string;
}

const Form = () => {

  const [message, setMessage] = useState<string | null>(null)
  const [isOtpInput, setIsOtpInput] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formValidation) });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    watch: watchOtp,
    formState: { errors: errorsOtp },
  } = useForm({ resolver: yupResolver(formValidationWithOtp) });


  const sendOtpRequest = async (phoneNumber: string) => {
    try {
      otp.send(`91${phoneNumber}`);
      setIsOtpInput(true);
    } catch (error: any) {
      throw new Error(error)
    }
  };

  const handleResendOtp = () => {
    try{
      const phoneNumber = watchOtp('phoneNumber')
      otp.retry(`91${phoneNumber}`);
    }catch(error: any){
      setMessage(error?.message || "Resend not working")
    }
  }
  

  const onSubmitForm = async (data: Idata) => {
    try {
      setMessage(null)
      const existingData = await store.read('Burgundy Customers Data', { search: { Phonenumber: data.phoneNumber } });

      if (existingData.length > 0) {
        window.location.href = 'https://airmenus.in/burgundy/menu';
        return;
      }
      sendOtpRequest(data.phoneNumber)
      // setIsOtpInput(true)
    } catch (error) {
      setIsOtpInput(false);
      console.log('Error fetching data:', error);
    }
  };

  const onSubmitFormOtp = async (data: Idata) => {
    try {
      setMessage(null)
      try{
        otp.verify(`91${data.phoneNumber}`,String(data.otp));
      } catch (error: any) {
        return setMessage(error.message)
      }
      const currentDate = format(new Date(), "h:mm a dd/MM/yyyy");
      await store.append('Burgundy Customers Data', [
        {
          Name: data.name,
          Phonenumber: data.phoneNumber,
          Date: currentDate
        },
      ]);
      setIsOtpInput(false);
      window.location.href = 'https://airmenus.in/burgundy/menu';
    } catch (error) {
      setIsOtpInput(false);
      console.log('Error appending data:', error);
    }
  };

  return (
    <>
    <div className="w-full "><img src={logo} className="object-cover aspect-[5/2]" /></div>
    <div className="w-full mt-4">
      {message && <p className=" text-red-600 mt-1">{message}</p>}
      {!isOtpInput ? (
        <form onSubmit={handleSubmit(onSubmitForm)} className="w-full flex flex-col gap-4">
          <InputField type="text" name="name" label="Name" placeholder="Enter your name" required register={register} error={errors.name?.message} />
          <InputField type="text" name="phoneNumber" label="Phone number" placeholder="Enter your phone number" required register={register} error={errors.phoneNumber?.message} />
          <button type="submit" className="w-full p-4 px-6 bg-red-950 text-white font-bold hover:bg-red-800 border-2 rounded-md border-black transition duration-300">
            Get OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitOtp(onSubmitFormOtp)} className="w-full flex flex-col gap-4">
          <InputField type="text" name="name" label="Name" placeholder="Enter your name" required register={registerOtp} error={errorsOtp.name?.message} />
          <InputField type="text" name="phoneNumber" label="Phone number" placeholder="Enter your phone number" required register={registerOtp} error={errorsOtp.phoneNumber?.message} />
          <InputField type="text" name="otp" label="OTP" placeholder="Enter your 4-digit OTP" required register={registerOtp} error={errorsOtp.otp?.message} />
          <div className='flex justify-end hover:underline transition duration-300' onClick={handleResendOtp}>Resend OTP</div>
          <button type="submit" className="w-full p-4 px-6 bg-red-950 text-white font-bold hover:bg-red-800 border-2 rounded-md border-black transition duration-300">
            Submit
          </button>
        </form>
      )}
    </div>
    </>
  );
};

export default Form;
