// src/components/Login.tsx

import { FcGoogle } from 'react-icons/fc'; // You'll need to install react-icons
import { signInWithGoogle } from '../auth/authService';
import { useNavigate } from 'react-router-dom';
import task from "../assets/task.png"
import circlebg from "../assets/circles_bg.png"
import tasklist from "../assets/Task list view 3.png"


const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        // Navigate to dashboard after successful authentication
        navigate('/dashboard');
      }
    } catch (error) {
      // Handle error (show error message, etc.)
      console.error("Login failed:", error);
    }
  };



  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Home content */}
      <div className="flex flex-col md:flex-row justify-between min-h-screen items-center px-6 md:px-16 lg:px-24">
        {/* Left side - Login info */}
        <div className="w-full md:w-1/2 max-w-md py-12 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <img src={task} alt="TaskBuddy Logo" className="h-10" />
              <h2 className="text-3xl font-bold text-[#7B1984]">TaskBuddy</h2>
            </div>
            <p className="text-black text-sm mb-4 font-medium">
              Streamline your workflow and track progress effortlessly <br /> with our all-in-one task management app.
            </p>
          </div>
          
          <button 
            onClick={handleSignIn} 
            className="flex text-2xl items-center justify-center gap-2 bg-[#292929] border border-gray-300 rounded-3xl py-5 px-1 text-white font-medium shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <FcGoogle className="text-3xl" />
            Continue with Google
          </button>
        </div>

        {/* Right side - Image with layered effect */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative right-0">
          {/* Circle background image */}
          <img 
            className="max-w-full h-auto object-cover" 
            src={circlebg} 
            alt="Background Circles" 
          />
          
          {/* Foreground image centered within the circle */}
          <img 
            className="absolute right-0 max-w-2/3 h-auto"
            src={tasklist} 
            alt="TaskBuddy Illustration" 
          />
        </div>
      </div>
    </div>
  );
};

export default Login;