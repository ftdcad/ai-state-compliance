import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, FileText, ArrowRight, Shield, Search, Filter, MessageCircle, Building, Construction, Scale, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ThemeToggle } from '../components/ui/theme-toggle';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { allStatesAndTerritories, getTotalRules, getTotalAlerts } from '../data/allStatesData';

const getStatusBarColor = (status: string): string => {
  switch (status) {
    case 'active': return 'bg-green-500'; // Production ready - GREEN
    case 'prohibited': return 'bg-red-500'; // Non-practicing - RED  
    case 'restricted': return 'bg-yellow-500'; // Major restrictions - YELLOW
    case 'beta': return 'bg-yellow-500'; // Beta with concerns - YELLOW
    case 'coming-soon': return 'bg-gray-400'; // Coming soon - GRAY
    default: return 'bg-gray-400';
  }
};

const getActionButtonColor = (status: string): string => {
  switch (status) {
    case 'active': return 'bg-green-600 hover:bg-green-700'; // Production ready - GREEN
    case 'prohibited': return 'bg-red-600 hover:bg-red-700'; // Non-practicing - RED  
    case 'restricted': return 'bg-yellow-600 hover:bg-yellow-700'; // Major restrictions - YELLOW
    case 'beta': return 'bg-yellow-600 hover:bg-yellow-700'; // Beta with concerns - YELLOW
    case 'coming-soon': return 'bg-gray-400 hover:bg-gray-500'; // Coming soon - GRAY
    default: return 'bg-gray-400 hover:bg-gray-500';
  }
};

const States: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredStates = allStatesAndTerritories.filter(state => {
    const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         state.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || state.status === statusFilter;
    const matchesType = typeFilter === 'all' || state.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const productionStates = allStatesAndTerritories.filter(s => s.status === 'active').length;
  const totalStates = allStatesAndTerritories.filter(s => s.type === 'state').length;
  const totalTerritories = allStatesAndTerritories.filter(s => s.type === 'territory').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Jurisdiction Selection
                </h1>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                All 50 states plus territories - choose your jurisdiction
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/help">
                <Button variant="outline" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Help Guide
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">States</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalStates}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Territories</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTerritories}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Rules</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{getTotalRules()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Alerts</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{getTotalAlerts()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Production Ready</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{productionStates}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search states and territories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Production Ready</SelectItem>
              <SelectItem value="beta">Beta Version</SelectItem>
              <SelectItem value="restricted">Restricted Access</SelectItem>
              <SelectItem value="prohibited">Prohibited</SelectItem>
              <SelectItem value="coming-soon">Coming Soon</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">States & Territories</SelectItem>
              <SelectItem value="state">States Only</SelectItem>
              <SelectItem value="territory">Territories Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* State/Territory Cards with Color-Coded Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStates.map((jurisdiction) => (
            <Card key={jurisdiction.code} className="hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Color-coded status bar at top */}
              <div className={`h-1 w-full ${getStatusBarColor(jurisdiction.status)}`} />
              
              <CardContent className="p-6">
                {/* State name with rule count adjacent */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {jurisdiction.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                      {jurisdiction.code}
                    </div>
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {jurisdiction.totalRules} Rules
                    </div>
                  </div>
                </div>

                {/* Knowledge Silos Breakdown */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">PA Laws:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{jurisdiction.knowledgeSilos.paLaws}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Construction className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Construction:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{jurisdiction.knowledgeSilos.construction}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Insurance:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{jurisdiction.knowledgeSilos.insurance}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Legal:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{jurisdiction.knowledgeSilos.legal}</span>
                  </div>
                </div>

                {/* Color-Coded Action Button */}
                <div className="mt-4">
                  {jurisdiction.status === 'active' || jurisdiction.status === 'beta' || jurisdiction.status === 'restricted' ? (
                    <Link to={`/states/${jurisdiction.code}`} className="block">
                      <Button className={`w-full ${getActionButtonColor(jurisdiction.status)} text-white`}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Explore {jurisdiction.code} AI Assistant
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  ) : jurisdiction.status === 'prohibited' ? (
                    <Link to={`/states/${jurisdiction.code}`} className="block">
                      <Button className={`w-full ${getActionButtonColor(jurisdiction.status)} text-white`}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Why PA is Prohibited
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className={`w-full ${getActionButtonColor(jurisdiction.status)} text-white cursor-not-allowed opacity-60`}>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStates.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jurisdictions found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* Status Legend */}
        <Card className="mt-12 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Status Color Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-full h-3 bg-green-500 rounded mb-3"></div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Green Bar</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Production ready - full operations available
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-full h-3 bg-yellow-500 rounded mb-3"></div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Yellow Bar</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Restrictions apply - review special conditions
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-full h-3 bg-red-500 rounded mb-3"></div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Red Bar</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  PA prohibited - alternative strategies only
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-full h-3 bg-gray-400 rounded mb-3"></div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Gray Bar</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Coming soon - under development
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default States;