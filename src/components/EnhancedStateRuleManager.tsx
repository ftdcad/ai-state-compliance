import React, { useState, useEffect } from 'react';
import { StateRule } from '../types/admin';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Edit, Trash2, Search, Filter, FileText, Shield, AlertTriangle } from 'lucide-react';
import { getConfidenceColor, generateRuleId, formatDate } from '../lib/utils';

interface EnhancedStateRuleManagerProps {
  rules: StateRule[];
  onRulesChange: (rules: StateRule[]) => void;
  selectedState: string;
}

const EnhancedStateRuleManager: React.FC<EnhancedStateRuleManagerProps> = ({
  rules,
  onRulesChange,
  selectedState
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterConfidence, setFilterConfidence] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<StateRule | null>(null);

  const [newRule, setNewRule] = useState<Partial<StateRule>>({
    state: selectedState,
    category: '',
    subcategory: '',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    text: '',
    sources: [],
    tests: []
  });

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.rule_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || rule.category === filterCategory;
    const matchesConfidence = filterConfidence === 'all' || rule.confidence === filterConfidence;
    const matchesState = selectedState === 'all' || rule.state === selectedState;
    
    return matchesSearch && matchesCategory && matchesConfidence && matchesState;
  });

  const categories = Array.from(new Set(rules.map(rule => rule.category)));

  const handleAddRule = () => {
    if (!newRule.category || !newRule.subcategory || !newRule.text) return;

    const rule: StateRule = {
      id: Date.now().toString(),
      rule_id: generateRuleId(selectedState, newRule.category, newRule.subcategory),
      state: selectedState,
      version: '1.0',
      category: newRule.category,
      subcategory: newRule.subcategory,
      authority_level: newRule.authority_level as any,
      confidence: newRule.confidence as any,
      text: newRule.text,
      sources: newRule.sources || [],
      tests: newRule.tests || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    onRulesChange([...rules, rule]);
    setNewRule({
      state: selectedState,
      category: '',
      subcategory: '',
      authority_level: 'STATUTE',
      confidence: 'HIGH',
      text: '',
      sources: [],
      tests: []
    });
    setIsAddModalOpen(false);
  };

  const handleUpdateRule = (updatedRule: StateRule) => {
    const updated = rules.map(rule => 
      rule.id === updatedRule.id 
        ? { ...updatedRule, updated_at: new Date().toISOString() }
        : rule
    );
    onRulesChange(updated);
    setEditingRule(null);
  };

  const handleDeleteRule = (ruleId: string) => {
    onRulesChange(rules.filter(rule => rule.id !== ruleId));
  };

  const getAuthorityIcon = (level: string) => {
    switch (level) {
      case 'STATUTE': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'REG': return <FileText className="h-4 w-4 text-green-600" />;
      case 'ADVISORY': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'CASE': return <FileText className="h-4 w-4 text-purple-600" />;
      case 'AGENCY': return <Shield className="h-4 w-4 text-gray-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {selectedState === 'all' ? 'All States' : selectedState} Rule Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredRules.length} rules • {rules.filter(r => r.confidence === 'HIGH').length} high confidence
          </p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Compliance Rule</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newRule.category}
                    onChange={(e) => setNewRule({...newRule, category: e.target.value})}
                    placeholder="e.g., Public Adjuster"
                  />
                </div>
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Input
                    id="subcategory"
                    value={newRule.subcategory}
                    onChange={(e) => setNewRule({...newRule, subcategory: e.target.value})}
                    placeholder="e.g., Licensing"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="authority">Authority Level</Label>
                  <Select value={newRule.authority_level} onValueChange={(value) => setNewRule({...newRule, authority_level: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STATUTE">Statute</SelectItem>
                      <SelectItem value="REG">Regulation</SelectItem>
                      <SelectItem value="ADVISORY">Advisory</SelectItem>
                      <SelectItem value="CASE">Case Law</SelectItem>
                      <SelectItem value="AGENCY">Agency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="confidence">Confidence Level</Label>
                  <Select value={newRule.confidence} onValueChange={(value) => setNewRule({...newRule, confidence: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="text">Rule Text</Label>
                <Textarea
                  id="text"
                  value={newRule.text}
                  onChange={(e) => setNewRule({...newRule, text: e.target.value})}
                  placeholder="Enter the full text of the compliance rule..."
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddRule}>
                  Add Rule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search rules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterConfidence} onValueChange={setFilterConfidence}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by confidence" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Confidence Levels</SelectItem>
            <SelectItem value="HIGH">High Confidence</SelectItem>
            <SelectItem value="MEDIUM">Medium Confidence</SelectItem>
            <SelectItem value="LOW">Low Confidence</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {filteredRules.map((rule) => (
          <Card key={rule.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {rule.rule_id}
                    </Badge>
                    <Badge className={getConfidenceColor(rule.confidence)}>
                      {rule.confidence}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {getAuthorityIcon(rule.authority_level)}
                      <span className="text-xs text-gray-600">{rule.authority_level}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{rule.category} - {rule.subcategory}</CardTitle>
                  <CardDescription>{rule.text}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingRule(rule)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteRule(rule.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sources:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {rule.sources.map((source, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Created: {formatDate(rule.created_at)}</span>
                  <span>Updated: {formatDate(rule.updated_at)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRules.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No rules found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || filterCategory !== 'all' || filterConfidence !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Add your first compliance rule to get started'
            }
          </p>
        </div>
      )}

      {/* Edit Rule Modal */}
      {editingRule && (
        <Dialog open={!!editingRule} onOpenChange={() => setEditingRule(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Rule: {editingRule.rule_id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    value={editingRule.category}
                    onChange={(e) => setEditingRule({...editingRule, category: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-subcategory">Subcategory</Label>
                  <Input
                    id="edit-subcategory"
                    value={editingRule.subcategory}
                    onChange={(e) => setEditingRule({...editingRule, subcategory: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-authority">Authority Level</Label>
                  <Select value={editingRule.authority_level} onValueChange={(value) => setEditingRule({...editingRule, authority_level: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STATUTE">Statute</SelectItem>
                      <SelectItem value="REG">Regulation</SelectItem>
                      <SelectItem value="ADVISORY">Advisory</SelectItem>
                      <SelectItem value="CASE">Case Law</SelectItem>
                      <SelectItem value="AGENCY">Agency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-confidence">Confidence Level</Label>
                  <Select value={editingRule.confidence} onValueChange={(value) => setEditingRule({...editingRule, confidence: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-text">Rule Text</Label>
                <Textarea
                  id="edit-text"
                  value={editingRule.text}
                  onChange={(e) => setEditingRule({...editingRule, text: e.target.value})}
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingRule(null)}>
                  Cancel
                </Button>
                <Button onClick={() => handleUpdateRule(editingRule)}>
                  Update Rule
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EnhancedStateRuleManager;