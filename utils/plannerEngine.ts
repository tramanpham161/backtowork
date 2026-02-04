
import { addMonths, startOfMonth, format, isAfter, isBefore, addYears, eachMonthOfInterval } from 'date-fns';
import { ParentData, FundingMilestone, MonthlyCost } from '../types';

export const calculateFundingStart = (dob: Date, years: number, months: number = 0): Date => {
  const milestoneDate = addMonths(addYears(dob, years), months);
  const year = milestoneDate.getFullYear();
  const month = milestoneDate.getMonth();

  // UK Terms: Sept 1, Jan 1, April 1
  if (month >= 8) return new Date(year + 1, 0, 1); // Born Sept-Dec starts Jan
  if (month >= 0 && month <= 2) return new Date(year, 3, 1); // Born Jan-Mar starts Apr
  return new Date(year, 8, 1); // Born Apr-Aug starts Sept
};

export const generateTimeline = (data: ParentData): FundingMilestone[] => {
  const dob = new Date(data.childDob);
  const working = data.workingParent;

  return [
    {
      title: "9 Months (Working)",
      date: calculateFundingStart(dob, 0, 9),
      description: "Eligible working parents can now claim 30 hours per week (fully rolled out).",
      hours: 30,
      isEligible: working
    },
    {
      title: "2 Years (Working)",
      date: calculateFundingStart(dob, 2),
      description: "Working parents of 2yr olds receive 30 hours per week.",
      hours: 30,
      isEligible: working
    },
    {
      title: "3 & 4 Years (Universal)",
      date: calculateFundingStart(dob, 3),
      description: "All parents of 3-4yr olds get 15 universal hours regardless of work status.",
      hours: 15,
      isEligible: true
    },
    {
      title: "3 & 4 Years (Working)",
      date: calculateFundingStart(dob, 3),
      description: "Working parents can claim a total of 30 hours (15 universal + 15 extended).",
      hours: 30,
      isEligible: working
    }
  ].sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const calculateMonthlyCosts = (data: ParentData, milestones: FundingMilestone[]): MonthlyCost[] => {
  const start = startOfMonth(new Date(data.returnDate));
  const end = addMonths(start, 12);
  const months = eachMonthOfInterval({ start, end });

  // Base constants from CPAG / Moneyfarm
  const baseEssentialCost = 480; 
  const workRelatedIncr = 120;

  return months.map((m, index) => {
    // VARIABILITY INJECTED: Simulate seasonal/age growth variations
    // Winter months (Nov, Dec, Jan, Feb) have higher energy costs (+£40)
    // Child age adds a tiny increase each month as they eat/grow more (+£5/month)
    const monthIndex = m.getMonth();
    const isWinter = [10, 11, 0, 1].includes(monthIndex);
    const seasonalShift = isWinter ? 45 : 0;
    const growthShift = index * 8;
    
    const dynamicOtherCosts = baseEssentialCost + workRelatedIncr + seasonalShift + growthShift;

    // Find active funding for this month
    const activeMilestone = milestones
      .filter(ms => ms.isEligible && (isBefore(ms.date, m) || ms.date.getTime() === m.getTime()))
      .reduce((prev, current) => (current.hours > (prev?.hours || 0) ? current : prev), null as FundingMilestone | null);

    const fundedHours = activeMilestone ? activeMilestone.hours : 0;
    
    // Standard term-time 30 hours is 38 weeks/year. Stretched over 52 weeks is ~22 hours/week.
    const weeklyBillableHours = Math.max(0, data.weeklyHours - (fundedHours * (38/52))); 
    const monthlyNurseryFee = weeklyBillableHours * data.hourlyRate * 4.33; 
    const fundingValue = (data.weeklyHours - weeklyBillableHours) * data.hourlyRate * 4.33;

    return {
      month: format(m, 'MMM yy'),
      nurseryFee: Math.round(monthlyNurseryFee),
      otherCosts: Math.round(dynamicOtherCosts),
      fundingApplied: Math.round(fundingValue),
      totalOutgoings: Math.round(monthlyNurseryFee + dynamicOtherCosts)
    };
  });
};
