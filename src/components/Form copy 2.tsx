import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import formValidation, { formValidationWithOtp } from '../utils/formValidation';
import SteinStore from 'stein-js-client';
const msg91 = new (require('msg91-v5'))("414527AQzL0TqWYk65c5b482P1");
import axios from "axios"
import InputField from './InputField';

const store = new SteinStore('https://api.steinhq.com/v1/storages/66273f854a642363121f225a');

interface Idata {
  name: string;
  email: string;
  phoneNumber: string;
  otp?: string;
}

const Form = () => {
  const [isOtpInput, setIsOtpInput] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formValidation) });

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorsOtp },
  } = useForm({ resolver: yupResolver(formValidationWithOtp) });


  const sendOtpRequest = async () => {
    try {
      // const apiUrl = 'https://api.msg91.com/api/v5/otp';
      // const authKey = '414527AQzL0TqWYk65c5b482P1';
      // const templateId = '65b23bacd6fc0558d36831f2';

      const params = {
        template_id: "65b23bacd6fc0558d36831f2", // (Mandatory) You will get it from MSG91 panel
        mobile: "919562886328"
      }
      const args = {
        "Value1": "Param1",
        "Value2": "Param2",
        "Value3": "Param3"
      };
      
      msg91.sendOTP(params,args).then(() => {
          console.log("SUCCESS")
      }).catch((error: any) => {
          console.log(error)
      })

    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };


  const onSubmitForm = async (data: Idata) => {
    try {
      const existingData = await store.read('Sheet1', { search: { Phonenumber: data.phoneNumber } });

      if (existingData.length > 0) {
        console.log('Phone number already exists in the sheet.');
        return;
      }
      sendOtpRequest()
      setIsOtpInput(true)
    } catch (error) {
      setIsOtpInput(false);
      console.log('Error fetching data:', error);
    }
  };

  const onSubmitFormOtp = async (data: Idata) => {
    try {
      console.log(data);
      await store.append('Sheet1', [
        {
          Name: data.name,
          Email: data.email,
          Phonenumber: data.phoneNumber,
        },
      ]);
      setIsOtpInput(false);
    } catch (error) {
      setIsOtpInput(false);
      console.log('Error appending data:', error);
    }
  };

  return (
    <div className="w-full mt-4">
      {!isOtpInput ? (
        <form onSubmit={handleSubmit(onSubmitForm)} className="w-full flex flex-col gap-4">
          <InputField type="text" name="name" label="Name" placeholder="Enter your name" required register={register} error={errors.name?.message} />
          <InputField type="text" name="email" label="Email" placeholder="Enter your email" required register={register} error={errors.email?.message} />
          <InputField type="text" name="phoneNumber" label="Phone number" placeholder="Enter your phone number" required register={register} error={errors.phoneNumber?.message} />
          <button type="submit" className="w-full p-4 px-6 bg-blue-800 text-white font-bold hover:bg-blue-500 border-2 rounded-md border-black transition duration-300">
            Get OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitOtp(onSubmitFormOtp)} className="w-full flex flex-col gap-4">
          <InputField type="text" name="name" label="Name" placeholder="Enter your name" required register={registerOtp} error={errorsOtp.name?.message} />
          <InputField type="text" name="email" label="Email" placeholder="Enter your email" required register={registerOtp} error={errorsOtp.email?.message} />
          <InputField type="text" name="phoneNumber" label="Phone number" placeholder="Enter your phone number" required register={registerOtp} error={errorsOtp.phoneNumber?.message} />
          <InputField type="text" name="otp" label="OTP" placeholder="Enter your 4-digit OTP" required register={registerOtp} error={errorsOtp.otp?.message} />
          <button type="submit" className="w-full p-4 px-6 bg-blue-800 text-white font-bold hover:bg-blue-500 border-2 rounded-md border-black transition duration-300">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
