import React from "react";

const ForgetPasswordForm = ({
  email,
  setEmail,
  setShowForgotPassword,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setShowForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleSendResetCode = () => {
    alert(`Sending reset code to ${email}`);
    setShowForgotPassword(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Forgot Password?</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="input-field rounded-sm mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 duration-300 font-semibold py-2 px-4 rounded-md mr-2"
            onClick={() => setShowForgotPassword(false)}
          >
            Cancel
          </button>
          <button
            className="bg-orange-300 hover:bg-orange-500 duration-300 font-semibold py-2 px-4 rounded-md"
            onClick={handleSendResetCode}
          >
            Send Reset Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
