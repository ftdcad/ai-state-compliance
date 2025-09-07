import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Bot, User, Loader2, Brain, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface ConversationMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  context?: {
    state: string;
    silo: string;
    relatedRules?: string[];
    leveragePoints?: string[];
  };
}

interface ConversationalAIProps {
  state: string;
  silo?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ConversationalAI: React.FC<ConversationalAIProps> = ({
  state,
  silo = 'general',
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize with welcome message
      const welcomeMessage: ConversationMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: getWelcomeMessage(),
        timestamp: new Date(),
        context: { state, silo }
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, state, silo]);

  const getWelcomeMessage = () => {
    const stateData = getStateInfo(state);
    const siloName = getSiloDisplayName(silo);
    
    if (stateData?.status === 'prohibited') {
      return `Welcome to ${stateData.name} compliance assistant. Public adjusting is prohibited in this state. I can help you understand why and explore insurance carrier obligations and legal resources instead. What would you like to know?`;
    }

    return `Welcome to the ${stateData?.name || state} ${siloName} assistant! I can help you with:

${getSiloCapabilities(silo)}

What specific question do you have about ${state} regulations?`;
  };

  const getSiloDisplayName = (siloType: string) => {
    const siloNames = {
      'public_adjusting': '🏛️ Public Adjusting Laws',
      'construction': '🏗️ Construction/Contractor Laws',
      'insurance_carrier': '🏢 Insurance Carrier Obligations',
      'legal': '⚖️ Legal/Attorney Resources',
      'general': 'Compliance'
    };
    return siloNames[siloType as keyof typeof siloNames] || 'Compliance';
  };

  const getSiloCapabilities = (siloType: string) => {
    const capabilities = {
      'public_adjusting': '• License requirements and verification\n• Fee limitations and compliance\n• Contract requirements\n• Solicitation restrictions',
      'construction': '• Material matching requirements\n• Building code compliance\n• Contractor licensing\n• Construction defect claims',
      'insurance_carrier': '• Payment deadline violations\n• Communication requirements\n• Breach detection\n• Prompt pay rules',
      'legal': '• Fee shifting opportunities\n• Bad faith elements\n• Attorney fee recovery\n• Litigation leverage',
      'general': '• Cross-silo guidance\n• Multi-jurisdictional questions\n• Compliance overview\n• Best practices'
    };
    return capabilities[siloType as keyof typeof capabilities] || '• General compliance guidance';
  };

