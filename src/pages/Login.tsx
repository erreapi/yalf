
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import LoginButton from '@/components/LoginButton';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const { toast } = useToast();

  // Track input states for animation purposes
  const [inputFocus, setInputFocus] = useState({
    username: false,
    password: false
  });

  useEffect(() => {
    // Event listener to validate username
    const validateUsername = () => {
      setUsernameValid(username.length >= 3);
    };

    // Event listener to validate password
    const validatePassword = () => {
      setPasswordValid(password.length >= 6);
    };

    if (username) validateUsername();
    if (password) validatePassword();
  }, [username, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs before submission
    const isUsernameValid = username.length >= 3;
    const isPasswordValid = password.length >= 6;
    
    setUsernameValid(isUsernameValid);
    setPasswordValid(isPasswordValid);
    
    if (!isUsernameValid || !isPasswordValid) {
      toast({
        title: "Validation Error",
        description: "Please check your username and password",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate loading state
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
      console.log('Login submitted:', { username, password: '****' });
    }, 1500);
  };

  // Handle input focus animations
  const handleFocus = (input: 'username' | 'password') => {
    setInputFocus(prev => ({ ...prev, [input]: true }));
  };

  const handleBlur = (input: 'username' | 'password') => {
    setInputFocus(prev => ({ ...prev, [input]: false }));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-login p-4">
      <div className="w-full max-w-md">
        <div 
          className="w-full glassmorphism rounded-2xl p-8 animate-scale-in"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <div className="relative">
                <User 
                  className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                    inputFocus.username ? 'text-primary' : 'text-gray-400'
                  }`} 
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => handleFocus('username')}
                  onBlur={() => handleBlur('username')}
                  className={`input-field pl-10 ${!usernameValid && username ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
                />
              </div>
              {!usernameValid && username && (
                <p className="text-sm text-red-500 pl-1 animate-fade-in">Username must be at least 3 characters</p>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="relative">
                <Lock 
                  className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                    inputFocus.password ? 'text-primary' : 'text-gray-400'
                  }`} 
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  className={`input-field pl-10 ${!passwordValid && password ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {!passwordValid && password && (
                <p className="text-sm text-red-500 pl-1 animate-fade-in">Password must be at least 6 characters</p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <div className="pt-2">
              <LoginButton
                type="submit"
                isLoading={isLoading}
              >
                Sign in
              </LoginButton>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors duration-200">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
