export interface StateRule {
  id: string;
  rule_id: string;
  state: string;
  bucket: string[]; // ['PA', 'CONSTRUCTION', 'INSURANCE', 'LEGAL']
  status: 'active' | 'prohibited' | 'beta' | 'restricted';
  visibility: 'internal' | 'shareable';
  category: string;
  subcategory?: string;
  rule_text: string;
  leverage_points: string[];
  sources: string[];
  useful_links: string[];
  version: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  last_updated: string;
  is_active: boolean;
}

export interface ConversationHistory {
  id: string;
  state: string;
  silo: string;
  user_message: string;
  ai_response: string;
  created_at: string;
}

export interface StateInfo {
  code: string;
  name: string;
  public_adjusting_allowed: boolean;
  status: 'active' | 'restricted' | 'prohibited' | 'beta' | 'coming-soon';
  rule_count: {
    PA: number;
    CONSTRUCTION: number;
    INSURANCE: number;
    LEGAL: number;
  };
  useful_links: string[];
  manual_status?: 'active' | 'restricted' | 'prohibited' | 'beta' | 'coming-soon'; // For admin overrides
}

export const SILOS = {
  PA: {
    name: 'Public Adjusting Laws & Rules',
    icon: '🏛️',
    description: 'License requirements, regulations, and compliance for public adjusters',
    color: 'blue'
  },
  CONSTRUCTION: {
    name: 'Construction/Contractor Laws',
    icon: '🏗️', 
    description: 'Building codes, contractor regulations, and construction-related leverage opportunities',
    color: 'green'
  },
  INSURANCE: {
    name: 'Insurance Carrier Obligations',
    icon: '🏢',
    description: 'Insurer response requirements, breach detection, and compliance violations',
    color: 'orange'
  },
  LEGAL: {
    name: 'Legal/Attorney Resources',
    icon: '⚖️',
    description: 'Fee shifting laws, bad faith regulations, and legal remedies',
    color: 'purple'
  }
} as const;

export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'VI', name: 'US Virgin Islands' }
];
