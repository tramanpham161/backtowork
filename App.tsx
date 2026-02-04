
import React, { useState } from 'react';
import { ParentData, PlannerResults } from './types.ts';
import { generateTimeline, calculateMonthlyCosts } from './utils/plannerEngine.ts';
import { getPersonalizedAdvice } from './services/geminiService.ts';
import ResultsView from './components/ResultsView.tsx';
import TipsView from './components/TipsView.tsx';
import UsefulLinks from './components/UsefulLinks.tsx';
import { Baby, Clock, Calendar as CalendarIcon, PoundSterling, ChevronRight, LayoutDashboard, Sparkles, ExternalLink, ShieldCheck, Library } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'planner' | 'tips'>('planner');
  const [formData, setFormData] = useState<ParentData>({
    childName: '',
    childDob: '',
    returnDate: '',
    weeklyHours: 37,
    hourlyRate: 8,
    workingParent: true
  });

  const [results, setResults] = useState<PlannerResults | null>(null);
  const [advice, setAdvice] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAdvice(null);
    
    setTimeout(async () => {
      const milestones = generateTimeline(formData);
      const costs = calculateMonthlyCosts(formData, milestones);
      
      setResults({
        fundingMilestones: milestones,
        monthlyCostEstimates: costs,
        advice: '',
        questions: []
      });
      
      setLoading(false);
      setLoadingAdvice(true);
      
      const aiResponse = await getPersonalizedAdvice(formData);
      setAdvice(aiResponse);
      setLoadingAdvice(false);
      
      const resultsEl = document.getElementById('results-section');
      resultsEl?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  const updateField = (field: keyof ParentData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20 selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200/60 py-4 px-4 sticky top-0 z-50 backdrop-blur-md bg-white/90">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-sm">
              <Baby size={20} />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg font-bold tracking-tight text-slate-800 leading-none">BackToWork</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Planner</p>
            </div>
          </div>

          <nav className="flex items-center gap-1 sm:gap-4">
            <button 
              onClick={() => setActiveTab('planner')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === 'planner' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Planner
            </button>
            <button 
              onClick={() => setActiveTab('tips')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'tips' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Library size={14} className={activeTab === 'tips' ? 'text-blue-400' : ''} />
              Tips & Guides
            </button>
          </nav>

          <div className="hidden lg:flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-200"></span> 2026 Ready</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-12 md:pt-20">
        {activeTab === 'planner' ? (
          <>
            {/* Intro */}
            {!results && (
              <div className="mb-16 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 tracking-tight leading-tight">
                  Plan your return to work with <span className="text-blue-600 font-medium lowercase">confidence.</span>
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  See when childcare funding starts, spot gaps early, and prepare for a smoother transition back to work.
                </p>
              </div>
            )}

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="bg-white rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_40px_rgba(0,0,0,0.03)] border border-slate-200/50 overflow-hidden">
                  <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
                          <Sparkles size={14} className="text-blue-300" /> Child's name
                        </label>
                        <input 
                          required
                          type="text" 
                          value={formData.childName}
                          onChange={(e) => updateField('childName', e.target.value)}
                          placeholder="e.g. Leo"
                          className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none text-slate-700 bg-slate-50/30"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
                          <CalendarIcon size={14} className="text-blue-300" /> Date of birth
                        </label>
                        <input 
                          required
                          type="date" 
                          value={formData.childDob}
                          onChange={(e) => updateField('childDob', e.target.value)}
                          className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none text-slate-700 bg-slate-50/30"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
                          <Clock size={14} className="text-blue-300" /> Planned return
                        </label>
                        <input 
                          required
                          type="date" 
                          value={formData.returnDate}
                          onChange={(e) => updateField('returnDate', e.target.value)}
                          className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none text-slate-700 bg-slate-50/30"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
                          <LayoutDashboard size={14} className="text-blue-300" /> Nursery hours / week
                        </label>
                        <input 
                          required
                          type="number" 
                          min="1"
                          max="60"
                          value={formData.weeklyHours}
                          onChange={(e) => updateField('weeklyHours', parseInt(e.target.value))}
                          className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none text-slate-700 bg-slate-50/30"
                        />
                      </div>
                    </div>

                    <div className="py-8 px-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] flex items-center gap-2">
                          <PoundSterling size={14} className="text-blue-300" /> Nursery hourly rate
                        </label>
                        <span className="text-slate-800 font-semibold text-lg">£{formData.hourlyRate}</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="20" 
                        step="0.5"
                        value={formData.hourlyRate}
                        onChange={(e) => updateField('hourlyRate', parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <label className="flex items-start gap-4 cursor-pointer group p-2 transition-opacity hover:opacity-80">
                      <input 
                        type="checkbox" 
                        checked={formData.workingParent}
                        onChange={(e) => updateField('workingParent', e.target.checked)}
                        className="w-5 h-5 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-colors"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-bold text-slate-700">Are you (and partner) working?</span>
                        <p className="text-xs text-slate-400 mt-1">Eligible parents get 30 hours from 9 months old in 2026.</p>
                      </div>
                    </label>

                    <button 
                      type="submit" 
                      disabled={loading}
                      className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-2xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-3 group uppercase tracking-widest text-sm ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? 'Analysing...' : 'Generate my roadmap'}
                      {!loading && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                </div>

                <div className="flex justify-center">
                  <a 
                    href="https://childcarechecker.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-white text-slate-500 text-[13px] font-medium rounded-3xl border border-slate-200/50 hover:border-slate-300 transition-all group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-50 p-2 rounded-xl text-slate-400 group-hover:text-blue-500 transition-colors">
                        <ShieldCheck size={20} />
                      </div>
                      <span className="tracking-tight font-medium">Check official eligibility on <strong>Childcare Checker UK</strong></span>
                    </div>
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                  </a>
                </div>

                <UsefulLinks />
              </div>

              {results && (
                <div id="results-section" className="mt-20 scroll-mt-24">
                  <ResultsView 
                    results={results} 
                    data={formData} 
                    advice={advice}
                    loadingAdvice={loadingAdvice}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <TipsView />
        )}
      </main>

      <footer className="mt-32 border-t border-slate-200/60 py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col items-center space-y-10">
          <div className="flex items-center gap-2 text-slate-400 font-bold">
            <Baby size={18} />
            <span className="tracking-tight uppercase text-[11px] tracking-[0.2em]">BackToWork</span>
          </div>
          <p className="text-xs text-slate-400 max-w-lg text-center leading-relaxed font-medium px-4">
            Financial figures are projections based on the 2026 funding rollout. 
            For official eligibility checks, please visit <a href="https://childcarechecker.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-slate-600 font-bold underline underline-offset-4 hover:text-blue-600 transition-colors">Childcare Checker UK</a>.
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[10px] font-bold text-slate-300 uppercase tracking-[0.25em]">
            <a href="#" className="hover:text-blue-600 transition-colors">Overview</a>
            <a href="https://childcarechecker.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Checker</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Legal</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
