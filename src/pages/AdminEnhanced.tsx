import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { RuleForm } from '../components/admin/RuleForm';
import { RulesList } from '../components/admin/RulesList';
import { Plus, Database, Users, Settings, ArrowLeft, BarChart3, Shield, FileText } from 'lucide-react';
import { EnhancedStateRule as StateRule } from '../types/enhanced-admin';
import { useRulesState } from '../hooks/useRulesState';
import { ThemeToggle } from '../components/ui/theme-toggle';

const AdminEnhanced = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'add-rule' | 'manage-rules'>('overview');
  const [editingRule, setEditingRule] = useState<StateRule | null>(null);
  const { rules, isLoaded, saveRule, deleteRule } = useRulesState();

  const handleSaveRule = (rule: StateRule) => {
    console.log('Admin: Saving rule', rule.id);
    saveRule(rule);
    setEditingRule(null);
    setActiveTab('manage-rules');
  };

  const handleEditRule = (rule: StateRule) => {
    console.log('Admin: Editing rule', rule.id);
    setEditingRule(rule);
    setActiveTab('add-rule');
  };

  const handleDeleteRule = (ruleId: string) => {
    console.log('Admin: Deleting rule', ruleId);
    deleteRule(ruleId);
  };

  // Don't render until rules are loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading rules...</div>
        </div>
      </div>
    );
  }

  const stats = {
    totalRules: rules.length,
    activeRules: rules.filter(r => (r as any).status === 'active' || r.confidence === 'HIGH').length,
    betaRules: rules.filter(r => (r as any).status === 'beta' || r.confidence === 'MEDIUM').length,
    lowConfidence: rules.filter(r => r.confidence === 'LOW').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage compliance rules and system settings
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/states">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to States
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === 'add-rule' ? 'default' : 'outline'}
            onClick={() => {
              setEditingRule(null);
              setActiveTab('add-rule');
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
          <Button
            variant={activeTab === 'manage-rules' ? 'default' : 'outline'}
            onClick={() => setActiveTab('manage-rules')}
          >
            <Database className="h-4 w-4 mr-2" />
            Manage Rules
          </Button>
        </div>

        {/* Content Area */}
        {activeTab === 'overview' && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Rules
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRules}</div>
                <p className="text-xs text-muted-foreground">
                  Across all states and categories
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Rules
                </CardTitle>
                <Shield className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeRules}</div>
                <p className="text-xs text-muted-foreground">
                  High confidence rules
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Beta Rules
                </CardTitle>
                <Database className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.betaRules}</div>
                <p className="text-xs text-muted-foreground">
                  Medium confidence
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Low Confidence
                </CardTitle>
                <Users className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.lowConfidence}</div>
                <p className="text-xs text-muted-foreground">
                  Needs review
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'add-rule' && (
          <RuleForm
            rule={editingRule}
            onSave={handleSaveRule}
            onCancel={() => setActiveTab('manage-rules')}
          />
        )}

        {activeTab === 'manage-rules' && (
          <RulesList
            rules={rules}
            onEdit={handleEditRule}
            onDelete={handleDeleteRule}
          />
        )}
      </div>
    </div>
  );
};

export default AdminEnhanced;