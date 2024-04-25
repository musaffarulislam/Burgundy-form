import { useEffect } from 'react';
import logo from "../assets/logo.png"
import food from "../assets/food.jpg"

const Form = () => {

  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = searchParams.get('access_token');

  const CLIENT_ID = "12341455927517011904";

  const REDIRECT_URL = window.location.href;
  const AUTH_URL = `https://www.phone.email/auth/log-in?client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL}`;

  useEffect(() => {
    if (accessToken) {
      window.location.href = 'https://airmenus.in/burgundy/menu';
    }
  }, [accessToken]);


  return (
    <div className="w-full">
      {!accessToken && (
        <div className="flex h-full items-center justify-center">
          <div className="text-center h-full bg-white rounded w-full max-w-md flex flex-col justify-between">
            <div className='p-6'>
              <img src={logo} className="object-cover" alt="Burgundy" />
            </div>
            <div className='my-2'>
              <div className='w-10/12'>
                <img src={food} className="object-cover transform -scale-x-100" alt="Food" />
              </div>
              <div className='px-6 text-left'>
                <h1 className="font-bebas text-5xl font-bold text-orange-600 whitespace-nowrap">Craving Something?</h1>
                <p className="font-exo font-medium text-xl text-gray-500">Let's get you started !!</p>
              </div>
            </div>
            <div className='p-6 mt-10'>
              <button
                className="flex items-center justify-center bg-yellow-950 text-white font-bold py-3 px-6 rounded w-full"
                id="btn_ph_login"
                name="btn_ph_login"
                type="button"
                onClick={() => window.open(AUTH_URL, 'peLoginWindow', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0, width=500, height=560, top=' + (window.screen.height - 600) / 2 + ', left=' + (window.screen.width - 500) / 2)}>
                <img src="https://storage.googleapis.com/prod-phoneemail-prof-images/phem-widgets/phem-phone.svg"
                  alt="phone email" className="mr-2" />
                Verify Mobile Number
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
