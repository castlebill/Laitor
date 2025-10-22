export type InsuranceType = 'motor' | 'health' | 'property' | 'life';

export interface Plan {
  id: string;
  provider: string;
  name: string;
  price: number;
  coverage: string[];
  type: InsuranceType;
  deductible: number;
}

export interface Policy {
  id: string;
  plan: Plan;
  policyNumber: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Pending';
}

export interface Claim {
  id: string;
  policy: Policy;
  claimNumber: string;
  date: string;
  status: 'Processing' | 'Approved' | 'Rejected' | 'Pending';
  description: string;
}
