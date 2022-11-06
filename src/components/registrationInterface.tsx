export default function RegistrationInterface() {
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
                Register your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm">
              <div className="mb-12">
                  <h1>Username</h1>
                  <label className="sr-only">
                    Username
                  </label>
                  <input
                    id="user-name"
                    name="user-name"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 placeholder-gray-500 text-black focus:z-10 focus:outline-none  sm:text-sm"
                    placeholder="User name"
                  />
                </div>
                <div className="mb-12">
                  <h1>Email</h1>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-500 text-black focus:z-10 focus:outline-none  sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div className="mb-2">
                  <h1>Password</h1>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none border border-gray-300 px-3 py-2  placeholder-gray-500 text-black focus:z-10 focus:outline-none  sm:text-sm"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-12">
                  <h1>Confirm password</h1>
                  <label htmlFor="password" className="sr-only">
                    Confirm password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2  placeholder-gray-500 text-black focus:z-10 focus:outline-none  sm:text-sm"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  </span>

                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
    )
  }