  const getStateInfo = (stateCode: string) => {
    // This would normally come from your state data
    const mockStateData: Record<string, any> = {
      'KY': { name: 'Kentucky', status: 'active' },
      'FL': { name: 'Florida', status: 'active' },
      'AL': { name: 'Alabama', status: 'prohibited' },
      'TX': { name: 'Texas', status: 'active' },
      'CO': { name: 'Colorado', status: 'active' }
    };
    return mockStateData[stateCode];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      context: { state, silo }
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (in real implementation, this would call your AI service)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, state, silo);
      const aiMessage: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        context: {
          state,
          silo,
          relatedRules: aiResponse.relatedRules,
          leveragePoints: aiResponse.leveragePoints
        }
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (message: string, state: string, silo: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Kentucky-specific responses
    if (state === 'KY') {
      if (lowerMessage.includes('fee') || lowerMessage.includes('percentage')) {
        return {
          content: `**KENTUCKY FEE COMPLIANCE ALERT:**

• **Non-catastrophic claims**: Fee ≤ 15% of total recovery
• **Catastrophic claims**: Fee ≤ 10% of total recovery  
• **72-Hour Rule**: If insurer pays or commits to pay policy limits within 72 hours of first notice, you may only charge reasonable time-based fees (NO percentage)

**LEVERAGE POINTS:**
✅ Policy limits payment within 72 hours = percentage fees VOID
✅ Fee violations create contract voidability
✅ Can challenge competitors violating fee caps

*Source: 2023 HB 232 § 1(4)(c)*`,
          relatedRules: ['KY-PUBADJ-FEES-003'],
          leveragePoints: ['72-hour rule protection', 'Contract voidability', 'Competitive advantage']
        };
      }

      if (lowerMessage.includes('payment') || lowerMessage.includes('30 day')) {
        return {
          content: `**KENTUCKY 30-DAY PAYMENT RULE:**

Insurers must pay **all undisputed amounts** within 30 days of receiving notice and proof of claim.

**VIOLATIONS TRIGGER:**
🔥 **12% interest** (automatic)
🔥 **Attorney fees** (if delay without reasonable foundation)
🔥 **Breach of contract** claim

**LEVERAGE STRATEGY:**
1. Document exact notice/proof dates
2. Identify truly undisputed amounts
3. Calculate 12% interest accumulation
4. Demand immediate payment + penalties

*Source: KRS 304.12-235(1)-(3)*`,
          relatedRules: ['KY-CARRIER-PAY-005'],
          leveragePoints: ['12% interest penalty', 'Attorney fee recovery', 'Settlement pressure']
        };
      }
    }

    // Florida-specific responses
    if (state === 'FL') {
      if (lowerMessage.includes('90 day') || lowerMessage.includes('prompt pay')) {
        return {
          content: `**FLORIDA 90-DAY PROMPT PAY VIOLATION:**

Within **90 days** of receiving notice, insurer must pay or deny all or part of initial, reopened, or supplemental property claims.

**AUTOMATIC CONSEQUENCES:**
⚡ **Statutory interest** from notice date
⚡ **Breach of contract** (automatic)
⚡ **Limited exceptions** (insurer must prove)

**LITIGATION LEVERAGE:**
• Document exact notice date
• Calculate interest accumulation  
• Challenge any exception claims
• Immediate settlement pressure

*Source: § 627.70131(7)(a) Fla. Stat.*`,
          relatedRules: ['FL-CARRIER-PAY-004'],
          leveragePoints: ['Automatic breach', 'Statutory interest', 'Limited defenses']
        };
      }

      if (lowerMessage.includes('emergency') || lowerMessage.includes('10%')) {
        return {
          content: `**FLORIDA EMERGENCY EVENT FEE ANALYSIS:**

**DECLARED EMERGENCY EVENTS:**
• Fee ≤ **10%** of amounts paid
• Applies for **1 year** after event
• Governor declaration required

**ALL OTHER CLAIMS:**
• Fee ≤ **20%** of settlement

**CRITICAL COMPLIANCE:**
• Reopened/supplemental claims = 20% cap (NOT 10%)
• NO compensation based on deductibles
• Contract must be DFS-approved form

*Source: § 626.854 Fla. Stat.*`,
          relatedRules: ['FL-PUBADJ-FEES-002'],
          leveragePoints: ['Emergency vs normal rates', 'One-year limitation', 'DFS form requirement']
        };
      }
    }

    // Colorado fee shifting
    if (state === 'CO' && (lowerMessage.includes('fee shift') || lowerMessage.includes('bad faith'))) {
      return {
        content: `**COLORADO FEE SHIFTING OPPORTUNITY:**

Colorado provides **attorney fee recovery** for successful bad faith claims.

**LEVERAGE STRATEGY:**
1. Document insurer unreasonable conduct
2. Preserve denial/delay evidence  
3. Calculate full attorney time
4. Use fee shifting as settlement leverage

**BAD FAITH ELEMENTS TO PROVE:**
• Unreasonable denial/delay
• Inadequate investigation
• Failure to communicate
• Breach of good faith duty

**SETTLEMENT IMPACT:** Insurers face paying your legal costs = major settlement pressure`,
        relatedRules: ['CO-LEGAL-FEES-001'],
        leveragePoints: ['Full fee recovery', 'Settlement leverage', 'Bad faith documentation']
      };
    }

    // Alabama prohibited response
    if (state === 'AL') {
      return {
        content: `**ALABAMA PUBLIC ADJUSTING PROHIBITION:**

❌ **Public adjusting is ILLEGAL in Alabama**

**WHY WE DON'T WORK HERE:**
• No licensing framework exists
• Unauthorized practice violations  
• Criminal penalties possible
• No consumer protections

**ALTERNATIVE STRATEGIES:**
• Insurance carrier obligation enforcement
• Legal consultation referrals
• Construction defect analysis
• Bad faith claim evaluation

**BOTTOM LINE:** Direct PA representation = legal liability`,
        relatedRules: ['AL-PROHIBITION-001'],
        leveragePoints: ['Legal compliance', 'Risk avoidance', 'Alternative approaches']
      };
    }

    // Generic response
    return {
      content: `I can help you with ${getSiloDisplayName(silo)} questions for ${state}. 

Could you be more specific about:
• Licensing requirements?
• Fee limitations?  
• Payment deadlines?
• Compliance violations?
• Leverage opportunities?

The more specific your question, the better I can assist with actionable guidance.`,
      relatedRules: [],
      leveragePoints: []
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex flex-col">
        <CardHeader className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-gray-900 dark:text-white">
                  {state} {getSiloDisplayName(silo)} Assistant
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  AI-powered compliance guidance and leverage identification
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" onClick={onClose} className="border-gray-300 dark:border-gray-600">
              Close
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`rounded-lg p-4 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.context?.leveragePoints && message.context.leveragePoints.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex flex-wrap gap-1">
                            {message.context.leveragePoints.map((point, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-yellow-300 text-yellow-700 dark:border-yellow-600 dark:text-yellow-400">
                                💡 {point}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-600 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">Analyzing compliance requirements...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask about ${state} ${getSiloDisplayName(silo).replace(/[🏛️🏗️🏢⚖️]/g, '').trim()}...`}
                className="flex-1 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Press Enter to send • Ask specific questions for better guidance
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationalAI;