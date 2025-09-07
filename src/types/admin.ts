export interface StateRule {
  id: string;
  state: string;
  rule_id: string;
  version: string;
  authority_level: 'STATUTE' | 'REG' | 'ADVISORY' | 'CASE' | 'AGENCY';
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  sunset?: string;
  category: string;
  subcategory: string;
  text: string;
  sources: string[];
  tests: RuleTest[];
  created_at: string;
  updated_at: string;
}

export interface RuleTest {
  id: string;
  description: string;
  expected_result: string;
  test_type: 'VALIDATION' | 'COMPLIANCE' | 'ENFORCEMENT';
}

export interface ComplianceAlert {
  id: string;
  state: string;
  type: 'Rule Change' | 'Sunset Warning' | 'Bond Expiration' | 'New Regulation' | 'Court Decision';
  message: string;
  priority: 'High' | 'Medium' | 'Low';
  date: string;
  resolved: boolean;
  rule_id?: string;
  source?: string;
  action_required?: boolean;
  deadline?: string;
}

export interface AITemplate {
  id: string;
  name: string;
  category: 'Reality Check' | 'Hard Facts' | 'Enforcement Gap Warning' | 'Timeframe Compliance';
  template: string;
  variables: string[];
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  created_at: string;
  updated_at: string;
}

export interface SystemMetrics {
  total_rules: number;
  rules_by_confidence: Record<string, number>;
  expiring_rules: number;
  active_alerts: number;
  states_covered: number;
  last_updated: string;
}

export interface AdminUser {
  authenticated: boolean;
  role: 'ADMIN' | 'REVIEWER' | 'VIEWER';
  session_start: string;
}

// New interfaces for the enhanced state system
export interface StateKnowledgeSilo {
  paLaws: number;          // 🏛️ Public Adjusting Laws & Rules
  construction: number;    // 🏗️ Construction/Contractor Laws  
  insurance: number;       // 🏢 Insurance Carrier Obligations
  legal: number;          // ⚖️ Legal/Attorney Resources
}

export interface StateInfo {
  code: string;
  name: string;
  type: 'state' | 'territory';
  status: 'active' | 'restricted' | 'prohibited' | 'beta' | 'coming-soon';
  statusLabel: string;
  knowledgeSilos: StateKnowledgeSilo;
  totalRules: number;
  description: string;
  specialMessage?: string;
  alerts: number;
  lastUpdated: string;
}