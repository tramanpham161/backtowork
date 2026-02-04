
import React, { useState } from 'react';
import { 
  Coffee, Heart, RefreshCw, MessageSquare, ClipboardList, 
  Baby, Briefcase, Calendar, CheckCircle2, ShieldAlert, 
  Mail, Users, Zap, ExternalLink, Lightbulb, Info, ArrowRight, ChevronDown, ChevronUp
} from 'lucide-react';

const TipsView: React.FC = () => {
  const [activePhase, setActivePhase] = useState<'before' | 'during' | 'after'>('before');

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Intro header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Return to work library</h2>
        <p className="text-slate-500 font-medium italic">Expert-backed guidance for the logistical, professional, and emotional transition back to the workplace.</p>
      </div>

      {/* Phase navigation */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200 shadow-inner">
          {[
            { id: 'before', label: 'Before return', icon: Baby },
            { id: 'during', label: 'During transition', icon: RefreshCw },
            { id: 'after', label: 'After return', icon: Zap }
          ].map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id as any)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activePhase === phase.id 
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <phase.icon size={16} />
              {phase.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-4xl mx-auto">
        {activePhase === 'before' && <BeforeReturnPhase />}
        {activePhase === 'during' && <DuringTransitionPhase />}
        {activePhase === 'after' && <AfterReturnPhase />}
      </div>

      {/* Localised resources */}
      <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <Info className="text-blue-500" size={24} />
          <h3 className="text-xl font-bold text-slate-800">Localised support resources</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "NCT return to work guide", url: "https://www.nct.org.uk/information/life-parent/support-change/returning-work-after-maternity-leave", desc: "Peer-to-peer support and legal rights overview." },
            { title: "NHS feeding support", url: "https://www.nhs.uk/conditions/baby/breastfeeding-and-bottle-feeding/", desc: "Practical advice for feeding transitions." },
            { title: "Maternity Action", url: "https://maternityaction.org.uk/", desc: "Dedicated legal advice for workplace rights in the UK." },
            { title: "Family Rights Group", url: "https://frg.org.uk/", desc: "Support for managing family and work logistics." }
          ].map((res, i) => (
            <a key={i} href={res.url} target="_blank" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all flex items-start justify-between group">
              <div>
                <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{res.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{res.desc}</p>
              </div>
              <ExternalLink size={14} className="text-slate-300" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

const BeforeReturnPhase = () => {
  const [showAllTips, setShowAllTips] = useState(false);
  
  const allTips = [
    { title: "Get clear on dates", text: "Know when work starts, when childcare starts, and whether there's a gap." },
    { title: "Line up childcare early", text: "Confirm availability, hours, and settling-in plans with your provider." },
    { title: "Apply for support", text: "Apply for childcare funding and set reminders to reconfirm if needed." },
    { title: "Talk to your employer", text: "Share your return date and any flexibility you may need early." },
    { title: "Plan your routine", text: "Think through mornings, drop-offs, and pickups — practice helps." },
    { title: "Prepare for feeding", text: "If applicable, plan bottles, pumping, or feeding schedules in advance." },
    { title: "Expect emotions", text: "It's normal to feel unsure, guilty, or excited — often all at once." },
    { title: "Build your safety net", text: "Identify backup care and who can help if plans change." },
    { title: "Simplify life", text: "Reduce non-essential commitments before returning." },
    { title: "Write down your plan", text: "Even a rough plan helps you feel more in control." }
  ];

  const visibleTips = showAllTips ? allTips : allTips.slice(0, 6);

  return (
    <div className="grid gap-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500"><Calendar size={20} /></div>
          <h3 className="text-lg font-bold text-slate-800">Childcare settling planner</h3>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed">Guide your baby into childcare gradually. Most providers recommend a 1-2 week "settling-in" period to build trust and routine.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Week 1: Short 1-hour sessions with parent nearby.",
            "Week 1: 2-3 hour stays including one meal.",
            "Week 2: Half-days including nap time.",
            "Week 2: Full trial run with work drop-off routine."
          ].map((item, i) => (
            <div key={i} className="flex gap-3 text-xs font-medium text-slate-600 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
              <CheckCircle2 size={14} className="text-blue-400 shrink-0" /> {item}
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-50 p-2.5 rounded-xl text-amber-500"><Lightbulb size={20} /></div>
            <h3 className="text-lg font-bold text-slate-800">Routine practice</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">Don't let day one be your first practice run. Start waking up at your "work time" a week early to practise the morning logistics.</p>
          <ul className="text-xs space-y-2 text-slate-600">
            <li className="flex gap-2 font-medium"><span>•</span> Prep bags and outfits the night before.</li>
            <li className="flex gap-2 font-medium"><span>•</span> Aim to leave 15 mins earlier than necessary during practice.</li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500"><Coffee size={20} /></div>
            <h3 className="text-lg font-bold text-slate-800">Feeding transition</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">If breastfeeding, start introducing bottles and building a frozen stash 3-4 weeks before your return date.</p>
          <div className="p-3 bg-blue-50 rounded-xl text-[10px] font-bold text-blue-700 uppercase tracking-[0.1em] text-center border border-blue-100">
            Speak to your employer about lactation breaks early
          </div>
        </div>
      </div>

      {/* Before you return to work - New Integrated Section */}
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500"><Baby size={20} /></div>
          <h3 className="text-lg font-bold text-slate-800">Before you return to work</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {visibleTips.map((tip, i) => (
            <div key={i} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100/50 hover:bg-white hover:border-blue-100 transition-all group">
              <h4 className="text-[13px] font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{tip.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{tip.text}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-2">
          <button 
            onClick={() => setShowAllTips(!showAllTips)}
            className="flex items-center gap-2 text-[11px] font-bold text-blue-500 uppercase tracking-widest hover:text-blue-700 transition-colors"
          >
            {showAllTips ? <>Show fewer tips <ChevronUp size={14} /></> : <>Show all tips <ChevronDown size={14} /></>}
          </button>
        </div>
        
        {/* Reassurance Footer */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium italic">
            "You don't need everything perfect — you just need a starting point."
          </p>
        </div>
      </div>
    </div>
  );
};

const DuringTransitionPhase = () => {
  const [showAllTips, setShowAllTips] = useState(false);
  
  const allTips = [
    { title: "Start smaller than you think", text: "A phased return or shorter days at first can make a big difference." },
    { title: "Expect mixed emotions", text: "Feeling excited, sad, relieved, or guilty — sometimes all at once — is normal." },
    { title: "Do a practice run", text: "Try your full morning routine before day one to spot pressure points early." },
    { title: "Lower the bar temporarily", text: "This is not the time for peak performance — at work or at home." },
    { title: "Build in recovery time", text: "Avoid packing evenings or weekends during the first few weeks." },
    { title: "Keep communication open", text: "Check in with your manager early if something isn't working." },
    { title: "Plan for the first illness", text: "It usually happens sooner than expected. Knowing your backup plan helps." },
    { title: "Focus on one thing at work", text: "Prioritise visibility and clarity over doing everything at once." },
    { title: "Trust the settling process", text: "Some days will be harder than others — progress isn't linear." },
    { title: "Give it time", text: "Most parents say it feels easier after a few weeks, even if it doesn't at first." }
  ];

  const visibleTips = showAllTips ? allTips : allTips.slice(0, 6);

  return (
    <div className="grid gap-6">
      {/* KIT day tracker - Subtle redesign */}
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-blue-600 w-1.5 h-1.5 rounded-full"></div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Legal entitlement</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Keep-in-touch (KIT) tracker</h3>
            <p className="text-slate-400 text-sm font-medium">UK law allows up to 10 KIT days. Use them to bridge the gap smoothly.</p>
          </div>
          <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
            <span className="text-2xl font-bold text-slate-800">10</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Days available</span>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Check-in", desc: "Lunch or coffee with the team." },
            { label: "Tech-ready", desc: "Reset passwords and get tech setup." },
            { label: "Handover", desc: "Briefing with your maternity cover." },
            { label: "Strategy", desc: "Attend a business planning session." }
          ].map((item, i) => (
            <div key={i} className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl group hover:border-blue-200 transition-colors">
              <h4 className="font-bold text-slate-800 text-xs mb-1 group-hover:text-blue-600 transition-colors">{item.label}</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Communication toolkit */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500"><Mail size={20} /></div>
          <h3 className="text-lg font-bold text-slate-800">Employer toolkit</h3>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 relative group">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Template: Phased return proposal</p>
          <code className="text-xs text-slate-600 block leading-relaxed italic pr-12">
            "I am writing to propose a phased return to work starting [Date]. I would like to suggest working adjusted hours for the first fortnight to ensure a smooth transition for my child and to facilitate my full re-integration into the team..."
          </code>
          <button 
            onClick={() => navigator.clipboard.writeText("I am writing to propose a phased return to work starting...")}
            className="absolute top-6 right-6 p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all shadow-sm"
            title="Copy template"
          >
            <ClipboardList size={14} />
          </button>
        </div>
      </div>

      {/* Extra transition tips */}
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-500"><Lightbulb size={20} /></div>
          <h3 className="text-lg font-bold text-slate-800">Extra tips for your transition</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {visibleTips.map((tip, i) => (
            <div key={i} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100/50 hover:bg-white hover:border-indigo-100 transition-all group">
              <h4 className="text-[13px] font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{tip.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">{tip.text}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-2">
          <button 
            onClick={() => setShowAllTips(!showAllTips)}
            className="flex items-center gap-2 text-[11px] font-bold text-indigo-500 uppercase tracking-widest hover:text-indigo-700 transition-colors"
          >
            {showAllTips ? <>Show fewer tips <ChevronUp size={14} /></> : <>Show all tips <ChevronDown size={14} /></>}
          </button>
        </div>
        
        {/* Reassurance Footer */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium italic">
            "If this feels harder than expected, you're not doing anything wrong."
          </p>
        </div>
      </div>

      <div className="bg-pink-50 p-8 rounded-3xl border border-pink-100 flex items-start gap-4">
        <div className="bg-pink-100 p-2.5 rounded-xl text-pink-600"><Heart size={20} /></div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-pink-900">Emotional readiness</h3>
          <p className="text-sm text-pink-700 leading-relaxed font-medium">It is entirely normal to feel a mix of guilt and anxiety. Focus on the positive "transition" for your family. Surround yourself with peer support groups like local NCT branches or baby hubs.</p>
        </div>
      </div>
    </div>
  );
};

const AfterReturnPhase = () => (
  <div className="grid gap-8">
    {/* Timeline nudges - Progressive UX */}
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-10">
        <Zap className="text-blue-500" size={20} />
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Timeline nudges</h3>
      </div>
      
      <div className="space-y-12 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
        {[
          {
            time: "Week 1–2",
            title: "Expect tiredness",
            tips: [
              "Keep your home expectations light—prioritise rest.",
              "Focus purely on the settling-in process.",
              "Don't worry if your brain feels a little 'foggy' initially."
            ]
          },
          {
            time: "Week 3–4",
            title: "Review childcare and routines",
            tips: [
              "Is the drop-off time working for everyone?",
              "Assess if your work patterns need minor adjustments.",
              "Confirm if your child's sleep has settled after the shift."
            ]
          },
          {
            time: "After month 1",
            title: "Check what's working long term",
            tips: [
              "Discuss a more permanent schedule with your employer if needed.",
              "Reflect on your own wellbeing and work-life balance.",
              "Plan any changes to your financial budget now that costs are real."
            ]
          }
        ].map((step, i) => (
          <div key={i} className="relative pl-12 group">
            <div className="absolute left-0 top-1 w-8 h-8 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center group-hover:border-blue-400 transition-colors z-10 shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">{step.time}</span>
                <h4 className="text-xl font-bold text-slate-800 mt-1">{step.title}</h4>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {step.tips.map((tip, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 text-xs text-slate-500 font-medium leading-relaxed hover:bg-white hover:border-blue-100 transition-all">
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Backup care template */}
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-red-50 p-2.5 rounded-xl text-red-500"><ShieldAlert size={20} /></div>
        <h3 className="text-lg font-bold text-slate-800">Backup care plan</h3>
      </div>
      <p className="text-sm text-slate-500 font-medium">The "plan B" is the secret to staying calm when nursery sickness inevitably happens. Document these three things now.</p>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Users, label: "Emergency contact", val: "Family / Close friend" },
          { icon: Briefcase, label: "Work policy", val: "Family emergency leave" },
          { icon: RefreshCw, label: "Alternative care", val: "Reliable babysitter" }
        ].map((item, i) => (
          <div key={i} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 text-center space-y-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto text-slate-400 shadow-sm"><item.icon size={16} /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-xs font-bold text-slate-700 mt-1">{item.val}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TipsView;
