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
  userId: string;
  planId: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Pending';
  plan: Plan;
}

export interface Claim {
  id: string;
  policyId: string;
  userId: string;
  claimNumber: string;
  dateFiled: string;
  description: string;
  status: 'Processing' | 'Approved' | 'Rejected' | 'Pending';
  amount: number;
}
