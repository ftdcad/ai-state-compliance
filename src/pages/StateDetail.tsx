import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Shield, MessageCircle, Building, Construction, Scale, ArrowLeft, Users, Brain, FileText, Target, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ThemeToggle } from '../components/ui/theme-toggle';
import ConversationalAI from '../components/ConversationalAI';
import { getStateByCode } from '../data/allStatesData';

const StateDetail: React.FC = () => {
  const { stateCode } = useParams<{ stateCode: string }>();
  const [searchParams] = useSearchParams();
  const silo = searchParams.get('silo') || 'general';
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiSilo, setAISilo] = useState('general');

  const stateData = getStateByCode(stateCode || '');

  if (!stateData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">State Not Found</h1>
          <Link to="/states">
            <Button>← Back to States</Button>
          </Link>
        </div>
      </div>
    );
  }

  const openAIChat = (selectedSilo: string) => {
    setAISilo(selectedSilo);
    setIsAIOpen(true);
  };

  const getSiloIcon = (siloType: string) => {
    const icons = {
      'public_adjusting': <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      'construction': <Construction className="h-8 w-8 text-orange-600 dark:text-orange-400" />,
      'insurance_carrier': <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />,
      'legal': <Scale className="h-8 w-8 text-purple-600 dark:text-purple-400" />
    };
    return icons[siloType as keyof typeof icons];
  };

  const getSiloColor = (siloType: string) => {
    const colors = {
      'public_adjusting': 'from-blue-500 to-blue-600',
      'construction': 'from-orange-500 to-orange-600', 
      'insurance_carrier': 'from-green-500 to-green-600',
      'legal': 'from-purple-500 to-purple-600'
    };
    return colors[siloType as keyof typeof colors];
  };

  const getSiloDescription = (siloType: string) => {
    const descriptions = {
      'public_adjusting': 'License requirements, fee limitations, contract compliance, and solicitation rules for public adjusters operating in this state.',
      'construction': 'Material matching requirements, building code compliance, contractor licensing, and construction defect claim opportunities.',
      'insurance_carrier': 'Payment deadlines, communication requirements, breach detection, and prompt pay rule violations.',
      'legal': 'Fee shifting opportunities, bad faith elements, attorney fee recovery, and litigation leverage strategies.'
    };
    return descriptions[siloType as keyof typeof descriptions];
  };

  const getSiloQuestions = (siloType: string) => {
    const questions = {
      'public_adjusting': [
        'What are the licensing requirements?',
        'What are the fee limitations?',
        'Are there solicitation restrictions?',
        'What contract requirements exist?'
      ],
      'construction': [
        'What are material matching rules?',
        'Are there building code upgrade requirements?',
        'How do contractor licensing laws help?',
        'What construction defect opportunities exist?'
      ],
      'insurance_carrier': [
        'What are the payment deadlines?',
        'How do I detect deadline violations?',
        'What communication is required?',
        'How do prompt pay rules work?'
      ],
      'legal': [
        'Are attorney fees recoverable?',
        'What triggers fee shifting?',
        'How do I prove bad faith?',
        'What litigation leverage exists?'
      ]
    };
    return questions[siloType as keyof typeof questions] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/states" className="mr-4">
                <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {stateData.code}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stateData.name}
                    {stateData.type === 'territory' && (
                      <Badge className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                        Territory
                      </Badge>
                    )}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {stateData.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/help">
                <Button variant="outline" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Help Guide
                </Button>
              </Link>
              <Button 
                onClick={() => openAIChat('general')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Brain className="h-4 w-4 mr-2" />
                Ask AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Special Message Alert */}
        {stateData.specialMessage && (
          <div className="mb-8">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-center">
                <Target className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                <p className="font-medium text-amber-800 dark:text-amber-200">
                  💡 {stateData.specialMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Status and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {stateData.statusLabel}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Status</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {stateData.totalRules}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Rules</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                {stateData.alerts}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Alerts</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {stateData.lastUpdated}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
            </CardContent>
          </Card>
        </div>

        {/* Knowledge Silos */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Knowledge Silos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(stateData.knowledgeSilos).map(([siloKey, count]) => {
              const siloType = siloKey === 'paLaws' ? 'public_adjusting' :
                               siloKey === 'construction' ? 'construction' :
                               siloKey === 'insurance' ? 'insurance_carrier' : 'legal';
              
              const siloNames = {
                'paLaws': '🏛️ Public Adjusting Laws & Rules',
                'construction': '🏗️ Construction/Contractor Laws',
                'insurance': '🏢 Insurance Carrier Obligations',
                'legal': '⚖️ Legal/Attorney Resources'
              };

              return (
                <Card key={siloKey} className="hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getSiloIcon(siloType)}
                        <div className="ml-4">
                          <CardTitle className="text-lg text-gray-900 dark:text-white">
                            {siloNames[siloKey as keyof typeof siloNames]}
                          </CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {count} Rules
                          </Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => openAIChat(siloType)}
                        className={`bg-gradient-to-r ${getSiloColor(siloType)} text-white`}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Ask AI
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-gray-600 dark:text-gray-400">
                      {getSiloDescription(siloType)}
                    </CardDescription>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Questions:</p>
                      {getSiloQuestions(siloType).map((question, index) => (
                        <button
                          key={index}
                          onClick={() => openAIChat(siloType)}
                          className="block w-full text-left text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                        >
                          • {question}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conversational AI Modal */}
      <ConversationalAI
        state={stateData.code}
        silo={aiSilo}
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
    </div>
  );
};

export default StateDetail;