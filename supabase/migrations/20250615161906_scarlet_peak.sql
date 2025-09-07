/*
  # Seed Initial Data for State Rules System
  
  1. State Configuration
  2. Sample Rules with Knowledge Silos
  3. AI Response Templates
  4. Leverage Opportunities
*/

-- Insert state configuration data
INSERT INTO state_configuration (state, name, type, status, status_label, description, special_message, pa_prohibited) VALUES
('AL', 'Alabama', 'state', 'prohibited', 'PA Prohibited', 'Public adjusting is prohibited. Insurance carrier obligations and legal resources available.', 'We don''t work here - here''s why it''s illegal', true),
('FL', 'Florida', 'state', 'active', 'Production Ready', 'Hurricane capital with complex emergency event regulations.', '90-day prompt pay rule violations = automatic breach', false),
('KY', 'Kentucky', 'state', 'active', 'Production Ready', 'Unique fee caps and contract requirements with matching provisions.', '72-hour policy limits rule - time-based fees only', false),
('TX', 'Texas', 'state', 'active', 'Production Ready', 'Hail capital with hurricane, tornado, and freeze damage protocols.', 'Hail damage capital - high-volume claim environment', false),
('CA', 'California', 'state', 'active', 'Production Ready', 'Complex regulatory framework with wildfire, earthquake, and digital disclosure requirements.', 'Strict licensing requirements - verify credentials before proceeding', false),
('CO', 'Colorado', 'state', 'active', 'Production Ready', 'Hail damage capital with robust fee-shifting provisions.', 'Fee shifting available for bad faith - leverage opportunity', false),
('PR', 'Puerto Rico', 'territory', 'active', 'Territory - Active', 'Caribbean territory with hurricane and tropical storm specialization.', 'Federal and territorial laws apply - unique legal framework', false),
('VI', 'US Virgin Islands', 'territory', 'beta', 'Territory - Beta', 'Caribbean territory with hurricane and tropical weather protocols.', null, false);

-- Sample Kentucky Rules with Knowledge Silos
INSERT INTO state_rules (state, silo, category, subcategory, rule_text, leverage_points, sources, authority_level, confidence) VALUES

-- Public Adjusting Silo
('KY', 'public_adjusting', 'License Requirements', 'Initial Licensing', 'A person may not act as a public adjuster in Kentucky without a license issued under KRS 304.9-430. Each licensee shall maintain a $50,000 surety bond or irrevocable letter of credit for the life of the license.', 
 ARRAY['Can challenge unlicensed competitors', 'Bond violations void contracts', 'Immediate injunctive relief available'], 
 ARRAY['KRS 304.9-430'], 'STATUTE', 'HIGH'),

('KY', 'public_adjusting', 'Fee Limitations', 'Catastrophic Claims', 'Non-cat claims – fee ≤ 15% of total recovery. Cat claims – fee ≤ 10%. If the insurer pays or commits in writing to pay policy limits within seventy-two (72) hours of the first notice of loss, charge only a reasonable time-based fee.', 
 ARRAY['72-hour rule protects against percentage gouging', 'Policy limits payment triggers time-based only', 'Violations create contract voidability'], 
 ARRAY['2023 HB 232 § 1(4)(c)'], 'STATUTE', 'HIGH'),

-- Construction Silo
('KY', 'construction', 'Matching Requirements', 'Material Replacement', 'If replacement items do not reasonably match in quality, color, and size, the insurer must replace all items in the area to achieve a reasonably uniform appearance. Applies to interior and exterior losses. No "line-of-sight" limitation is allowed.', 
 ARRAY['Full area replacement when no match possible', 'No line-of-sight limitation defense', 'Uniform appearance standard enforceable'], 
 ARRAY['806 KAR 12:095 § 9(1)(b)', 'DOI Advisory Opinion 2023-08'], 'REG', 'HIGH'),

-- Insurance Carrier Silo
('KY', 'insurance_carrier', 'Payment Obligations', 'Undisputed Amounts', 'The insurer must pay all undisputed amounts no later than thirty (30) days after receiving notice and proof of claim. Failure triggers 12% interest and, if the delay was without reasonable foundation, reasonable attorney fees.', 
 ARRAY['30-day deadline for undisputed amounts', '12% interest penalty automatic', 'Attorney fees if delay unreasonable', 'Breach of contract claim available'], 
 ARRAY['KRS 304.12-235(1)-(3)'], 'STATUTE', 'HIGH'),

('KY', 'insurance_carrier', 'Communication', 'Status Letters', 'If the claim remains open, the insurer must send a written status letter within the first 30 days and every 45 days thereafter explaining why it has not yet settled and what remains outstanding.', 
 ARRAY['45-day status letter violations create leverage', 'Failure shows bad faith', 'Discovery violations for missing letters'], 
 ARRAY['806 KAR 12:095 § 6(2)(d)'], 'REG', 'HIGH'),

-- Legal Silo
('KY', 'legal', 'Attorney Fees', 'Fee Shifting', 'When § 235 interest attaches, Kentucky courts may also award attorney fees if the delay was without reasonable foundation. Motorists Mut. v. Glass confirms the combination is permissible.', 
 ARRAY['Interest + attorney fees combination', 'Unreasonable delay standard', 'Fee shifting leverage in settlement'], 
 ARRAY['Motorists Mut. v. Glass, 996 S.W.2d 437 (Ky. 1997)'], 'CASE', 'HIGH'),

