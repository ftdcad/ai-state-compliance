
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { EnhancedStateRule as StateRule, SILOS, US_STATES } from '../../types/enhanced-admin';
import { Edit, Trash2, Search, Filter } from 'lucide-react';

interface RulesListProps {
  rules: StateRule[];
  onEdit: (rule: StateRule) => void;
  onDelete: (ruleId: string) => void;
}

export function RulesList({ rules, onEdit, onDelete }: RulesListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBucket, setFilterBucket] = useState('all');

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.rule_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rule.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesState = filterState === 'all' || rule.state === filterState;
    const matchesStatus = filterStatus === 'all' || rule.status === filterStatus;
    const matchesBucket = filterBucket === 'all' || rule.bucket.includes(filterBucket);

    return matchesSearch && matchesState && matchesStatus && matchesBucket;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'prohibited': return 'bg-red-100 text-red-800';
      case 'restricted': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStateName = (code: string) => {
    return US_STATES.find(state => state.code === code)?.name || code;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Manage Rules ({filteredRules.length} of {rules.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search rules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterState} onValueChange={setFilterState}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {US_STATES.map(state => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="beta">Beta</SelectItem>
              <SelectItem value="prohibited">Prohibited</SelectItem>
              <SelectItem value="restricted">Restricted</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterBucket} onValueChange={setFilterBucket}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.entries(SILOS).map(([key, silo]) => (
                <SelectItem key={key} value={key}>
                  {silo.icon} {silo.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rules Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>State</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Buckets</TableHead>
                <TableHead>Rule Text</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{rule.state}</div>
                      <div className="text-sm text-muted-foreground">
                        {getStateName(rule.state)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{rule.category}</div>
                      {rule.subcategory && (
                        <div className="text-sm text-muted-foreground">
                          {rule.subcategory}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(rule.status)}>
                      {rule.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {rule.bucket.map(bucket => {
                        const silo = SILOS[bucket as keyof typeof SILOS];
                        return (
                          <Badge key={bucket} variant="outline" className="text-xs">
                            {silo?.icon} {bucket}
                          </Badge>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="text-sm text-muted-foreground truncate">
                      {rule.rule_text.length > 100 
                        ? `${rule.rule_text.substring(0, 100)}...`
                        : rule.rule_text
                      }
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(rule)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this rule?')) {
                            onDelete(rule.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {rules.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg font-medium text-muted-foreground mb-2">No rules in database</p>
            <p className="text-sm text-muted-foreground">Click "Add Rule" to create your first compliance rule.</p>
          </div>
        ) : filteredRules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No rules found matching your filters.
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
