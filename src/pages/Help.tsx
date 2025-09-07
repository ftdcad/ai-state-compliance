import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ThemeToggle } from '../components/ui/theme-toggle';
import HelpInstructions from '../components/HelpInstructions';

const Help: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="mr-4">
                <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    System Help & Instructions
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Complete guide to using the Coastal Claims AI Assistant
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/states">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Start Using System
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HelpInstructions />
      </div>
    </div>
  );
};

export default Help;