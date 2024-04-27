import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ForgetPasswordForm from "./forget-password-form";

const Login = ({
  setLoggingIn,
}: {
  setLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const cancelLogin = () => {
    setLoggingIn(false);
  };

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <div className="fixed flex flex-col top-0 left-0 w-full h-screen bg-black bg-opacity-70 z-40 items-center justify-center">
      <div className="bg-slate-500 w-[250px] h-[275px] flex flex-col gap-2 justify-between py-4 rounded-md overflow-hidden">
        <div className="flex flex-col gap-3 px-2">
          <p className="font-semibold text-[18px] text-justify text-white">
            Please enter your email address and password to login.
          </p>
          <input
            type="email"
            placeholder="Email"
            className="input-field rounded-sm"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field rounded-sm pr-5 over"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          <p
            className="text-sm text-white hover:text-red-500 duration-300 cursor-pointer "
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </p>
        </div>

        <div className="flex justify-between px-2">
          <button
            className="bg-orange-300 hover:bg-orange-500 p-2 font-semibold rounded-md duration-300"
            onClick={cancelLogin}
          >
            Cancel
          </button>
          <button className="bg-blue-300 hover:bg-blue-500 p-2 font-semibold rounded-md duration-300">
            Sign Up
          </button>
        </div>
      </div>
      {showForgotPassword && (
        <ForgetPasswordForm
          email={email}
          setEmail={setEmail}
          setShowForgotPassword={setShowForgotPassword}
        />
      )}
    </div>
  );
};

export default Login;
