import type { Plan, Policy, Claim } from './types';

// Mock Insurance Plans
const motorPlans: Plan[] = [
  { id: 'plan-m1', provider: 'Jubilee', name: 'Comprehensive', price: 9800, coverage: ['Comprehensive', 'Towing Assistance', 'Windscreen'], type: 'motor', deductible: 500 },
  { id: 'plan-m2', provider: 'Britam', name: 'Comprehensive Plus', price: 9200, coverage: ['Comprehensive', 'Towing', 'Courtesy Car'], type: 'motor', deductible: 600 },
  { id: 'plan-m3', provider: 'Madison', name: 'Third-Party & Theft', price: 8700, coverage: ['Third-Party Liability', 'Theft Cover'], type: 'motor', deductible: 0 },
  { id: 'plan-m4', provider: 'UAP Old Mutual', name: 'Economy Third-Party', price: 5500, coverage: ['Third-Party Liability'], type: 'motor', deductible: 0 },
];

const healthPlans: Plan[] = [
  { id: 'plan-h1', provider: 'AAR', name: 'Inpatient Basic', price: 12000, coverage: ['Inpatient Cover', 'Hospitalization'], type: 'health', deductible: 1000 },
  { id: 'plan-h2', provider: 'Jubilee Health', name: 'Family Wellness', price: 25000, coverage: ['Inpatient', 'Outpatient', 'Maternity'], type: 'health', deductible: 500 },
  { id: 'plan-h3', provider: 'Britam', name: 'Critical Illness', price: 18000, coverage: ['Critical Illness Cover', 'Inpatient'], type: 'health', deductible: 2000 },
];

const propertyPlans: Plan[] = [
  { id: 'plan-p1', provider: 'ICEA Lion', name: 'Home Secure', price: 7500, coverage: ['Fire & Perils', 'Theft', 'Natural Calamities'], type: 'property', deductible: 2500 },
  { id: 'plan-p2', provider: 'Britam', name: 'Building & Contents', price: 10500, coverage: ['Structural Damage', 'Contents Insurance', 'Liability'], type: 'property', deductible: 3000 },
];

const lifePlans: Plan[] = [
  { id: 'plan-l1', provider: 'Jubilee Life', name: 'Family Shield', price: 5000, coverage: ['Life Cover', 'Funeral Expenses'], type: 'life', deductible: 0 },
  { id: 'plan-l2', provider: 'Madison', name: 'Education Plan', price: 8000, coverage: ['Life Cover', 'Education Savings'], type: 'life', deductible: 0 },
];

export const allPlans: Record<string, Plan[]> = {
  motor: motorPlans,
  health: healthPlans,
  property: propertyPlans,
  life: lifePlans,
};

// Mock User Policies
export const userPolicies: Policy[] = [
  { id: 'pol-1', plan: motorPlans[1], policyNumber: 'BRT-KDC874N-2023', startDate: '2023-11-01', endDate: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString().split('T')[0], status: 'Active' },
  { id: 'pol-2', plan: healthPlans[0], policyNumber: 'AAR-HEALTH-101', startDate: '2024-01-15', endDate: '2025-01-14', status: 'Active' },
  { id: 'pol-3', plan: propertyPlans[0], policyNumber: 'ICEA-PROP-XYZ', startDate: '2023-06-01', endDate: '2024-05-31', status: 'Expired' },
];

// Mock User Claims
export const userClaims: Claim[] = [
  { id: 'clm-1', policy: userPolicies[0], claimNumber: 'CLM-MOT-001', date: '2024-03-10', status: 'Approved', description: 'Minor fender bender repair' },
  { id: 'clm-2', policy: userPolicies[1], claimNumber: 'CLM-HLT-002', date: '2024-04-22', status: 'Processing', description: 'Outpatient consultation' },
  { id: 'clm-3', policy: userPolicies[2], claimNumber: 'CLM-PRP-003', date: '2024-01-05', status: 'Rejected', description: 'Claim filed after policy expiration' },
];