('KY', 'legal', 'Bad Faith', 'Elements', 'To recover under common-law bad faith, the insured must prove the three Wittmer elements: (1) clear liability, (2) insurer knew or should have known the claim was legitimate, (3) intentional or reckless disregard for the insured''s rights.', 
 ARRAY['Three-part test for bad faith', 'Punitive damages available', 'Separate tort claim beyond contract'], 
 ARRAY['Wittmer v. Jones, 864 S.W.2d 885 (Ky. 1993)'], 'CASE', 'HIGH');

-- Sample Florida Rules
INSERT INTO state_rules (state, silo, category, subcategory, rule_text, leverage_points, sources, authority_level, confidence) VALUES

-- Public Adjusting Silo
('FL', 'public_adjusting', 'License Requirements', 'Bonding', 'Public adjusters must hold a license under § 626.865. A $50,000 surety bond is required at application and must remain in force for the life of the license and 1 year after termination.', 
 ARRAY['Bond violations void authority', 'Can challenge competitors without proper bonds', 'Consumer protection through bonding'], 
 ARRAY['626.865 Fla. Stat.'], 'STATUTE', 'HIGH'),

-- Insurance Carrier Silo
('FL', 'insurance_carrier', 'Payment Obligations', 'Prompt Pay', 'Within 90 days of receiving notice of an initial, reopened, or supplemental property claim, the insurer must pay or deny all or part of it, unless factors beyond the insurer''s control reasonably prevent payment. Late payments bear statutory interest from the notice date.', 
 ARRAY['90-day absolute deadline', 'Statutory interest from notice date', 'Automatic breach for violations', 'Limited exceptions must be proven'], 
 ARRAY['627.70131 (7)(a) Fla. Stat.'], 'STATUTE', 'HIGH');

-- AI Response Templates
INSERT INTO ai_response_templates (name, silo, category, template_text, variables, trigger_keywords, confidence) VALUES

('Kentucky License Verification', 'public_adjusting', 'Reality Check', 
 'Before proceeding in Kentucky, verify {{adjuster_name}} holds an active license under KRS 304.9-430 and maintains the required $50,000 surety bond. License status can be verified through the Kentucky DOI website at {{doi_website}}.', 
 ARRAY['adjuster_name', 'doi_website'], 
 ARRAY['kentucky', 'license', 'adjuster', 'verify'], 'HIGH'),

('Florida Emergency Fee Alert', 'public_adjusting', 'Hard Facts', 
 'FLORIDA EMERGENCY FEE ALERT: This claim {{emergency_status}} under a Governor-declared state of emergency. Fee limit is {{fee_limit}}% for {{event_duration}}. Current proposed fee of {{proposed_fee}}% {{compliance_status}}.', 
 ARRAY['emergency_status', 'fee_limit', 'event_duration', 'proposed_fee', 'compliance_status'], 
 ARRAY['florida', 'emergency', 'fee', 'percentage'], 'HIGH'),

('Kentucky 30-Day Payment Rule', 'insurance_carrier', 'Timeframe Compliance', 
 'Kentucky insurers must pay undisputed amounts within 30 days of receiving notice and proof. {{days_elapsed}} days have elapsed. Violation triggers 12% interest and potential attorney fee liability under KRS 304.12-235.', 
 ARRAY['days_elapsed'], 
 ARRAY['kentucky', 'payment', 'undisputed', 'deadline'], 'HIGH'),

('Colorado Fee Shifting Opportunity', 'legal', 'Enforcement Gap Warning', 
 'Colorado offers fee-shifting opportunities for bad faith claims. {{situation_analysis}}. Consider documenting {{evidence_needed}} to support potential fee recovery under {{applicable_statute}}.', 
 ARRAY['situation_analysis', 'evidence_needed', 'applicable_statute'], 
 ARRAY['colorado', 'fee shifting', 'bad faith', 'attorney fees'], 'HIGH');

-- Leverage Opportunities
INSERT INTO leverage_opportunities (state, opportunity_type, description, potential_impact, examples) VALUES

('KY', 'Payment Deadline Violation', '30-day undisputed amount payment deadline creates automatic leverage when violated', 'HIGH', 
 ARRAY['12% interest accumulation', 'Attorney fee recovery if unreasonable', 'Settlement pressure from penalty interest']),

('FL', 'Prompt Pay Violation', '90-day prompt pay deadline violations create immediate breach of contract', 'HIGH', 
 ARRAY['Statutory interest from notice date', 'Automatic contract breach', 'Limited exception defenses']),

('CO', 'Fee Shifting Availability', 'Bad faith claims trigger attorney fee shifting in Colorado', 'HIGH', 
 ARRAY['Full attorney fee recovery', 'Settlement leverage', 'Punitive damage potential']),

('KY', 'Status Letter Failures', 'Missing 45-day status letters show bad faith and create discovery violations', 'MEDIUM', 
 ARRAY['Bad faith evidence', 'Discovery sanctions', 'Pattern of non-compliance']);