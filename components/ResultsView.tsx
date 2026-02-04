
import React, { useState, useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, differenceInWeeks, subMonths, startOfMonth } from 'date-fns';
import { PlannerResults, ParentData } from '../types.ts';
import { Calendar, MessageCircle, PiggyBank, Briefcase, ArrowRight, ShieldCheck, CheckCircle2, Share2, Mail, Info, ThumbsUp, ThumbsDown, Send, Lightbulb } from 'lucide-react';

interface ResultsViewProps {
  results: PlannerResults;
  data: ParentData;
  advice: any;
  loadingAdvice: boolean;
}

const ResultsView: React.FC<ResultsViewProps> = ({ results, data, advice, loadingAdvice }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const fundingStartDate = useMemo(() => {
    const eligible = results.fundingMilestones.filter(m => m.isEligible);
    return eligible.length > 0 ? eligible[0].date : null;
  }, [results]);

  const gapWeeks = useMemo(() => {
    const returnDt = new Date(data.returnDate);
    if (fundingStartDate && returnDt < fundingStartDate) {
      return differenceInWeeks(fundingStartDate, returnDt);
    }
    return 0;
  }, [data.returnDate, fundingStartDate]);

  const checklistDates = useMemo(() => {
    if (!fundingStartDate) return { apply: 'ASAP', contact: 'ASAP' };
    return {
      apply: format(subMonths(fundingStartDate, 1), 'do MMMM yyyy'),
      contact: format(subMonths(new Date(data.returnDate), 6), 'MMMM yyyy')
    };
  }, [fundingStartDate, data.returnDate]);

  const handleShare = async () => {
    const text = `Check out my return to work plan for ${data.childName}! Returns on ${format(new Date(data.returnDate), 'PPP')}.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'BackToWork Planner', text, url: window.location.href });
      } catch (err) { console.log(err); }
    } else {
      window.location.href = `mailto:?subject=Return to work plan for ${data.childName}&body=${text}`;
    }
  };

  const checklistItems = [
    `Contact 2–3 childcare providers to confirm availability.`,
    `Apply for childcare code by ${checklistDates.apply}.`,
    `Contact nurseries by ${checklistDates.contact} to secure a spot.`,
    `Discuss flexible hours/phased return with employer.`,
    `Reconfirm eligibility every 3 months on GOV.UK.`,
    `Plan for 1-2 weeks of settling-in time.`,
    `Share this plan with your partner or network.`
  ];

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
      
      {/* Top Actions */}
      <div className="flex flex-wrap justify-end gap-3 -mb-8">
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[11px] font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-50 transition-all shadow-sm"
        >
          <Share2 size={14} className="text-blue-500" /> Share with partner
        </button>
        <button 
          onClick={() => window.location.href = `mailto:?subject=My BackToWork Plan&body=Planning return for ${data.childName} on ${data.returnDate}.`}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-[11px] font-bold text-slate-600 uppercase tracking-wider hover:bg-slate-50 transition-all shadow-sm"
        >
          <Mail size={14} className="text-blue-500" /> Email to myself
        </button>
      </div>

      {/* Empathetic Intro */}
      <section className="bg-white border border-slate-200/50 p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
            <MessageCircle size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Return-to-work context</h2>
        </div>
        {loadingAdvice ? (
          <div className="space-y-4">
            <div className="h-4 bg-slate-50 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-slate-50 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-slate-50 rounded w-2/3 animate-pulse"></div>
          </div>
        ) : (
          <p className="text-slate-500 leading-relaxed text-lg font-medium italic border-l-4 border-blue-100 pl-6">
            "{advice?.supportMessage}"
          </p>
        )}
      </section>

      {/* Gap Warning & Milestones */}
      <section className="space-y-8 px-2">
        {gapWeeks > 0 && (
          <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex items-start gap-4 animate-in zoom-in-95 duration-500">
            <div className="bg-amber-100 p-2 rounded-xl text-amber-600 mt-0.5">
              <Info size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900">Self-funded gap detected</p>
              <p className="text-xs text-amber-700 font-medium mt-1 leading-relaxed">
                You may need to cover childcare costs for ~{gapWeeks} weeks before your first government funding milestone kicks in on {format(fundingStartDate!, 'do MMM yyyy')}.
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-blue-400" />
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Funding milestones</h3>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {results.fundingMilestones.map((ms, idx) => (
            <div key={idx} className={`relative p-6 rounded-3xl border transition-all duration-500 ${ms.isEligible ? 'bg-white border-slate-200/60 shadow-sm' : 'bg-slate-50/50 border-transparent opacity-40 grayscale'}`}>
              <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">
                {format(ms.date, 'MMM yyyy')}
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-2">{ms.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{ms.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cost Visualization */}
      <section className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_2px_40px_rgba(0,0,0,0.03)] border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-4 h-4 text-blue-400" />
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Annual outlook</h3>
            </div>
            <h4 className="text-3xl font-bold text-slate-800 tracking-tight">Monthly budget estimates</h4>
            <p className="text-sm text-slate-400 font-medium">Visualisation includes fluctuating seasonal energy & growth costs.</p>
          </div>
          <div className="flex flex-wrap gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nursery fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-200"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Essentials</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-blue-600/30"></div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total outgoing</span>
            </div>
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={results.monthlyCostEstimates} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                dy={15}
                className="font-bold text-slate-300"
              />
              <YAxis 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `£${value}`} 
                className="font-bold text-slate-300"
              />
              <Tooltip 
                formatter={(value) => `£${value}`}
                contentStyle={{ 
                  borderRadius: '20px', 
                  border: 'none', 
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)', 
                  fontSize: '11px',
                  padding: '20px',
                  backgroundColor: '#ffffff'
                }}
                cursor={{ fill: '#f8fafc' }}
              />
              <Bar 
                name="Nursery fee" 
                dataKey="nurseryFee" 
                stackId="a" 
                fill="#2563eb" 
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
              <Bar 
                name="Essentials" 
                dataKey="otherCosts" 
                stackId="a" 
                fill="#dbeafe" 
                radius={[4, 4, 0, 0]}
                barSize={32}
              />
              <Line 
                type="monotone" 
                name="Total budget" 
                dataKey="totalOutgoings" 
                stroke="#1d4ed8" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#1d4ed8', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Transition Roadmap - Compact Version */}
      <section className="bg-slate-900 py-8 px-10 md:px-14 rounded-[2.5rem] text-white">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-3 h-3 text-blue-400" />
            <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Next steps</h3>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h4 className="text-2xl font-bold tracking-tight">Transition Roadmap</h4>
              <p className="text-slate-400 mt-2 text-xs font-medium leading-relaxed max-w-xl">
                Track your progress. You don’t need to decide everything today — this is just a starting point.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {checklistItems.map((item, i) => (
              <div 
                key={i} 
                onClick={() => toggleCheck(i)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer group ${checkedItems[i] ? 'bg-white/5 border-white/5 opacity-50' : 'bg-white/10 border-white/10 hover:border-blue-500'}`}
              >
                <div className={`w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center transition-colors shrink-0 ${checkedItems[i] ? 'bg-blue-500 border-blue-500' : 'border-slate-600 group-hover:border-blue-400'}`}>
                  {checkedItems[i] && <CheckCircle2 size={12} />}
                </div>
                <span className={`text-[13px] font-medium leading-tight ${checkedItems[i] ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Steps */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2rem] border border-slate-200/60 shadow-sm">
          <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> WHAT TO ASK YOUR CHILDCARE PROVIDER?
          </h4>
          <ul className="space-y-6">
            {(advice?.nurseryQuestions || []).map((q: string, i: number) => (
              <li key={i} className="text-sm text-slate-600 font-medium flex gap-4 leading-relaxed group">
                <span className="text-blue-200 font-bold group-hover:text-blue-400 transition-colors">0{i+1}</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-10 rounded-[2rem] border border-slate-200/60 shadow-sm">
          <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> WHAT TO ASK YOUR EMPLOYER?
          </h4>
          <ul className="space-y-6">
            {(advice?.employerQuestions || []).map((q: string, i: number) => (
              <li key={i} className="text-sm text-slate-600 font-medium flex gap-4 leading-relaxed group">
                <span className="text-blue-200 font-bold group-hover:text-blue-400 transition-colors">0{i+1}</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Before you talk to your employer - Redesigned */}
      <section className="bg-white p-10 md:p-14 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 text-slate-50/50 pointer-events-none">
          <Lightbulb size={120} strokeWidth={1} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-4 h-4 text-blue-500" />
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Strategy</h3>
          </div>
          <h4 className="text-3xl font-bold text-slate-800 mb-10 tracking-tight">Before you talk to your employer</h4>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Start Early", text: "You don’t need a fully fixed plan to start. Early chats help everyone plan better." },
              { title: "Framing", text: "Frame it as a collaborative discussion about your transition, not just a set of requests." },
              { title: "Flexibility", text: "Ask about temporary options like a phased return or temporary hybrid working." },
              { title: "Commitment", text: "Be clear about what you can commit to, even if some childcare details are still unknown." },
              { title: "Confirmation", text: "Always check if agreements need to be confirmed in writing via email or HR." },
              { title: "Sustainability", text: "Remember: flexibility is about long-term sustainability, not just a one-off favor." }
            ].map((tip, i) => (
              <div key={i} className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100/80 hover:bg-white hover:border-blue-100 transition-all group">
                <h5 className="text-[13px] font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{tip.title}</h5>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Card - Title Changed */}
      <section className="bg-blue-600 p-10 md:p-14 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl shadow-blue-100 border border-blue-500 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-20 -mb-20 blur-3xl pointer-events-none"></div>
        
        <div className="flex-1 text-center md:text-left space-y-6 relative z-10">
          <h3 className="text-3xl font-bold tracking-tight">Check your eligibility</h3>
          <p className="text-blue-100 text-base leading-relaxed max-w-md font-medium opacity-90">
            For specific household income checks and to see exactly how your local nursery applies top-up fees, use the primary checker tool.
          </p>
          <a 
            href="https://childcarechecker.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4.5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all group shadow-lg"
          >
            Check Childcare Checker UK
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
          </a>
        </div>
        <div className="hidden md:block opacity-20 transform rotate-6 scale-125 relative z-0">
          <ShieldCheck size={180} strokeWidth={1} />
        </div>
      </section>

      {/* Feedback System */}
      <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 text-center space-y-8">
        {!feedbackSubmitted ? (
          <>
            <h4 className="text-lg font-bold text-slate-800 tracking-tight">Was this roadmap helpful?</h4>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setFeedback('yes')}
                className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all ${feedback === 'yes' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                <ThumbsUp size={18} /> Yes
              </button>
              <button 
                onClick={() => setFeedback('no')}
                className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all ${feedback === 'no' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                <ThumbsDown size={18} /> No
              </button>
            </div>
            {feedback && (
              <div className="max-w-md mx-auto space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <textarea 
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Any suggestions for us? (Optional)"
                  className="w-full p-4 rounded-2xl border border-slate-200 text-sm focus:border-blue-400 outline-none h-24 resize-none"
                />
                <button 
                  onClick={() => setFeedbackSubmitted(true)}
                  className="w-full py-3.5 bg-slate-800 text-white rounded-2xl font-bold text-sm hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={16} /> Send feedback
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="animate-in zoom-in-95 duration-500">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="text-lg font-bold text-slate-800">Thank you for your feedback!</h4>
            <p className="text-slate-400 text-sm font-medium mt-1">We're constantly improving to help more parents.</p>
          </div>
        )}
      </section>
      
      {/* Disclaimer */}
      <div className="px-6 text-center space-y-4 opacity-60">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
          This tool gives guidance, not official confirmation. Always double-check eligibility via GOV.UK. Designed for England. Works best for parents planning return within 18 months.
        </p>
      </div>

      {/* Refined Edit Button Section */}
      <div className="flex justify-center py-4">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-6 py-2.5 text-slate-400 hover:text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] transition-all border border-slate-200 hover:border-blue-200 rounded-full bg-white/50 backdrop-blur-sm"
        >
          Edit return-to-work details
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
