import React from 'react';
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-xl w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-primary-100 p-4 rounded-full">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Work In Progress
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed">
          We're building something awesome for you! The landing page is currently under construction, but we'll be up and running soon.
        </p>

        <div className="mt-10">
          <Button onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
