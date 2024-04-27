import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminPassword = ({
  setAdminLoggin,
}: {
  setAdminLoggin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (password === "MiningGarden") {
      router.push("/admin");
    } else {
      setIncorrectPassword(true);
    }
  };

  return (
    <div>
      <div className=" absolute inset-0 z-50  flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md">
          <h2 className="text-lg font-semibold mb-4 text-justify text-slate-600">
            Please enter the admin panal password to access.
          </h2>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field rounded-sm pr-5 over sm:w-[200px] lg:w-[500px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-slate-600"
              />
            </span>
          </div>
          {incorrectPassword ? (
            <p className="text-red-500 ">Incorrect password. Try again!</p>
          ) : (
            <></>
          )}
          <div className="flex justify-end mt-3">
            <button
              className="bg-red-500 hover:bg-red-700 text-white duration-300 font-semibold py-2 px-4 rounded-md mr-2"
              onClick={() => setAdminLoggin(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white duration-300 font-semibold py-2 px-4 rounded-md"
              onClick={handleLogin}
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPassword;
