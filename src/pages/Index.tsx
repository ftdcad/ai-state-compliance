import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, AlertTriangle, Users, ArrowRight, Zap, Globe, Lock, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ThemeToggle } from '../components/ui/theme-toggle';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation Header */}
      <nav className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Coastal Claims</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/states">
                <Button variant="outline" className="hidden sm:inline-flex">
                  Get Started
                </Button>
              </Link>
              <Link to="/help">
                <Button variant="outline" className="hidden sm:inline-flex">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Help Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 dark:from-blue-900/20 dark:to-indigo-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-6">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Coastal Claims
              <span className="text-blue-600 dark:text-blue-400"> AI Assistant</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Advanced insurance compliance management powered by AI. Navigate complex regulatory requirements 
              across multiple states with confidence and precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/states">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg">
                  <Zap className="h-5 w-5 mr-2" />
                  Start AI Session
                </Button>
              </Link>
              <Link to="/admin/details">
                <Button size="lg" variant="outline" className="px-8 py-3 rounded-lg text-lg border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Lock className="h-5 w-5 mr-2" />
                  Admin Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Comprehensive Compliance Management
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to manage insurance compliance across multiple jurisdictions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Multi-State Rule Management</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Centralized management of compliance rules across all supported states with real-time updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• YAML-schema based rule definitions</li>
                <li>• Confidence level scoring</li>
                <li>• Authority level classification</li>
                <li>• Automated rule ID generation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Real-Time Compliance Alerts</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Proactive monitoring and alerts for regulatory changes, deadlines, and compliance issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Priority-based alert system</li>
                <li>• Source documentation tracking</li>
                <li>• Resolution status management</li>
                <li>• Deadline monitoring</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-gray-900 dark:text-white">AI Response Templates</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Intelligent response templates with variable substitution for consistent compliance guidance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Dynamic variable substitution</li>
                <li>• Template categorization</li>
                <li>• Confidence scoring</li>
                <li>• Custom template creation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Multi-Jurisdiction Support</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Comprehensive coverage across multiple US states with specialized rule sets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Alaska, Texas, Florida, California</li>
                <li>• State-specific filtering</li>
                <li>• Jurisdiction-aware routing</li>
                <li>• Expandable state coverage</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Secure Administration</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                PIN-protected access to administrative functions with role-based permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• PIN-based authentication</li>
                <li>• Protected administrative routes</li>
                <li>• Session management</li>
                <li>• Audit trail capabilities</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <CardTitle className="text-gray-900 dark:text-white">Advanced Analytics</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Comprehensive system metrics and insights for informed decision making
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• System performance metrics</li>
                <li>• Confidence level analytics</li>
                <li>• Alert trend analysis</li>
                <li>• Compliance reporting</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Compliance Management?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join leading insurance professionals who trust Coastal Claims for their compliance needs
            </p>
            <Link to="/states">
              <Button size="lg" variant="secondary" className="px-8 py-3 rounded-lg text-lg bg-white text-blue-600 hover:bg-gray-50">
                Get Started Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-2xl font-bold">Coastal Claims</span>
            </div>
            <p className="text-gray-400 mb-4">
              Advanced insurance compliance management powered by AI
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <span>© 2024 Coastal Claims. All rights reserved.</span>
              <span>•</span>
              <span>Enterprise-grade security</span>
              <span>•</span>
              <span>SOC 2 Type II Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;