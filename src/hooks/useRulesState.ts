import { useState, useEffect } from 'react';
import { EnhancedStateRule as StateRule } from '../types/enhanced-admin';

const STORAGE_KEY = 'state-compliance-rules';

// HARDCODED SAMPLE DATA THAT WILL ALWAYS WORK
const SAMPLE_RULES: StateRule[] = [
  {
    id: 'fl-001',
    rule_id: 'FL-PA-001',
    state: 'FL',
    bucket: ['PA'],
    status: 'active',
    visibility: 'internal',
    category: 'Public Adjuster',
    subcategory: 'Licensing',
    rule_text: 'Public adjusters must hold a license under § 626.865. A $50,000 surety bond is required.',
    leverage_points: ['License is mandatory', 'Bond must remain active'],
    sources: ['Florida Statute 626.865'],
    useful_links: ['https://www.floir.com'],
    version: '1.0',
    confidence: 'HIGH',
    last_updated: new Date().toISOString(),
    is_active: true
  },
  {
    id: 'fl-002',
    rule_id: 'FL-CONTRACTOR-001',
    state: 'FL',
    bucket: ['CONTRACTOR'],
    status: 'beta',
    visibility: 'internal',
    category: 'Contractor Requirements',
    subcategory: 'Insurance',
    rule_text: 'Contractors must maintain $1M general liability insurance.',
    leverage_points: ['Insurance required before permits'],
    sources: ['Florida Building Code'],
    useful_links: ['https://www.myfloridalicense.com'],
    version: '1.0',
    confidence: 'MEDIUM',
    last_updated: new Date().toISOString(),
    is_active: true
  },
  {
    id: 'ky-001',
    rule_id: 'KY-PA-001',
    state: 'KY',
    bucket: ['PA', 'LEGAL'],
    status: 'active',
    visibility: 'shareable',
    category: 'Public Adjuster',
    subcategory: 'Solicitation',
    rule_text: 'No soliciting between 6pm-8am or within 24 hours of catastrophe.',
    leverage_points: ['24-hour waiting period enforced'],
    sources: ['Kentucky Insurance Code'],
    useful_links: ['https://insurance.ky.gov'],
    version: '2.0',
    confidence: 'HIGH',
    last_updated: new Date().toISOString(),
    is_active: true
  },
  {
    id: 'al-001',
    rule_id: 'AL-CARRIER-001',
    state: 'AL',
    bucket: ['CARRIER'],
    status: 'restricted',
    visibility: 'internal',
    category: 'Insurance Carrier',
    subcategory: 'Claims',
    rule_text: 'Carriers must acknowledge claims within 15 working days.',
    leverage_points: ['15 day deadline enforceable'],
    sources: ['Alabama Insurance Code'],
    useful_links: ['https://www.aldoi.gov'],
    version: '1.1',
    confidence: 'HIGH',
    last_updated: new Date().toISOString(),
    is_active: true
  }
];

export function useRulesState() {
  const [rules, setRules] = useState<StateRule[]>(SAMPLE_RULES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load rules from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedRules = JSON.parse(stored);
        if (parsedRules.length > 0) {
          console.log('Loaded', parsedRules.length, 'rules from storage');
          setRules(parsedRules);
        } else {
          console.log('Empty storage, using sample rules');
          setRules(SAMPLE_RULES);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_RULES));
        }
      } else {
        console.log('No storage, using sample rules');
        setRules(SAMPLE_RULES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_RULES));
      }
    } catch (error) {
      console.error('Error loading, using sample rules:', error);
      setRules(SAMPLE_RULES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_RULES));
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever rules change
  const updateRules = (newRules: StateRule[]) => {
    setRules(newRules);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRules));
  };

  const addRule = (rule: StateRule) => {
    updateRules([...rules, rule]);
  };

  const updateRule = (updatedRule: StateRule) => {
    const newRules = rules.map(r => r.id === updatedRule.id ? updatedRule : r);
    updateRules(newRules);
  };

  const deleteRule = (ruleId: string) => {
    updateRules(rules.filter(r => r.id !== ruleId));
  };

  const saveRule = (rule: StateRule) => {
    const existingRule = rules.find(r => r.id === rule.id);
    if (existingRule) {
      updateRule(rule);
    } else {
      addRule(rule);
    }
  };

  return {
    rules,
    isLoaded,
    saveRule,
    deleteRule,
    updateRules
  };
}