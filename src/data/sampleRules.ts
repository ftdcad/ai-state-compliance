import { StateRule, ComplianceAlert, AITemplate } from '../types/admin';
import { kentuckyRules, kentuckyAlerts, kentuckyTemplates } from './kentuckyRules';
import { floridaRules, floridaAlerts, floridaTemplates } from './floridaRules';

export const sampleRules: StateRule[] = [
  ...kentuckyRules,
  ...floridaRules,
  {
    id: 'ak-001',
    state: 'AK',
    rule_id: 'AK-PUBADJ-LIC-001',
    version: '1.0',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Public Adjuster',
    subcategory: 'Licensing',
    text: 'Public adjusters must be licensed by the Alaska Division of Insurance before conducting business in the state.',
    sources: ['Alaska Statute 21.27.010', 'Alaska Administrative Code 3 AAC 26.010'],
    tests: [
      {
        id: 'test-001',
        description: 'Verify public adjuster has valid Alaska license',
        expected_result: 'License number and expiration date verified in state database',
        test_type: 'VALIDATION'
      }
    ],
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'ak-002',
    state: 'AK',
    rule_id: 'AK-PUBADJ-FEES-002',
    version: '1.0',
    authority_level: 'REG',
    confidence: 'HIGH',
    category: 'Public Adjuster',
    subcategory: 'Fees',
    text: 'Public adjusters may not charge fees exceeding 10% of the settlement amount for claims under $100,000.',
    sources: ['3 AAC 26.020'],
    tests: [
      {
        id: 'test-002',
        description: 'Verify fee percentage complies with state limits',
        expected_result: 'Fee percentage does not exceed 10% for claims under $100,000',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'tx-001',
    state: 'TX',
    rule_id: 'TX-PUBADJ-BOND-001',
    version: '1.0',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Public Adjuster',
    subcategory: 'Bonding',
    text: 'Public adjusters must maintain a surety bond of $50,000 for each licensed location.',
    sources: ['Texas Insurance Code 4102.153'],
    tests: [
      {
        id: 'test-004',
        description: 'Verify active surety bond amount and coverage',
        expected_result: 'Active bond of $50,000 per licensed location',
        test_type: 'VALIDATION'
      }
    ],
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  }
];

export const sampleAlerts: ComplianceAlert[] = [
  ...kentuckyAlerts,
  ...floridaAlerts,
  {
    id: 'alert-001',
    state: 'TX',
    type: 'Bond Expiration',
    message: 'Surety bonds for 15 public adjusters expiring within 30 days',
    priority: 'High',
    date: '2024-01-19T14:30:00Z',
    resolved: false,
    action_required: true,
    deadline: '2024-02-15T23:59:59Z'
  },
  {
    id: 'alert-002',
    state: 'AK',
    type: 'Sunset Warning',
    message: 'Emergency fee waiver provision expires March 31, 2024',
    priority: 'Medium',
    date: '2024-01-18T11:15:00Z',
    resolved: false,
    rule_id: 'AK-PUBADJ-FEES-002',
    source: 'Alaska Emergency Regulation 2023-TEMP-05'
  },
  {
    id: 'alert-003',
    state: 'CA',
    type: 'New Regulation',
    message: 'New digital disclosure requirements for public adjuster contracts',
    priority: 'Medium',
    date: '2024-01-17T16:45:00Z',
    resolved: true,
    source: 'California Code of Regulations Title 10, Section 2695.8'
  }
];

export const sampleTemplates: AITemplate[] = [
  ...kentuckyTemplates,
  ...floridaTemplates,
  {
    id: 'template-001',
    name: 'License Verification Check',
    category: 'Reality Check',
    template: 'Before proceeding with {{adjuster_name}}, please verify their license status in {{state}}. License #{{license_number}} should be active and in good standing. Check expiration date: {{expiration_date}}.',
    variables: ['adjuster_name', 'state', 'license_number', 'expiration_date'],
    confidence: 'HIGH',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'template-002',
    name: 'Fee Compliance Warning',
    category: 'Hard Facts',
    template: 'COMPLIANCE ALERT: In {{state}}, public adjuster fees are limited to {{max_percentage}}% of settlement amounts under ${{threshold}}. Current proposed fee of {{proposed_fee}}% may violate state regulations.',
    variables: ['state', 'max_percentage', 'threshold', 'proposed_fee'],
    confidence: 'HIGH',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'template-003',
    name: 'Solicitation Timing Alert',
    category: 'Enforcement Gap Warning',
    template: 'WARNING: {{state}} prohibits public adjuster solicitation within {{restriction_hours}} hours of a catastrophic event. Event occurred on {{event_date}}. Earliest permissible contact: {{earliest_contact_date}}.',
    variables: ['state', 'restriction_hours', 'event_date', 'earliest_contact_date'],
    confidence: 'HIGH',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'template-004',
    name: 'Bond Expiration Notice',
    category: 'Timeframe Compliance',
    template: 'URGENT: Public adjuster bond for {{adjuster_name}} expires on {{expiration_date}}. {{state}} requires active bonding for continued operations. Renewal must be completed by {{deadline_date}} to avoid license suspension.',
    variables: ['adjuster_name', 'expiration_date', 'state', 'deadline_date'],
    confidence: 'HIGH',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  }
];