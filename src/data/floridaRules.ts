import { StateRule, ComplianceAlert, AITemplate } from '../types/admin';

export const floridaRules: StateRule[] = [
  {
    id: 'fl-001',
    state: 'FL',
    rule_id: 'FL-PUBADJ-LIC-001',
    version: '0.9',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Public Adjuster',
    subcategory: 'Licensing',
    text: 'Public adjusters must hold a license under § 626.865. A $50,000 surety bond is required at application and must remain in force for the life of the license and 1 year after termination.',
    sources: ['626.865 Fla. Stat.'],
    tests: [
      {
        id: 'test-fl-001-1',
        description: 'Unlicensed adjuster should fail compliance',
        expected_result: 'FAIL',
        test_type: 'VALIDATION'
      },
      {
        id: 'test-fl-001-2',
        description: 'Insufficient bond amount should fail',
        expected_result: 'FAIL',
        test_type: 'VALIDATION'
      },
      {
        id: 'test-fl-001-3',
        description: 'Licensed adjuster with proper bond should pass',
        expected_result: 'PASS',
        test_type: 'VALIDATION'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-002',
    state: 'FL',
    rule_id: 'FL-PUBADJ-FEES-002',
    version: '0.9',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Public Adjuster',
    subcategory: 'Fees',
    text: '• Claims from events under a Governor‑declared state of emergency—fee ≤ 10% of amounts paid, for one year after the event. • All other claims—fee ≤ 20%. • Reopened or supplemental claims—cap remains 20%. Compensation may not be based on deductibles. § 626.854(11)(b).',
    sources: ['626.854 Fla. Stat.'],
    tests: [
      {
        id: 'test-fl-002-1',
        description: 'Excessive emergency event fee should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-fl-002-2',
        description: 'Compliant non-emergency fee should pass',
        expected_result: 'PASS',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-fl-002-3',
        description: 'Excessive reopened claim fee should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-003',
    state: 'FL',
    rule_id: 'FL-PUBADJ-CONTRACT-003',
    version: '0.9',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Public Adjuster',
    subcategory: 'Contracts',
    text: '• Insured may cancel the PA contract without penalty within 10 calendar days of execution (30 days after loss if the claim stems from a declared emergency). § 626.854(7). • No solicitation Sun / after 8 p.m. (§ 626.854(5)). • No face‑to‑face or phone solicitation until 48 hours after the event unless the insured initiates contact (§ 626.854(6)). • Contract must be on DFS‑approved form and contain the statutory 18‑pt cancellation notice.',
    sources: ['626.854 (5)‑(7) Fla. Stat.'],
    tests: [
      {
        id: 'test-fl-003-1',
        description: 'Timely cancellation allows full refund',
        expected_result: 'FULL_REFUND',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-fl-003-2',
        description: 'Evening solicitation should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-fl-003-3',
        description: 'Solicitation after 48-hour restriction should pass',
        expected_result: 'PASS',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-004',
    state: 'FL',
    rule_id: 'FL-CARRIER-PAY-004',
    version: '0.9',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Insurance Carrier',
    subcategory: 'Payment Obligations',
    text: 'Within 90 days of receiving notice of an initial, reopened, or supplemental property claim, the insurer must pay or deny all or part of it, unless factors beyond the insurer\'s control reasonably prevent payment. Late payments bear statutory interest from the notice date. § 627.70131(7)(a).',
    sources: ['627.70131 (7)(a) Fla. Stat.'],
    tests: [
      {
        id: 'test-fl-004-1',
        description: 'Late payment without exception should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-fl-004-2',
        description: 'Timely payment should pass',
        expected_result: 'PASS',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-005',
    state: 'FL',
    rule_id: 'FL-CARRIER-ACK-005',
    version: '0.9',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Insurance Carrier',
    subcategory: 'Communication',
    text: '• Insurer must acknowledge claim communications in 7 days. • Physical inspection, if required, must occur within 30 days of proof‑of‑loss. § 627.70131(1) & (3)(b).',
    sources: ['627.70131 Fla. Stat.'],
    tests: [
      {
        id: 'test-fl-005-1',
        description: 'Late acknowledgment should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-fl-005-2',
        description: 'Timely inspection should pass',
        expected_result: 'PASS',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-006',
    state: 'FL',
    rule_id: 'FL-LAW-FEES-006',
    version: '0.9',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Legal Framework',
    subcategory: 'Attorney Fees',
    text: 'SB 2‑A (Dec 2022) repealed the one‑way attorney‑fee statutes (§§ 627.428, 626.9373, 627.70152) for residential and commercial property suits. Property policyholders now bear their own fees unless another statute or the policy shifts them.',
    sources: ['SB 2‑A bill summary'],
    tests: [
      {
        id: 'test-fl-006-1',
        description: 'One-way attorney fee claims should be denied',
        expected_result: 'DENY',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-007',
    state: 'FL',
    rule_id: 'FL-PROP-NOTICE-007',
    version: '0.9',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Property Claims',
    subcategory: 'Notice Requirements',
    text: 'A property claim is barred unless notice is given within 1 year of the date of loss; supplemental claims within 18 months. § 627.70132(2).',
    sources: ['627.70132 (2) Fla. Stat.'],
    tests: [
      {
        id: 'test-fl-007-1',
        description: 'Late notice should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-fl-007-2',
        description: 'Timely notice should pass',
        expected_result: 'PASS',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-008',
    state: 'FL',
    rule_id: 'FL-PROP-ROOF-008',
    version: '0.9',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Property Claims',
    subcategory: 'Roof Requirements',
    sunset: '2028-05-26T23:59:59Z',
    text: 'SB 4‑D (2022) amended FBC § 706.1.1: when ≥ 25% of a roof section is repaired, only that section must meet current code if the roof was built or replaced to the 2007 FBC (3‑1‑2009) or later. Full replacement is no longer automatic.',
    sources: ['SB 4‑D summary'],
    tests: [
      {
        id: 'test-fl-008-1',
        description: 'Recent roof allows section-only replacement',
        expected_result: 'SECTION_ONLY',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-fl-008-2',
        description: 'Older roof requires full replacement',
        expected_result: 'FULL_REPLACE',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-009',
    state: 'FL',
    rule_id: 'FL-PUBADJ-SOLICIT-009',
    version: '0.9',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Public Adjuster',
    subcategory: 'Solicitation',
    text: 'No PA solicitation on Sundays. Mon‑Sat only, between 8 a.m.–8 p.m. (§ 626.854(5)).',
    sources: ['626.854 (5) Fla. Stat.'],
    tests: [
      {
        id: 'test-fl-009-1',
        description: 'Sunday solicitation should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-fl-009-2',
        description: 'Permitted hour solicitation should pass',
        expected_result: 'PASS',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-010',
    state: 'FL',
    rule_id: 'FL-RES-DFS-010',
    version: '0.9',
    authority_level: 'AGENCY',
    confidence: 'HIGH',
    category: 'Professional Resources',
    subcategory: 'Contact Information',
    text: 'Florida Department of Financial Services – Division of Insurance Agent & Agency Services\n200 E. Gaines St., Tallahassee FL 32399\nLicensing: (850) 413‑3137 | Consumer Helpline: (877) 693‑5236',
    sources: ['DFS website contact page'],
    tests: [],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  }
];

export const floridaAlerts: ComplianceAlert[] = [
  {
    id: 'fl-alert-001',
    state: 'FL',
    type: 'Sunset Warning',
    message: '25% roof rule amendment expires May 2028 - monitor for potential changes',
    priority: 'Medium',
    date: '2025-06-12T08:30:00Z',
    resolved: false,
    rule_id: 'FL-PROP-ROOF-008',
    source: 'SB 4-D sunset provision tracking',
    action_required: true,
    deadline: '2028-05-26T23:59:59Z'
  },
  {
    id: 'fl-alert-002',
    state: 'FL',
    type: 'Rule Change',
    message: 'One-way attorney fee repeal significantly impacts litigation strategy',
    priority: 'High',
    date: '2025-06-10T13:15:00Z',
    resolved: false,
    rule_id: 'FL-LAW-FEES-006',
    source: 'SB 2-A implementation analysis',
    action_required: true,
    deadline: '2025-07-01T23:59:59Z'
  },
  {
    id: 'fl-alert-003',
    state: 'FL',
    type: 'New Regulation',
    message: 'Enhanced solicitation restrictions now being strictly enforced post-hurricane season',
    priority: 'High',
    date: '2025-06-08T16:45:00Z',
    resolved: false,
    rule_id: 'FL-PUBADJ-SOLICIT-009',
    source: 'DFS Enforcement Bulletin 2025-02'
  },
  {
    id: 'fl-alert-004',
    state: 'FL',
    type: 'Court Decision',
    message: 'Recent appellate decision clarifies 90-day prompt pay exceptions',
    priority: 'Medium',
    date: '2025-06-05T11:20:00Z',
    resolved: false,
    rule_id: 'FL-CARRIER-PAY-004',
    source: 'Florida 3rd DCA Case No. 3D24-1856'
  }
];

export const floridaTemplates: AITemplate[] = [
  {
    id: 'fl-template-001',
    name: 'Florida Emergency Event Fee Check',
    category: 'Hard Facts',
    template: 'FLORIDA EMERGENCY FEE ALERT: This claim {{emergency_status}} under a Governor-declared state of emergency. Fee limit is {{fee_limit}}% for {{event_duration}}. Current proposed fee of {{proposed_fee}}% {{compliance_status}}.',
    variables: ['emergency_status', 'fee_limit', 'event_duration', 'proposed_fee', 'compliance_status'],
    confidence: 'HIGH',
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-template-002',
    name: 'Florida Solicitation Timing Warning',
    category: 'Enforcement Gap Warning',
    template: 'FLORIDA SOLICITATION VIOLATION: {{violation_type}} detected. Florida prohibits solicitation {{restriction_details}}. Event occurred {{event_time}}. Earliest permissible contact: {{earliest_contact}}.',
    variables: ['violation_type', 'restriction_details', 'event_time', 'earliest_contact'],
    confidence: 'HIGH',
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-template-003',
    name: 'Florida 90-Day Prompt Pay Alert',
    category: 'Timeframe Compliance',
    template: 'Florida 90-day prompt pay deadline approaching. {{days_elapsed}} days have elapsed since notice. Insurer must pay or deny by {{deadline_date}} unless exceptional circumstances exist under 627.70131(7)(a).',
    variables: ['days_elapsed', 'deadline_date'],
    confidence: 'HIGH',
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-template-004',
    name: 'Florida Attorney Fee Repeal Notice',
    category: 'Hard Facts',
    template: 'CRITICAL CHANGE: SB 2-A repealed one-way attorney fees for property claims filed after December 2022. Policyholders now bear their own attorney costs unless {{exception_conditions}}. Consider alternative fee arrangements.',
    variables: ['exception_conditions'],
    confidence: 'HIGH',
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'fl-template-005',
    name: 'Florida Roof Replacement Rule',
    category: 'Reality Check',
    template: 'Florida 25% roof rule analysis: {{damage_percentage}}% of roof section damaged. Roof {{construction_date}}. Under SB 4-D, {{replacement_requirement}}. Verify local building code requirements with AHJ.',
    variables: ['damage_percentage', 'construction_date', 'replacement_requirement'],
    confidence: 'HIGH',
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  }
];