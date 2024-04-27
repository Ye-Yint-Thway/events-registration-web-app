import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { logStore } from "@/store";

const SignUpForm = ({
  setSigningUp,
}: {
  setSigningUp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const cancelSignUp = () => {
    setSigningUp(false);
  };
  const { logged, setLogged } = logStore();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [retypePassword, setRetypePassword] = useState("");
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRetypePasswordVisibility = () => {
    setShowRetypePassword(!showPassword);
  };

  const signUpSuccess = () => {
    setLogged(true);
    setSigningUp(false);
  };

  return (
    <div className="fixed flex flex-col top-0 left-0 w-full h-screen bg-black bg-opacity-70 z-40 items-center justify-center">
      <div className="bg-slate-500 w-[250px] h-[400px] flex flex-col gap-2 justify-between py-4 rounded-md overflow-hidden">
        <div className="flex flex-col gap-3 px-2">
          <p className="font-semibold text-[18px] text-white">
            Please fill the information.
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
          <div className="relative">
            <input
              type={showRetypePassword ? "text" : "password"}
              placeholder="Retype Password"
              className="input-field rounded-sm pr-5 over"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={toggleRetypePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <input
            type="text"
            placeholder="Surname"
            className="input-field rounded-sm"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input-field rounded-sm"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="input-field rounded-sm"
            pattern="[0-9]+"
            required
          />
          <input
            type="date"
            placeholder="Date of Birth"
            className="input-field rounded-sm"
          />
          <input
            type="text"
            placeholder="Occupation"
            className="input-field rounded-sm"
          />
        </div>
        <div className="flex justify-between px-2">
          <button
            className="bg-orange-300 hover:bg-orange-500 p-2 font-semibold rounded-md duration-300"
            onClick={cancelSignUp}
          >
            Cancel
          </button>
          <button
            className="bg-blue-300 hover:bg-blue-500 p-2 font-semibold rounded-md duration-300"
            onClick={signUpSuccess}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
