import { Link } from "react-router-dom";

export default function LoggingInterface() {
  const API_HOST = 'http://localhost:8000';
  let _csrfToken: any = null;

  async function getCsrfToken() {
    if (_csrfToken === null) {
      const response = await fetch(`${API_HOST}/csrf/`, { credentials: 'include' });
      const data = await response.json();
      _csrfToken = data.csrfToken;
      console.log(_csrfToken)
    }
    return _csrfToken;
  }
  _csrfToken = getCsrfToken();
  console.log(_csrfToken)
  return (
    
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8"> 
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-s">
              Or{' '}
              <Link to="register" className="font-medium links">
                register here now 
              </Link>
            </p>
          </div>
          {_csrfToken !== "" && <form className="mt-8 space-y-6" action="login/" method="POST">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  login
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:z-10 focus:outline-none  sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:z-10 focus:outline-none  sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300  "
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm ">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium links ">
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                </span>
                Sign in
              </button>
            </div>
          </form> }
        </div>
      </div>
  )
}