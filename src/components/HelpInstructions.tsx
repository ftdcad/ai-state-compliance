import React from 'react';
import { BookOpen, MessageCircle, Shield, AlertTriangle, Target, Users, Building, Construction, Scale, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const HelpInstructions: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* System Overview */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
          <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Coastal Claims AI Assistant Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your comprehensive tool for navigating insurance compliance across all 50 states plus territories. 
          This guide will help you maximize the system's capabilities and identify strategic advantages.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="silos">Knowledge Silos</TabsTrigger>
          <TabsTrigger value="ai-chat">AI Chat Guide</TabsTrigger>
          <TabsTrigger value="states">State Status</TabsTrigger>
          <TabsTrigger value="leverage">Finding Leverage</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                What This System Does
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                The Coastal Claims AI Assistant is a specialized compliance navigation tool that helps you:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Compliance Navigation</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Navigate complex regulatory requirements across multiple states with confidence
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">Leverage Identification</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Identify strategic advantages and enforcement gaps for competitive positioning
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-purple-800 dark:text-purple-200">AI-Powered Guidance</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Get instant, context-aware answers to state-specific compliance questions
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-orange-800 dark:text-orange-200">Risk Mitigation</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Avoid compliance violations and identify deadline-driven opportunities
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Use This System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Select Your State</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Navigate to the States page and select the jurisdiction you're working in. Pay attention to the color-coded status.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Choose Your Knowledge Silo</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Select the appropriate silo based on your specific need: PA Laws, Construction, Insurance, or Legal.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Ask Specific Questions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Use the AI chat to ask detailed questions. The more specific you are, the better guidance you'll receive.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Look for Leverage Points</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pay attention to highlighted leverage opportunities in AI responses - these are strategic advantages.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="silos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Silo Guide</CardTitle>
              <CardDescription>
                Understanding when and how to use each specialized knowledge area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* PA Laws Silo */}
                <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🏛️ Public Adjusting Laws & Rules</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Everything related to PA licensing, fees, and operations</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">Use This Silo For:</h4>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• License verification and requirements</li>
                        <li>• Fee limitation compliance</li>
                        <li>• Contract requirements and restrictions</li>
                        <li>• Solicitation timing and methods</li>
                        <li>• Bonding requirements</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Common Leverage Points:</h4>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Competitor license violations</li>
                        <li>• Fee cap enforcement</li>
                        <li>• Contract voidability issues</li>
                        <li>• Unauthorized practice claims</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Construction Silo */}
                <div className="border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Construction className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🏗️ Construction/Contractor Laws</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Material matching, building codes, and contractor requirements</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">Use This Silo For:</h4>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Material matching requirements</li>
                        <li>• Building code upgrade obligations</li>
                        <li>• Contractor licensing verification</li>
                        <li>• Construction defect opportunities</li>
                        <li>• Code compliance enforcement</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Common Leverage Points:</h4>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Full area replacement requirements</li>
                        <li>• Code upgrade cost coverage</li>
                        <li>• Matching standard violations</li>
                        <li>• Workmanship warranty issues</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Insurance Carrier Silo */}
                <div className="border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🏢 Insurance Carrier Obligations</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Payment deadlines, communication requirements, and breach detection</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">Use This Silo For:</h4>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Payment deadline violations</li>
                        <li>• Communication requirement failures</li>
                        <li>• Prompt pay rule enforcement</li>
                        <li>• Investigation timeline violations</li>
                        <li>• Status letter requirements</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Common Leverage Points:</h4>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Automatic breach from deadline violations</li>
                        <li>• Interest penalties and fees</li>
                        <li>• Bad faith evidence collection</li>
                        <li>• Settlement pressure tactics</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Legal Silo */}
                <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Scale className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">⚖️ Legal/Attorney Resources</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Fee shifting, bad faith elements, and litigation leverage</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">Use This Silo For:</h4>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Fee shifting opportunities</li>
                        <li>• Bad faith claim elements</li>
                        <li>• Attorney fee recovery rules</li>
                        <li>• Litigation leverage strategies</li>
                        <li>• Statute of limitations issues</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Common Leverage Points:</h4>
                      <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Full attorney fee recovery</li>
                        <li>• Punitive damage availability</li>
                        <li>• Settlement leverage from fee risk</li>
                        <li>• Bad faith tort claims</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                AI Chat Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">✅ Effective Questions</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">State-Specific:</p>
                      <p className="text-sm text-green-700 dark:text-green-300">"What are Kentucky's fee limitations for catastrophic claims?"</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">Scenario-Based:</p>
                      <p className="text-sm text-green-700 dark:text-green-300">"Insurer hasn't responded in 35 days to our Florida claim notice - what leverage do we have?"</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">Deadline-Focused:</p>
                      <p className="text-sm text-green-700 dark:text-green-300">"What payment deadlines apply to undisputed amounts in Kentucky?"</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">❌ Avoid These Questions</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">Too General:</p>
                      <p className="text-sm text-red-700 dark:text-red-300">"How do I handle insurance claims?"</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">Multi-State:</p>
                      <p className="text-sm text-red-700 dark:text-red-300">"What are the rules in all states?"</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">Outside Scope:</p>
                      <p className="text-sm text-red-700 dark:text-red-300">"How do I market my business?"</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Pro Tips for Maximum Value</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Include Specific Details</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Mention claim amounts, timelines, and specific circumstances for more targeted advice.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Ask About Leverage</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Specifically ask "What leverage do we have?" to get strategic advantage insights.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Focus on Deadlines</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ask about specific deadlines and what happens when they're missed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Identify Violations</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ask how to detect and document compliance violations for evidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="states" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>State Status Guide</CardTitle>
              <CardDescription>Understanding what each status means and how to proceed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Active States */}
                  <div className="border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">Production Ready (Green)</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Full operations available with comprehensive rule sets and AI guidance.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Action:</strong> Proceed with confidence</p>
                      <p className="text-sm"><strong>Coverage:</strong> Complete compliance guidance</p>
                      <p className="text-sm"><strong>AI:</strong> Full specialized responses</p>
                    </div>
                  </div>

                  {/* Restricted States */}
                  <div className="border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">Restricted/Beta (Yellow)</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Special conditions apply - review restrictions before proceeding.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Action:</strong> Review special messages</p>
                      <p className="text-sm"><strong>Coverage:</strong> Limited or conditional</p>
                      <p className="text-sm"><strong>AI:</strong> Includes restriction warnings</p>
                    </div>
                  </div>

                  {/* Prohibited States */}
                  <div className="border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">PA Prohibited (Red)</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Public adjusting is illegal - alternative strategies only.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Action:</strong> Do not engage in PA activities</p>
                      <p className="text-sm"><strong>Coverage:</strong> Alternative strategies</p>
                      <p className="text-sm"><strong>AI:</strong> Explains prohibition & alternatives</p>
                    </div>
                  </div>

                  {/* Coming Soon */}
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Coming Soon (Gray)</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Under development - limited information available.
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Action:</strong> Check back later</p>
                      <p className="text-sm"><strong>Coverage:</strong> Basic information only</p>
                      <p className="text-sm"><strong>AI:</strong> Limited responses</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Special Messages</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Many states include special messages with crucial information like "72-hour policy limits rule" for Kentucky 
                    or "90-day prompt pay violations = automatic breach" for Florida. Always read these carefully.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leverage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Finding and Using Leverage Points
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-400">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">💡 What Are Leverage Points?</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Leverage points are strategic advantages created by compliance violations, deadline misses, or regulatory gaps 
                  that can be used to pressure favorable settlements or outcomes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-700 dark:text-green-300">High-Impact Leverage Types</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg">
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">Payment Deadline Violations</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Automatic interest penalties and potential attorney fees
                      </p>
                      <Badge className="mt-2 bg-green-100 text-green-800">High Impact</Badge>
                    </div>
                    
                    <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Fee Shifting Opportunities</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Potential recovery of all attorney costs from opposing party
                      </p>
                      <Badge className="mt-2 bg-blue-100 text-blue-800">High Impact</Badge>
                    </div>
                    
                    <div className="p-4 border border-purple-200 dark:border-purple-800 rounded-lg">
                      <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-1">Automatic Breach Events</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        Violations that create immediate breach of contract claims
                      </p>
                      <Badge className="mt-2 bg-purple-100 text-purple-800">High Impact</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-orange-700 dark:text-orange-300">How to Identify Leverage</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-xs">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Document Everything</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Track all dates, communications, and deadline violations meticulously
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-xs">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Ask Specific AI Questions</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          "What leverage do we have with this 35-day payment delay?"
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-xs">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Focus on Deadlines</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Most leverage comes from missed deadlines and timeline violations
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-xs">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Look for Patterns</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Repeated violations create stronger leverage than isolated incidents
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-400">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">⚠️ Important Notice</h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  This system provides guidance on regulatory compliance and potential leverage points. Always consult with 
                  qualified legal counsel before taking action on identified opportunities. This is not legal advice.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="best-practices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Best Practices & Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Workflow Best Practices */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">📋 Workflow Best Practices</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Start with State Status</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Always check the state status before proceeding. Red = don't work there, Yellow = proceed with caution.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Use the Right Silo</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        PA Laws for licensing/fees, Insurance for deadline violations, Legal for fee shifting, Construction for matching.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Document Everything</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Save important AI responses and maintain detailed records of all compliance-related information.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Common Pitfalls */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">⚠️ Common Pitfalls to Avoid</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">Ignoring State Status</h4>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Working in prohibited states can result in legal liability. Always check status first.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">Generic Questions</h4>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        "What are the rules?" won't get useful answers. Be specific about your situation and state.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-medium text-red-800 dark:text-red-200 mb-1">Missing Special Messages</h4>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Special messages contain crucial state-specific information. Always read them carefully.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Reference */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">🚀 Quick Reference Commands</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Kentucky Specific:</h4>
                    <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      <div>"What are KY fee caps?"</div>
                      <div>"KY 72-hour rule explanation"</div>
                      <div>"KY 30-day payment deadline"</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Florida Specific:</h4>
                    <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      <div>"FL 90-day prompt pay rule"</div>
                      <div>"FL emergency fee limits"</div>
                      <div>"FL solicitation restrictions"</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">General Leverage:</h4>
                    <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      <div>"What leverage do we have?"</div>
                      <div>"Payment deadline violations"</div>
                      <div>"Fee shifting opportunities"</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Compliance Checks:</h4>
                    <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      <div>"License verification process"</div>
                      <div>"Contract requirements"</div>
                      <div>"Bond requirements"</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpInstructions;