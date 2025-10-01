import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { EnhancedStateRule as StateRule, SILOS, US_STATES } from '../../types/enhanced-admin';
import { Save, X, Plus, Trash2 } from 'lucide-react';

interface RuleFormProps {
  rule?: StateRule | null;
  onSave: (rule: StateRule) => void;
  onCancel: () => void;
}

interface SourceEntry {
  name: string;
  url: string;
}

interface LeveragePointEntry {
  name: string;
  url: string;
}

interface UsefulLinkEntry {
  name: string;
  url: string;
}

export function RuleForm({ rule, onSave, onCancel }: RuleFormProps) {
  const [formData, setFormData] = useState<Partial<StateRule>>({
    id: '',
    rule_id: '',
    state: '',
    bucket: [],
    status: 'beta',
    visibility: 'internal',
    category: '',
    subcategory: '',
    rule_text: '',
    leverage_points: [''],
    sources: [''],
    useful_links: [''],
    version: '1.0',
    confidence: 'MEDIUM',
    last_updated: new Date().toISOString(),
    is_active: true
  });

  const [sourceEntries, setSourceEntries] = useState<SourceEntry[]>([
    { name: '', url: '' }
  ]);

  const [leveragePointEntries, setLeveragePointEntries] = useState<LeveragePointEntry[]>([
    { name: '', url: '' }
  ]);

  const [usefulLinkEntries, setUsefulLinkEntries] = useState<UsefulLinkEntry[]>([
    { name: '', url: '' }
  ]);

  useEffect(() => {
    if (rule) {
      setFormData(rule);
      // Convert legacy sources array to new format if needed
      if (rule.sources && rule.sources.length > 0) {
        const entries = rule.sources.map(source => {
          // Try to parse if it's in "name | url" format, otherwise treat as name only
          const parts = source.split(' | ');
          return {
            name: parts[0] || '',
            url: parts[1] || ''
          };
        });
        setSourceEntries(entries);
      }
      // Convert legacy leverage_points array to new format if needed
      if (rule.leverage_points && rule.leverage_points.length > 0) {
        const entries = rule.leverage_points.map(point => {
          // Try to parse if it's in "name | url" format, otherwise treat as name only
          const parts = point.split(' | ');
          return {
            name: parts[0] || '',
            url: parts[1] || ''
          };
        });
        setLeveragePointEntries(entries);
      }
      // Convert useful_links array to new format if needed
      if (rule.useful_links && rule.useful_links.length > 0) {
        const entries = rule.useful_links.map(link => {
          // Try to parse if it's in "name | url" format, otherwise treat as name only
          const parts = link.split(' | ');
          return {
            name: parts[0] || '',
            url: parts[1] || ''
          };
        });
        setUsefulLinkEntries(entries);
      }
    }
  }, [rule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert source entries back to legacy format for compatibility
    const sources = sourceEntries.map(entry => {
      if (entry.url) {
        return `${entry.name} | ${entry.url}`;
      }
      return entry.name;
    }).filter(source => source.trim() !== '');

    // Convert leverage point entries back to legacy format for compatibility
    const leverage_points = leveragePointEntries.map(entry => {
      if (entry.url) {
        return `${entry.name} | ${entry.url}`;
      }
      return entry.name;
    }).filter(point => point.trim() !== '');

    // Convert useful link entries back to legacy format for compatibility
    const useful_links = usefulLinkEntries.map(entry => {
      if (entry.url) {
        return `${entry.name} | ${entry.url}`;
      }
      return entry.name;
    }).filter(link => link.trim() !== '');

    // Generate ID if new rule
    const finalData = {
      ...formData,
      sources,
      leverage_points,
      useful_links,
      id: formData.id || `${formData.state}-${formData.bucket?.[0]}-${Date.now()}`,
      rule_id: formData.rule_id || `${formData.state}-${formData.category?.replace(/\s+/g, '-').toUpperCase()}`,
      last_updated: new Date().toISOString(),
    } as StateRule;

    onSave(finalData);
  };

  const addLeveragePoint = () => {
    setLeveragePointEntries(prev => [...prev, { name: '', url: '' }]);
  };

  const removeLeveragePoint = (index: number) => {
    setLeveragePointEntries(prev => prev.filter((_, i) => i !== index));
  };

  const updateLeveragePointName = (index: number, name: string) => {
    setLeveragePointEntries(prev => prev.map((entry, i) => 
      i === index ? { ...entry, name } : entry
    ));
  };

  const updateLeveragePointUrl = (index: number, url: string) => {
    setLeveragePointEntries(prev => prev.map((entry, i) => 
      i === index ? { ...entry, url } : entry
    ));
  };

  const addUsefulLink = () => {
    setUsefulLinkEntries(prev => [...prev, { name: '', url: '' }]);
  };

  const removeUsefulLink = (index: number) => {
    setUsefulLinkEntries(prev => prev.filter((_, i) => i !== index));
  };

  const updateUsefulLinkName = (index: number, name: string) => {
    setUsefulLinkEntries(prev => prev.map((entry, i) => 
      i === index ? { ...entry, name } : entry
    ));
  };

  const updateUsefulLinkUrl = (index: number, url: string) => {
    setUsefulLinkEntries(prev => prev.map((entry, i) => 
      i === index ? { ...entry, url } : entry
    ));
  };

  const addSource = () => {
    setSourceEntries(prev => [...prev, { name: '', url: '' }]);
  };

  const removeSource = (index: number) => {
    setSourceEntries(prev => prev.filter((_, i) => i !== index));
  };

  const updateSourceName = (index: number, name: string) => {
    setSourceEntries(prev => prev.map((entry, i) => 
      i === index ? { ...entry, name } : entry
    ));
  };

  const updateSourceUrl = (index: number, url: string) => {
    setSourceEntries(prev => prev.map((entry, i) => 
      i === index ? { ...entry, url } : entry
    ));
  };

  const handleBucketChange = (bucket: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      bucket: checked 
        ? [...(prev.bucket || []), bucket]
        : (prev.bucket || []).filter(b => b !== bucket)
    }));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="w-5 h-5" />
          {rule ? 'Edit Rule' : 'Add New Rule'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="state">State</Label>
              <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map(state => (
                    <SelectItem key={state.code} value={state.code}>
                      {state.name} ({state.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="beta">Beta</SelectItem>
                  <SelectItem value="prohibited">Prohibited</SelectItem>
                  <SelectItem value="restricted">Restricted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Categories (Buckets) */}
          <div>
            <Label>Categories</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {Object.entries(SILOS).map(([key, silo]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={formData.bucket?.includes(key) || false}
                    onCheckedChange={(checked) => handleBucketChange(key, checked as boolean)}
                  />
                  <Label htmlFor={key} className="text-sm">
                    {silo.icon} {silo.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Rule Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="e.g., License Requirements"
              />
            </div>

            <div>
              <Label htmlFor="subcategory">Subcategory (Optional)</Label>
              <Input
                id="subcategory"
                value={formData.subcategory}
                onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                placeholder="e.g., Initial Licensing"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="rule_text">Rule Text</Label>
            <Textarea
              id="rule_text"
              value={formData.rule_text}
              onChange={(e) => setFormData(prev => ({ ...prev, rule_text: e.target.value }))}
              placeholder="Enter the full text of the law or regulation..."
              rows={4}
            />
          </div>

          {/* Leverage Points */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Leverage Points</Label>
              <Button type="button" variant="outline" size="sm" onClick={addLeveragePoint}>
                <Plus className="w-4 h-4 mr-1" />
                Add Point
              </Button>
            </div>
            <div className="space-y-3">
              {leveragePointEntries.map((entry, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label className="text-sm text-muted-foreground">Leverage Point</Label>
                      <Input
                        value={entry.name}
                        onChange={(e) => updateLeveragePointName(index, e.target.value)}
                        placeholder="e.g., 15 working day acknowledgment deadline is enforceable"
                      />
                    </div>
                    {leveragePointEntries.length > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeLeveragePoint(index)}
                        className="mt-6"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Reference URL (Optional)</Label>
                    <Input
                      value={entry.url}
                      onChange={(e) => updateLeveragePointUrl(index, e.target.value)}
                      placeholder="https://www.aldoi.gov/specific-regulation"
                      type="url"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Useful Links</Label>
              <Button type="button" variant="outline" size="sm" onClick={addUsefulLink}>
                <Plus className="w-4 h-4 mr-1" />
                Add Link
              </Button>
            </div>
            <div className="space-y-3">
              {usefulLinkEntries.map((entry, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label className="text-sm text-muted-foreground">Organization/Link Name</Label>
                      <Input
                        value={entry.name}
                        onChange={(e) => updateUsefulLinkName(index, e.target.value)}
                        placeholder="e.g., FAPIA - Florida Association of Public Insurance Adjusters"
                      />
                    </div>
                    {usefulLinkEntries.length > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeUsefulLink(index)}
                        className="mt-6"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Website URL</Label>
                    <Input
                      value={entry.url}
                      onChange={(e) => updateUsefulLinkUrl(index, e.target.value)}
                      placeholder="https://www.fapia.org"
                      type="url"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sources */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Sources</Label>
              <Button type="button" variant="outline" size="sm" onClick={addSource}>
                <Plus className="w-4 h-4 mr-1" />
                Add Source
              </Button>
            </div>
            <div className="space-y-3">
              {sourceEntries.map((entry, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label className="text-sm text-muted-foreground">Source Name</Label>
                      <Input
                        value={entry.name}
                        onChange={(e) => updateSourceName(index, e.target.value)}
                        placeholder="e.g., Alabama Department of Insurance"
                      />
                    </div>
                    {sourceEntries.length > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeSource(index)}
                        className="mt-6"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Website URL (Optional)</Label>
                    <Input
                      value={entry.url}
                      onChange={(e) => updateSourceUrl(index, e.target.value)}
                      placeholder="https://www.aldoi.gov"
                      type="url"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="confidence">Confidence Level</Label>
              <Select value={formData.confidence} onValueChange={(value: any) => setFormData(prev => ({ ...prev, confidence: value }))}>
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

            <div>
              <Label htmlFor="visibility">Visibility</Label>
              <Select value={formData.visibility} onValueChange={(value: any) => setFormData(prev => ({ ...prev, visibility: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="shareable">Shareable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                placeholder="1.0"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              {rule ? 'Update Rule' : 'Save Rule'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
