/*
  # Enhanced State Rules System with Knowledge Silos

  1. New Tables
    - `state_rules` - Enhanced rule storage with leverage points and silo categorization
    - `conversation_history` - Track AI conversations per state/silo
    - `leverage_opportunities` - Track identified leverage points
    - `ai_response_templates` - Enhanced templates with silo-specific responses

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users

  3. Enhanced Features
    - Knowledge silo categorization
    - Leverage point tracking
    - Conversation context per state/silo
    - AI template management
*/

-- Enhanced state rules table with knowledge silos
CREATE TABLE IF NOT EXISTS state_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state varchar(2) NOT NULL,
  silo varchar(50) NOT NULL CHECK (silo IN ('public_adjusting', 'construction', 'insurance_carrier', 'legal')),
  category varchar(100) NOT NULL,
  subcategory varchar(100),
  rule_text text NOT NULL,
  leverage_points text[] DEFAULT '{}',
  sources text[] DEFAULT '{}',
  authority_level varchar(20) DEFAULT 'STATUTE' CHECK (authority_level IN ('STATUTE', 'REG', 'ADVISORY', 'CASE', 'AGENCY')),
  confidence varchar(10) DEFAULT 'HIGH' CHECK (confidence IN ('HIGH', 'MEDIUM', 'LOW')),
  version varchar(10) DEFAULT '1.0',
  sunset_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

-- Conversation history per state/silo
CREATE TABLE IF NOT EXISTS conversation_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state varchar(2) NOT NULL,
  silo varchar(50) NOT NULL CHECK (silo IN ('public_adjusting', 'construction', 'insurance_carrier', 'legal', 'general')),
  user_message text NOT NULL,
  ai_response text NOT NULL,
  context_rules uuid[] DEFAULT '{}', -- Referenced rule IDs
  session_id varchar(100),
  created_at timestamptz DEFAULT now()
);

-- Leverage opportunities tracking
CREATE TABLE IF NOT EXISTS leverage_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  state varchar(2) NOT NULL,
  rule_id uuid REFERENCES state_rules(id),
  opportunity_type varchar(50) NOT NULL,
  description text NOT NULL,
  potential_impact varchar(20) CHECK (potential_impact IN ('HIGH', 'MEDIUM', 'LOW')),
  examples text[],
  created_at timestamptz DEFAULT now()
);

-- Enhanced AI response templates
CREATE TABLE IF NOT EXISTS ai_response_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(200) NOT NULL,
  silo varchar(50) NOT NULL CHECK (silo IN ('public_adjusting', 'construction', 'insurance_carrier', 'legal', 'general')),
  category varchar(100) NOT NULL,
  template_text text NOT NULL,
  variables text[] DEFAULT '{}',
  trigger_keywords text[] DEFAULT '{}',
  confidence varchar(10) DEFAULT 'HIGH',
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- State configuration
CREATE TABLE IF NOT EXISTS state_configuration (
  state varchar(2) PRIMARY KEY,
  name varchar(100) NOT NULL,
  type varchar(20) DEFAULT 'state' CHECK (type IN ('state', 'territory')),
  status varchar(20) DEFAULT 'active' CHECK (status IN ('active', 'restricted', 'prohibited', 'beta', 'coming-soon')),
  status_label varchar(50),
  description text,
  special_message text,
  pa_prohibited boolean DEFAULT false,
  last_updated timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE state_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE leverage_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_response_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE state_configuration ENABLE ROW LEVEL SECURITY;

-- RLS Policies for state_rules
CREATE POLICY "Users can read all state rules"
  ON state_rules
  FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert state rules"
  ON state_rules
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update state rules"
  ON state_rules
  FOR UPDATE
  TO authenticated
  USING (true);

-- RLS Policies for conversation_history
CREATE POLICY "Users can read their conversation history"
  ON conversation_history
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can insert conversation history"
  ON conversation_history
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- RLS Policies for leverage_opportunities
CREATE POLICY "Users can read leverage opportunities"
  ON leverage_opportunities
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can manage leverage opportunities"
  ON leverage_opportunities
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for ai_response_templates
CREATE POLICY "Users can read AI templates"
  ON ai_response_templates
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can manage AI templates"
  ON ai_response_templates
  FOR ALL
  TO authenticated
  USING (true);

-- RLS Policies for state_configuration
CREATE POLICY "Users can read state configuration"
  ON state_configuration
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can update state configuration"
  ON state_configuration
  FOR UPDATE
  TO authenticated
  USING (true);

-- Functions for auto-updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_state_rules_updated_at 
  BEFORE UPDATE ON state_rules 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_response_templates_updated_at 
  BEFORE UPDATE ON ai_response_templates 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();