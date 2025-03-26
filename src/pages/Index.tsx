
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-login p-4">
      <div className="glassmorphism rounded-2xl p-10 max-w-lg text-center animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Our Application</h1>
        <p className="text-lg text-gray-600 mb-8">
          Experience a seamless interface designed with precision and elegance.
        </p>
        <Link 
          to="/login" 
          className="login-btn inline-block px-8"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Index;
