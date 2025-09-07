import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Shield, AlertTriangle, FileText, Users, Settings, Bell, TrendingUp, MapPin, Calendar, Filter, ExternalLink, ArrowRight, Building, Construction, Scale } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { ThemeToggle } from '../components/ui/theme-toggle';
import PinProtection from '../components/PinProtection';
import EnhancedStateRuleManager from '../components/EnhancedStateRuleManager';
import AlertSourceModal from '../components/AlertSourceModal';
import { StateRule, ComplianceAlert, AITemplate, SystemMetrics } from '../types/admin';
import { sampleRules, sampleAlerts, sampleTemplates } from '../data/sampleRules';
import { allStatesAndTerritories, getStateByCode, getTotalRules, getTotalAlerts } from '../data/allStatesData';
import { getPriorityColor, getConfidenceColor, formatDateTime } from '../lib/utils';

const Admin: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [authenticated, setAuthenticated] = useState(false);
  const [rules, setRules] = useState<StateRule[]>(sampleRules);
  const [alerts, setAlerts] = useState<ComplianceAlert[]>(sampleAlerts);
  const [templates, setTemplates] = useState<AITemplate[]>(sampleTemplates);
  const [selectedAlert, setSelectedAlert] = useState<ComplianceAlert | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || 'all');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dashboard');
  const [alertFilter, setAlertFilter] = useState('all');

  // All states and territories in alphabetical order
  const allJurisdictions = ['all', ...allStatesAndTerritories.map(j => j.code)];

  useEffect(() => {
    const newParams = new URLSearchParams();
    if (selectedState !== 'all') newParams.set('state', selectedState);
    if (activeTab !== 'dashboard') newParams.set('tab', activeTab);
    setSearchParams(newParams);
  }, [selectedState, activeTab, setSearchParams]);

  const systemMetrics: SystemMetrics = {
    total_rules: getTotalRules(),
    rules_by_confidence: {
      HIGH: rules.filter(r => r.confidence === 'HIGH').length,
      MEDIUM: rules.filter(r => r.confidence === 'MEDIUM').length,
      LOW: rules.filter(r => r.confidence === 'LOW').length,
    },
    expiring_rules: rules.filter(r => r.sunset && new Date(r.sunset) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)).length,
    active_alerts: getTotalAlerts(),
    states_covered: allStatesAndTerritories.length,
    last_updated: new Date().toISOString()
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'restricted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'prohibited': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'beta': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'coming-soon': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesState = selectedState === 'all' || alert.state === selectedState;
    const matchesFilter = alertFilter === 'all' || 
                         (alertFilter === 'unresolved' && !alert.resolved) ||
                         (alertFilter === 'high' && alert.priority === 'High') ||
                         (alertFilter === 'action' && alert.action_required);
    return matchesState && matchesFilter;
  });

  const filteredTemplates = templates.filter(template => {
    const templateName = template.name.toLowerCase();
    const templateText = template.template.toLowerCase();
    
    if (selectedState === 'all') {
      return true;
    }
    
    const stateData = getStateByCode(selectedState);
    if (!stateData) return false;
    
    const stateKeywords = [stateData.name.toLowerCase(), selectedState.toLowerCase()];
    return stateKeywords.some(keyword => 
      templateName.includes(keyword) || templateText.includes(keyword)
    );
  });

  const handleResolveAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const handleAlertClick = (alert: ComplianceAlert) => {
    setSelectedAlert(alert);
    setIsAlertModalOpen(true);
  };

  const handleStateNavigate = (stateCode: string) => {
    setSelectedState(stateCode);
    setActiveTab('rules');
  };

  if (!authenticated) {
    return <PinProtection onAuthenticate={setAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Coastal Claims Admin
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All 50 States + Territories Compliance System
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-40 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-80 overflow-y-auto">
                  <SelectItem value="all">All Jurisdictions</SelectItem>
                  {allStatesAndTerritories.map(jurisdiction => (
                    <SelectItem key={jurisdiction.code} value={jurisdiction.code}>
                      {jurisdiction.code} - {jurisdiction.name}
                      {jurisdiction.type === 'territory' && ' (Territory)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ThemeToggle />
              <Button
                variant="outline"
                onClick={() => setAuthenticated(false)}
                className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Dashboard</TabsTrigger>
            <TabsTrigger value="rules" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Rules</TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Alerts</TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Templates</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Jurisdictions</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {systemMetrics.states_covered}
                      </p>
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
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {systemMetrics.total_rules}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Confidence</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {systemMetrics.rules_by_confidence.HIGH}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Alerts</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {systemMetrics.active_alerts}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Production Ready</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {allStatesAndTerritories.filter(j => j.status === 'active').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* All Jurisdictions Overview Grid */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <MapPin className="h-5 w-5 mr-2" />
                  All Jurisdictions Overview
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Complete coverage across all 50 states plus territories with knowledge silos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {allStatesAndTerritories.map((jurisdiction) => (
                    <div
                      key={jurisdiction.code}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer border border-gray-200 dark:border-gray-600"
                      onClick={() => handleStateNavigate(jurisdiction.code)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mr-2">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                              {jurisdiction.code}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{jurisdiction.name}</h3>
                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(jurisdiction.status)}`}>
                              {jurisdiction.statusLabel}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                      </div>

                      <div className="text-center mb-3">
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{jurisdiction.totalRules}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Total Rules</p>
                      </div>

                      {/* Knowledge Silos Mini Display */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Building className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          <span className="text-gray-600 dark:text-gray-400">PA:</span>
                          <span className="font-bold text-gray-900 dark:text-white">{jurisdiction.knowledgeSilos.paLaws}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Construction className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                          <span className="text-gray-600 dark:text-gray-400">Const:</span>
                          <span className="font-bold text-gray-900 dark:text-white">{jurisdiction.knowledgeSilos.construction}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Shield className="h-3 w-3 text-green-600 dark:text-green-400" />
                          <span className="text-gray-600 dark:text-gray-400">Ins:</span>
                          <span className="font-bold text-gray-900 dark:text-white">{jurisdiction.knowledgeSilos.insurance}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Scale className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                          <span className="text-gray-600 dark:text-gray-400">Legal:</span>
                          <span className="font-bold text-gray-900 dark:text-white">{jurisdiction.knowledgeSilos.legal}</span>
                        </div>
                      </div>

                      {jurisdiction.specialMessage && (
                        <div className="mt-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
                          💡 {jurisdiction.specialMessage.substring(0, 50)}...
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Bell className="h-5 w-5 mr-2" />
                  Recent Compliance Alerts
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Latest alerts requiring attention across all jurisdictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.slice(0, 5).map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => handleAlertClick(alert)}
                    >
                      <div className="flex items-center space-x-3">
                        <Badge className={getPriorityColor(alert.priority)}>
                          {alert.priority}
                        </Badge>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {alert.message}
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>{alert.state}</span>
                            <span>•</span>
                            <span>{formatDateTime(alert.date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {alert.action_required && (
                          <Badge variant="outline" className="text-red-600 border-red-600 dark:text-red-400 dark:border-red-400">
                            Action Required
                          </Badge>
                        )}
                        {alert.resolved && (
                          <Badge variant="outline" className="text-green-600 border-green-600 dark:text-green-400 dark:border-green-400">
                            Resolved
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules">
            <EnhancedStateRuleManager
              rules={selectedState === 'all' ? rules : rules.filter(r => r.state === selectedState)}
              onRulesChange={setRules}
              selectedState={selectedState}
            />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Compliance Alerts
                  {selectedState !== 'all' && (
                    <span className="ml-2 text-blue-600 dark:text-blue-400">
                      ({selectedState})
                    </span>
                  )}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredAlerts.length} alerts • {filteredAlerts.filter(a => !a.resolved).length} unresolved
                </p>
              </div>
              <Select value={alertFilter} onValueChange={setAlertFilter}>
                <SelectTrigger className="w-48 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Alerts</SelectItem>
                  <SelectItem value="unresolved">Unresolved</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="action">Action Required</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {filteredAlerts.map((alert) => (
                <Card key={alert.id} className="hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6" onClick={() => handleAlertClick(alert)}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getPriorityColor(alert.priority)}>
                            {alert.priority}
                          </Badge>
                          <Badge variant="outline" className="border-gray-300 dark:border-gray-600">{alert.type}</Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="h-3 w-3" />
                            {alert.state}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-3 w-3" />
                            {formatDateTime(alert.date)}
                          </div>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                          {alert.message}
                        </h3>
                        {alert.rule_id && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Related Rule: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{alert.rule_id}</code>
                          </p>
                        )}
                        {alert.deadline && (
                          <p className="text-sm text-red-600 dark:text-red-400">
                            Deadline: {formatDateTime(alert.deadline)}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        {alert.action_required && (
                          <Badge variant="outline" className="text-red-600 border-red-600 dark:text-red-400 dark:border-red-400">
                            Action Required
                          </Badge>
                        )}
                        {alert.resolved ? (
                          <Badge variant="outline" className="text-green-600 border-green-600 dark:text-green-400 dark:border-green-400">
                            Resolved
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleResolveAlert(alert.id);
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAlerts.length === 0 && (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No alerts found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All compliance alerts are up to date for the selected filters.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  AI Response Templates
                  {selectedState !== 'all' && (
                    <span className="ml-2 text-blue-600 dark:text-blue-400">
                      ({selectedState})
                    </span>
                  )}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredTemplates.length} templates 
                  {selectedState !== 'all' && ` for ${selectedState}`}
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Template
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-gray-900 dark:text-white">{template.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="border-gray-300 dark:border-gray-600">{template.category}</Badge>
                          <Badge className={getConfidenceColor(template.confidence)}>
                            {template.confidence}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50 dark:border-red-600 dark:hover:bg-red-900/20">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                      <p className="text-sm font-mono text-gray-800 dark:text-gray-200">{template.template}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Variables ({template.variables.length}):
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-300 dark:border-gray-600">
                            {`{{${variable}}}`}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No templates found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedState === 'all' 
                    ? 'No templates available in the system'
                    : `No templates found for ${selectedState}. Templates may be available for other states.`
                  }
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Settings className="h-5 w-5 mr-2" />
                  System Settings
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Configure system preferences and security settings for all jurisdictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="alert-frequency" className="text-gray-700 dark:text-gray-300">Alert Notification Frequency</Label>
                  <Select>
                    <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="confidence-threshold" className="text-gray-700 dark:text-gray-300">Minimum Confidence Threshold</Label>
                  <Select>
                    <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="session-timeout" className="text-gray-700 dark:text-gray-300">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    placeholder="30"
                    min="5"
                    max="480"
                    className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  />
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white mr-2">
                    Save Settings
                  </Button>
                  <Button variant="outline" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                    Reset to Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AlertSourceModal
        alert={selectedAlert}
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onResolve={handleResolveAlert}
      />
    </div>
  );
};

export default Admin;