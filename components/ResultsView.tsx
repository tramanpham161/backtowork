
import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { PlannerResults, ParentData } from '../types.ts';
import { Calendar, MessageCircle, PiggyBank, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';

interface ResultsViewProps {
  results: PlannerResults;
  data: ParentData;
  advice: any;
  loadingAdvice: boolean;
}

const ResultsView: React.FC<ResultsViewProps> = ({ results, data, advice, loadingAdvice }) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
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

      {/* Timeline Section */}
      <section className="space-y-8 px-2">
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
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-slate-50">
          <div className="space-y-4">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">About the numbers</h5>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              We base "Essentials" on £480/mo (CPAG averages) plus a £120 return-to-work incremental shift. 
              The chart accounts for higher heating costs in winter and growing child expenses.
            </p>
          </div>
          <div className="space-y-4">
            <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nursery top-ups</h5>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Funding covers the cost of childcare, but not consumables like snacks, wipes, or nappies. 
              Expect small daily surcharges depending on your provider.
            </p>
          </div>
        </div>
      </section>

      {/* Action Steps */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2rem] border border-slate-200/60 shadow-sm">
          <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> Nursery prep
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
            <Briefcase className="w-4 h-4" /> Employer chat
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

      {/* Verification Card */}
      <section className="bg-blue-600 p-10 md:p-14 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl shadow-blue-100 border border-blue-500 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-20 -mb-20 blur-3xl pointer-events-none"></div>
        
        <div className="flex-1 text-center md:text-left space-y-6 relative z-10">
          <h3 className="text-3xl font-bold tracking-tight">Check your eligbility</h3>
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
