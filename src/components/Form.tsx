import { useEffect } from 'react';
import logo from "../assets/burgundylogo.jpeg"

const Form2 = () => {

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
    <div className="w-full mt-4">
      {!accessToken && (
        <div className="flex items-center justify-center mt-8">
          <div className="text-center bg-white p-6 rounded shadow-md w-full max-w-sm">
            <img src={logo} className="object-cover aspect-[5/2]"
              alt="phone email login demo" />
            <h1 className="text-lg font-bold">View Menu</h1>
            <p className="text-gray-400">Welcome to Sign In with Phone</p>
            <button
              className="flex items-center justify-center bg-green-500 text-white font-bold py-3 px-6 rounded mt-4 w-full"
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
      )}
    </div>
  );
};

export default Form2;
