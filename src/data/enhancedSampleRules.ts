import { EnhancedStateRule } from '../types/enhanced-admin';

export const enhancedSampleRules: EnhancedStateRule[] = [
  {
    id: 'fl-enhanced-001',
    rule_id: 'FL-PA-001',
    state: 'FL',
    bucket: ['PA'],
    status: 'active',
    visibility: 'internal',
    category: 'Public Adjuster',
    subcategory: 'Licensing',
    rule_text: 'Public adjusters must hold a license under § 626.865. A $50,000 surety bond is required at application and must remain in force for the life of the license and 1 year after termination.',
    leverage_points: [
      'License requirement is mandatory - no exceptions',
      'Bond must remain active 1 year after license termination'
    ],
    sources: ['Florida Statute 626.865', 'Florida Department of Insurance'],
    useful_links: [
      'https://www.floir.com/sections/licensing',
      'https://www.fapia.org'
    ],
    version: '1.0',
    confidence: 'HIGH',
    last_updated: new Date().toISOString(),
    is_active: true
  },
  {
    id: 'fl-enhanced-002',
    rule_id: 'FL-CONTRACTOR-001',
    state: 'FL',
    bucket: ['CONTRACTOR'],
    status: 'beta',
    visibility: 'internal',
    category: 'Contractor Requirements',
    subcategory: 'License & Insurance',
    rule_text: 'Contractors must maintain general liability insurance with minimum coverage of $1,000,000 per occurrence and workers compensation coverage as required by state law.',
    leverage_points: [
      'Insurance verification required before permit issuance',
      'Coverage must be maintained throughout project duration'
    ],
    sources: ['Florida Building Code', 'Florida DBPR'],
    useful_links: [
      'https://www.myfloridalicense.com/dbpr/pro/cilb/',
      'https://floridabuilding.org'
    ],
    version: '1.0',
    confidence: 'MEDIUM',
    last_updated: new Date().toISOString(),
    is_active: true
  },
  {
    id: 'ky-enhanced-001',
    rule_id: 'KY-PA-001',
    state: 'KY',
    bucket: ['PA', 'LEGAL'],
    status: 'active',
    visibility: 'shareable',
    category: 'Public Adjuster',
    subcategory: 'Prohibited Activities',
    rule_text: 'Public adjusters are prohibited from soliciting business between the hours of 6:00 p.m. and 8:00 a.m. and within 24 hours of a catastrophic event.',
    leverage_points: [
      '24-hour waiting period after catastrophe is strictly enforced',
      'Violations can result in license suspension'
    ],
    sources: ['Kentucky Insurance Code', 'KY DOI Regulations'],
    useful_links: [
      'https://insurance.ky.gov',
      'https://kypaa.org'
    ],
    version: '2.0',
    confidence: 'HIGH',
    last_updated: new Date().toISOString(),
    is_active: true
  },
  {
    id: 'al-enhanced-001',
    rule_id: 'AL-CARRIER-001',
    state: 'AL',
    bucket: ['CARRIER'],
    status: 'restricted',
    visibility: 'internal',
    category: 'Insurance Carrier',
    subcategory: 'Claims Processing',
    rule_text: 'Insurance carriers must acknowledge receipt of a claim within 15 working days and provide claim determination within 30 days of receiving all required documentation.',
    leverage_points: [
      '15 working day acknowledgment deadline is enforceable',
      '30 day determination period starts only after complete documentation'
    ],
    sources: ['Alabama Insurance Code', 'AL DOI Bulletin 2023-01'],
    useful_links: [
      'https://www.aldoi.gov',
      'https://www.iii.org/alabama'
    ],
    version: '1.1',
    confidence: 'HIGH',
    last_updated: new Date().toISOString(),
    is_active: true
  }
];