import { StateRule, ComplianceAlert, AITemplate } from '../types/admin';

export const kentuckyRules: StateRule[] = [
  {
    id: 'ky-001',
    state: 'KY',
    rule_id: 'KY-PUBADJ-LIC-001',
    version: '1.0',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Public Adjuster',
    subcategory: 'Licensing',
    text: 'A person may not act as a public adjuster in Kentucky without a license issued under KRS 304.9‑430. Each licensee shall maintain a $50,000 surety bond or irrevocable letter of credit for the life of the license.',
    sources: ['KRS 304.9‑430'],
    tests: [
      {
        id: 'test-ky-001-1',
        description: 'Unlicensed adjuster should fail compliance',
        expected_result: 'FAIL',
        test_type: 'VALIDATION'
      },
      {
        id: 'test-ky-001-2',
        description: 'Insufficient bond amount should fail',
        expected_result: 'FAIL',
        test_type: 'VALIDATION'
      },
      {
        id: 'test-ky-001-3',
        description: 'Licensed adjuster with proper bond should pass',
        expected_result: 'PASS',
        test_type: 'VALIDATION'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-002',
    state: 'KY',
    rule_id: 'KY-PUBADJ-REC-002',
    version: '1.0',
    authority_level: 'STATUTE',
    confidence: 'MEDIUM',
    category: 'Public Adjuster',
    subcategory: 'Record Keeping',
    text: 'Keep every claim‑related document for at least five (5) years after the file closes. Make the file available to DOI on request.',
    sources: ['DOI Records Schedule § 03094'],
    tests: [
      {
        id: 'test-ky-002-1',
        description: 'Insufficient retention period should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-ky-002-2',
        description: 'Adequate retention period should pass',
        expected_result: 'PASS',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-003',
    state: 'KY',
    rule_id: 'KY-PUBADJ-FEES-003',
    version: '1.0',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Public Adjuster',
    subcategory: 'Fees',
    text: 'Non‑cat claims – fee ≤ 15% of total recovery. Cat claims – fee ≤ 10%. If the insurer pays or commits in writing to pay policy limits within seventy‑two (72) hours of the first notice of loss, charge only a reasonable time‑based fee.',
    sources: ['2023 HB 232 § 1(4)(c)'],
    tests: [
      {
        id: 'test-ky-003-1',
        description: 'Excessive non-cat fee should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-ky-003-2',
        description: 'Compliant cat fee should pass',
        expected_result: 'PASS',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-ky-003-3',
        description: 'Percentage fee when policy limits paid within 72 hours should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-004',
    state: 'KY',
    rule_id: 'KY-PUBADJ-CON-004',
    version: '1.0',
    authority_level: 'REG',
    confidence: 'HIGH',
    category: 'Public Adjuster',
    subcategory: 'Contracts',
    text: 'Use only a contract form pre‑approved by DOI under 806 KAR 9:400. Provide duplicate originals to the insured and keep one copy. After a catastrophe you may file an "Intent to Contract" within three (3) business days and execute the full contract within seven (7) business days.',
    sources: ['806 KAR 9:400 § 2 & § 6'],
    tests: [
      {
        id: 'test-ky-004-1',
        description: 'Missing DOI-approved contract should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-ky-004-2',
        description: 'Late intent filing should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-ky-004-3',
        description: 'Timely catastrophe contract filing should pass',
        expected_result: 'PASS',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-005',
    state: 'KY',
    rule_id: 'KY-CARRIER-PAY-005',
    version: '1.0',
    authority_level: 'STATUTE',
    confidence: 'HIGH',
    category: 'Insurance Carrier',
    subcategory: 'Payment Obligations',
    text: 'The insurer must pay all undisputed amounts no later than thirty (30) days after receiving notice and proof of claim. Failure triggers 12% interest and, if the delay was without reasonable foundation, reasonable attorney fees.',
    sources: ['KRS 304.12‑235(1)‑(3)'],
    tests: [
      {
        id: 'test-ky-005-1',
        description: 'Late payment of undisputed amount should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-ky-005-2',
        description: 'Disputed claim with reasonable timeline should pass',
        expected_result: 'PASS',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-006',
    state: 'KY',
    rule_id: 'KY-CARRIER-STAT-006',
    version: '1.0',
    authority_level: 'REG',
    confidence: 'HIGH',
    category: 'Insurance Carrier',
    subcategory: 'Communication',
    sunset: '2028-11-30T23:59:59Z',
    text: 'If the claim remains open, the insurer must send a written status letter within the first 30 days and every 45 days thereafter explaining why it has not yet settled and what remains outstanding.',
    sources: ['806 KAR 12:095 § 6(2)(d)'],
    tests: [
      {
        id: 'test-ky-006-1',
        description: 'Overdue status letter should fail',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-ky-006-2',
        description: 'Timely status letter should pass',
        expected_result: 'PASS',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-007',
    state: 'KY',
    rule_id: 'KY-PROP-MATCH-007',
    version: '1.0',
    authority_level: 'REG',
    confidence: 'HIGH',
    category: 'Property Claims',
    subcategory: 'Matching Requirements',
    sunset: '2028-11-30T23:59:59Z',
    text: 'If replacement items do not reasonably match in quality, color, and size, the insurer must replace all items in the area to achieve a reasonably uniform appearance. Applies to interior and exterior losses. No "line‑of‑sight" limitation is allowed.',
    sources: ['806 KAR 12:095 § 9(1)(b)', 'DOI Advisory Opinion 2023‑08'],
    tests: [
      {
        id: 'test-ky-007-1',
        description: 'Non-matching items require full area replacement',
        expected_result: 'FULL_AREA_REPLACE',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-ky-007-2',
        description: 'Matching items allow patch repair',
        expected_result: 'PATCH_OK',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-008',
    state: 'KY',
    rule_id: 'KY-LAW-FEESHIFT-008',
    version: '1.0',
    authority_level: 'CASE',
    confidence: 'HIGH',
    category: 'Legal Framework',
    subcategory: 'Attorney Fees',
    text: 'When § 235 interest attaches, Kentucky courts may also award attorney fees if the delay was without reasonable foundation. Motorists Mut. v. Glass confirms the combination is permissible.',
    sources: ['Motorists Mut. v. Glass, 996 S.W.2d 437 (Ky. 1997)'],
    tests: [
      {
        id: 'test-ky-008-1',
        description: 'Delay without reasonable foundation allows fee award',
        expected_result: 'FEES_YES',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-ky-008-2',
        description: 'Reasonable delay prevents fee award',
        expected_result: 'FEES_NO',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-009',
    state: 'KY',
    rule_id: 'KY-LAW-BADFAITH-009',
    version: '1.0',
    authority_level: 'CASE',
    confidence: 'HIGH',
    category: 'Legal Framework',
    subcategory: 'Bad Faith',
    text: 'To recover under common‑law bad faith, the insured must prove the three Wittmer elements: (1) clear liability, (2) insurer knew or should have known the claim was legitimate, (3) intentional or reckless disregard for the insured\'s rights.',
    sources: ['Wittmer v. Jones, 864 S.W.2d 885 (Ky. 1993)'],
    tests: [
      {
        id: 'test-ky-009-1',
        description: 'Incomplete Wittmer elements should fail bad faith claim',
        expected_result: 'FAIL',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-ky-009-2',
        description: 'All Wittmer elements proven should allow bad faith claim',
        expected_result: 'PASS',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-010',
    state: 'KY',
    rule_id: 'KY-RES-DOI-010',
    version: '1.0',
    authority_level: 'AGENCY',
    confidence: 'HIGH',
    category: 'Professional Resources',
    subcategory: 'Contact Information',
    text: 'Kentucky Department of Insurance\n500 Mero Street, 2 SE 11, Frankfort KY 40601\nPhone 502‑564‑3630 | Toll‑free 800‑595‑6053',
    sources: ['DOI Contact Page'],
    tests: [],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-011',
    state: 'KY',
    rule_id: 'KY-PUBADJ-CON-011',
    version: '1.0',
    authority_level: 'STATUTE',
    confidence: 'MEDIUM',
    category: 'Public Adjuster',
    subcategory: 'Contracts',
    text: 'The insured may cancel the public adjuster contract without penalty by written notice within three (3) business days after execution.',
    sources: ['HB 232 § 1(5) draft language'],
    tests: [
      {
        id: 'test-ky-011-1',
        description: 'Timely cancellation allows full refund',
        expected_result: 'FULL_REFUND',
        test_type: 'COMPLIANCE'
      },
      {
        id: 'test-ky-011-2',
        description: 'Late cancellation follows standard contract terms',
        expected_result: 'STANDARD_TERMS',
        test_type: 'COMPLIANCE'
      }
    ],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-012',
    state: 'KY',
    rule_id: 'KY-PROP-CODE-012',
    version: '0.1',
    authority_level: 'ADVISORY',
    confidence: 'LOW',
    category: 'Property Claims',
    subcategory: 'Building Codes',
    sunset: '2026-06-30T23:59:59Z',
    text: 'Kentucky follows the 2018 International Residential Code with state amendments. No statute forces insurers to pay code‑upgrade costs unless policy language grants it. Confirm local AHJ requirements.',
    sources: ['Kentucky Residential Code FAQ (planning cabinet memo, 2024‑03‑15)'],
    tests: [],
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  }
];

export const kentuckyAlerts: ComplianceAlert[] = [
  {
    id: 'ky-alert-001',
    state: 'KY',
    type: 'Sunset Warning',
    message: 'Carrier status letter requirement and matching rule expiring November 2028',
    priority: 'Medium',
    date: '2025-06-12T09:00:00Z',
    resolved: false,
    rule_id: 'KY-CARRIER-STAT-006',
    source: '806 KAR 12:095 sunset provision',
    action_required: true,
    deadline: '2028-11-30T23:59:59Z'
  },
  {
    id: 'ky-alert-002',
    state: 'KY',
    type: 'New Regulation',
    message: 'Updated fee caps for catastrophic claims now in effect',
    priority: 'High',
    date: '2025-06-10T14:30:00Z',
    resolved: false,
    rule_id: 'KY-PUBADJ-FEES-003',
    source: '2023 HB 232 implementation',
    action_required: true,
    deadline: '2025-07-01T23:59:59Z'
  },
  {
    id: 'ky-alert-003',
    state: 'KY',
    type: 'Rule Change',
    message: 'Building code upgrade coverage guidance requires review by mid-2026',
    priority: 'Low',
    date: '2025-06-08T11:15:00Z',
    resolved: false,
    rule_id: 'KY-PROP-CODE-012',
    source: 'Kentucky Residential Code FAQ update cycle'
  }
];

export const kentuckyTemplates: AITemplate[] = [
  {
    id: 'ky-template-001',
    name: 'Kentucky License & Bond Check',
    category: 'Reality Check',
    template: 'Before proceeding in Kentucky, verify {{adjuster_name}} holds an active license under KRS 304.9-430 and maintains the required $50,000 surety bond. License status can be verified through the Kentucky DOI website.',
    variables: ['adjuster_name'],
    confidence: 'HIGH',
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-template-002',
    name: 'Kentucky Fee Compliance Alert',
    category: 'Hard Facts',
    template: 'KENTUCKY FEE ALERT: {{claim_type}} claims are limited to {{max_percentage}}% of recovery. Current proposed fee of {{proposed_fee}}% {{compliance_status}}. Special 72-hour rule applies when insurer pays policy limits quickly.',
    variables: ['claim_type', 'max_percentage', 'proposed_fee', 'compliance_status'],
    confidence: 'HIGH',
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-template-003',
    name: 'Kentucky Contract Requirements',
    category: 'Enforcement Gap Warning',
    template: 'Kentucky requires DOI-pre-approved contract forms under 806 KAR 9:400. {{contract_status}}. For catastrophic events, Intent to Contract must be filed within 3 business days, full contract within 7 days.',
    variables: ['contract_status'],
    confidence: 'HIGH',
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  },
  {
    id: 'ky-template-004',
    name: 'Kentucky 30-Day Payment Rule',
    category: 'Timeframe Compliance',
    template: 'Kentucky insurers must pay undisputed amounts within 30 days of receiving notice and proof. {{days_elapsed}} days have elapsed. Violation triggers 12% interest and potential attorney fee liability under KRS 304.12-235.',
    variables: ['days_elapsed'],
    confidence: 'HIGH',
    created_at: '2025-06-12T10:00:00Z',
    updated_at: '2025-06-12T10:00:00Z'
  }
];