"use client";
import { useState } from "react";
import { useStrapiLogin } from "../hooks/strapiLogin"
import { sendOtp, verifyOtp } from "../lib/send-email/send-email";
import { usePathname } from "next/navigation";
import { useToast } from './ui/toast'
import Link from "next/link";

type LoginPageTemplateProps = {
  role: string,
  successUrl: string,
}

export default function LoginPageTemplate({ role, successUrl }: LoginPageTemplateProps) {
  const {
    identifier,
    password,
    error,
    isLoading,
    setIdentifier,
    setPassword,
    handleSubmit,
  } = useStrapiLogin(successUrl);

  const { showToast } = useToast();

  // admin and sme cant able to create new account using signup method.
  const [pathname] = useState(usePathname().includes('/admin') || usePathname().includes('/sme'));

  const [signUp, setSignUp] = useState(false);
  const [signUpLoding, setSignUpLoding] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [username, setUsername] = useState('');

  // Helper to handle OTP digit changes and auto-focus
  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Keep only last digit
    setOtp(newOtp);

    // Focus next input
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Logic to determine which submit function to use
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (showOtp) {
      const userEnteredOtp = otp.join("");
      if (userEnteredOtp.length === 6) {
        try {
          const response = await verifyOtp(identifier, username, password, userEnteredOtp);
          if (response.status === '200') {
            showToast("Account created successfully. Sign in to continue.", "success");
            setShowOtp(false)
            setSignUp(false)
            setOtp(["", "", "", "", "", ""])
            setIdentifier('')
            setPassword('')
            setUsername('')
          }
          else showToast("Something went wrong while creating account, Please try again later.", "error");
        }
        catch (err) {
          showToast("Something went wrong while creating account, Please try again later.", "error");
        }
      }
    } else if (signUp) {
      try {
        setSignUpLoding(true)
        const response = await sendOtp(identifier);
        if (response.message === "email already exist") {
          showToast("It looks like an account has already been created with these email. If you need help, please contact the administrator.", "info");
        }

        if (response.status === '200') {
          showToast("Please check your email and enter the verification code to continue.", "success");
          setShowOtp(true);
        }
        setSignUpLoding(false)
      }
      catch (err) {
        showToast("Something went wrong while creating account, Please try again later.", "error");
        setSignUpLoding(false)
      }
    } else {
      await handleSubmit(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {showOtp ? (
              <span className="text-indigo-600">Verify OTP</span>
            ) : signUp ? (
              <span className="text-indigo-600">Create Account</span>
            ) : (
              <span className="text-indigo-600">Sign In</span>
            )}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {showOtp
              ? `Enter the 6-digit code sent to ${identifier}`
              : `Access your ${role.toLowerCase()} dashboard`}
          </p>
        </div>

        {/* Form Container */}
        <form className="mt-8 space-y-6" onSubmit={onFormSubmit}>
          {showOtp ? (
            /* --- OTP Input Fields --- */
            <div className="flex justify-between gap-2 py-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 text-center text-2xl font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              ))}
            </div>
          ) : (
            /* --- Standard Login/Signup Inputs --- */
            <div className="space-y-4">
              {signUp &&
                <div className="relative">
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter your username"
                  />
                </div>
              }
              <div className="relative">
                <label htmlFor="identifier" className="sr-only">
                  Email
                </label>
                <input
                  id="identifier"
                  name="identifier"
                  type="email"
                  autoComplete="email"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          )}

          {/* Error Message Display */}
          {error && (
            <div className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-lg animate-pulse dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || (showOtp && otp.join("").length < 6) || signUpLoding}
              className="relative flex justify-center w-full px-4 py-3.5 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
            >
              {
                isLoading ?
                  (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  )
                  :
                  showOtp ?
                    (
                      "Verify Code"
                    )
                    :
                    (signUp && signUpLoding) ?
                      (
                        "Creating Account..."
                      )
                      :
                      signUp ?
                        (
                          "Create Account"
                        )
                        :
                        (
                          "Sign In"
                        )
              }
            </button>
          </div>
        </form>

        {/* Toggle Footer */}
        {!showOtp && !pathname && (
          <div className="pt-6 text-center border-t border-gray-100 dark:border-gray-700">
            <p className="text-md text-gray-600 dark:text-gray-400">
              {signUp ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => setSignUp(!signUp)}
                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 underline-offset-4 hover:underline focus:outline-none pl-2 transition-all"
              >
                {signUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        )}

        {showOtp && (
          <div className="pt-6 text-center space-y-4">
            <button
              type="button"
              onClick={() => setShowOtp(false)}
              className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
            >
              ← Back to registration
            </button>
            {/* <div className="block">
              <button
                type="button"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 uppercase tracking-wider"
                onClick={() => console.log("Resending OTP...")}
              >
                Resend Verification Code
              </button>
            </div> */}
          </div>
        )}
        <Link href={'/'}><p className="text-center text-sm text-black cursor-pointer">Back to home</p></Link>
      </div>
    </div>
  );
}