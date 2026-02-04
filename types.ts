
export interface ParentData {
  childName: string;
  childDob: string;
  returnDate: string;
  weeklyHours: number;
  hourlyRate: number;
  workingParent: boolean;
}

export interface FundingMilestone {
  title: string;
  date: Date;
  description: string;
  hours: number;
  isEligible: boolean;
}

export interface PlannerResults {
  fundingMilestones: FundingMilestone[];
  monthlyCostEstimates: MonthlyCost[];
  advice: string;
  questions: string[];
}

export interface MonthlyCost {
  month: string;
  nurseryFee: number;
  otherCosts: number;
  fundingApplied: number;
  totalOutgoings: number;
}
