// Enhanced admin types that merge both systems

import { StateRule as BaseStateRule } from './admin';

// SILOS from compliance-legal-2
export const SILOS = {
  PA: {
    name: 'Public Adjusters',
    icon: '🏛️',
    description: 'Regulations for public adjusters including licensing, fees, and conduct'
  },
  CONTRACTOR: {
    name: 'Contractors',
    icon: '🏗️',
    description: 'Construction and contractor laws, licensing, and requirements'
  },
  CARRIER: {
    name: 'Insurance Carriers',
    icon: '🏢',
    description: 'Insurance carrier obligations, claims handling, and compliance'
  },
  LEGAL: {
    name: 'Legal Framework',
    icon: '⚖️',
    description: 'Legal resources, attorney requirements, and court procedures'
  }
} as const;

export type SiloType = keyof typeof SILOS;

// Enhanced StateRule that combines both systems
export interface EnhancedStateRule extends BaseStateRule {
  // From database.ts (compliance-legal-2)
  bucket: SiloType[];
  status: 'active' | 'beta' | 'prohibited' | 'restricted';
  visibility: 'internal' | 'beta' | 'public';
  leverage_points: string[];
  useful_links: string[];
  is_active: boolean;

  // Keep original fields from admin.ts
  rule_text?: string; // Make optional since base has 'text'
}

// US States list
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
  { code: 'DC', name: 'Washington DC' }
] as const;

// Re-export original types
export * from './admin';