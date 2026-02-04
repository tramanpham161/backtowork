
import React, { useState } from 'react';
import { 
  Coffee, Heart, RefreshCw, MessageSquare, ClipboardList, 
  Baby, Briefcase, Calendar, CheckCircle2, ShieldAlert, 
  Mail, Users, Zap, ExternalLink, Lightbulb, Info
} from 'lucide-react';

const TipsView: React.FC = () => {
  const [activePhase, setActivePhase] = useState<'before' | 'during' | 'after'>('before');

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Intro Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Return to Work Library</h2>
        <p className="text-slate-500 font-medium">Expert-backed guidance for the logistical, professional, and emotional transition back to the workplace.</p>
      </div>

      {/* Phase Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
          {[
            { id: 'before', label: 'Before Return', icon: Baby },
            { id: 'during', label: 'During Transition', icon: RefreshCw },
            { id: 'after', label: 'After Return', icon: Zap }
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

      {/* Content Area */}
      <div className="max-w-4xl mx-auto">
        {activePhase === 'before' && <BeforeReturnPhase />}
        {activePhase === 'during' && <DuringTransitionPhase />}
        {activePhase === 'after' && <AfterReturnPhase />}
      </div>

      {/* Localized Resources */}
      <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <Info className="text-blue-500" size={24} />
          <h3 className="text-xl font-bold text-slate-800">Localized Support Resources</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: "NCT Return to Work Guide", url: "https://www.nct.org.uk/information/life-parent/support-change/returning-work-after-maternity-leave", desc: "Peer-to-peer support and legal rights overview." },
            { title: "NHS Feeding Support", url: "https://www.nhs.uk/conditions/baby/breastfeeding-and-bottle-feeding/", desc: "Practical advice for feeding transitions." },
            { title: "Maternity Action", url: "https://maternityaction.org.uk/", desc: "Dedicated legal advice for workplace rights in the UK." },
            { title: "Family Rights Group", url: "https://frg.org.uk/", desc: "Support for managing family and work logistics." }
          ].map((res, i) => (
            <a key={i} href={res.url} target="_blank" className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all flex items-start justify-between group">
              <div>
                <h4 className="font-bold text-slate-800 group-hover:text-blue-600">{res.title}</h4>
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

const BeforeReturnPhase = () => (
  <div className="grid gap-6">
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500"><Calendar size={20} /></div>
        <h3 className="text-lg font-bold text-slate-800">Childcare Settling Planner</h3>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed">Guide your baby into childcare gradually. Most providers recommend a 1-2 week "settling-in" period.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          "Week 1: Short 1-hour sessions with parent nearby.",
          "Week 1: 2-3 hour stays including one meal.",
          "Week 2: Half-days including nap time.",
          "Week 2: Full trial run with work drop-off routine."
        ].map((item, i) => (
          <div key={i} className="flex gap-3 text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <CheckCircle2 size={14} className="text-blue-300 shrink-0" /> {item}
          </div>
        ))}
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-50 p-2.5 rounded-xl text-amber-500"><Lightbulb size={20} /></div>
          <h3 className="text-lg font-bold text-slate-800">Routine Practice</h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">Don't let Day One be your first practice run. Start waking up at your "work time" a week early and practice the morning logistics.</p>
        <ul className="text-xs space-y-2 text-slate-600">
          <li className="flex gap-2"><span>•</span> Prep bags and outfits the night before.</li>
          <li className="flex gap-2"><span>•</span> Aim to leave 15 mins earlier than necessary.</li>
        </ul>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500"><Coffee size={20} /></div>
          <h3 className="text-lg font-bold text-slate-800">Feeding Transition</h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">If breastfeeding, start introducing bottles and building a frozen stash 3-4 weeks before your return.</p>
        <div className="p-3 bg-blue-50 rounded-xl text-[11px] font-bold text-blue-700 uppercase tracking-wider text-center">
          Speak to your employer about lactation breaks
        </div>
      </div>
    </div>
  </div>
);

const DuringTransitionPhase = () => (
  <div className="grid gap-6">
    {/* KIT Day Tracker */}
    <div className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] text-white space-y-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold tracking-tight">Keep-In-Touch (KIT) Tracker</h3>
        <p className="text-slate-400 text-sm">UK Law allows up to 10 KIT days. Use them to bridge the gap without losing maternity pay.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: "Check-in Meeting", desc: "Meet your team for lunch or coffee." },
          { label: "Systems Access", desc: "Reset passwords and get tech-ready." },
          { label: "Handover Planning", desc: "Meet your cover to discuss current projects." },
          { label: "Strategy Session", desc: "Join a wider business update meeting." }
        ].map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
            <h4 className="font-bold text-blue-400 text-sm">{item.label}</h4>
            <p className="text-[11px] text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Communication Toolkit */}
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500"><Mail size={20} /></div>
        <h3 className="text-lg font-bold text-slate-800">Employer Toolkit</h3>
      </div>
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Template: Flexible Work Request</p>
        <code className="text-xs text-slate-600 block leading-relaxed italic">
          "I am writing to propose a phased return to work starting [Date]. I would like to suggest working [Hours] for the first 2 weeks to ensure a smooth transition for my child and to facilitate my full re-integration into the team..."
        </code>
        <button 
          onClick={() => navigator.clipboard.writeText("I am writing to propose a phased return to work starting...")}
          className="mt-4 text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1.5 hover:underline"
        >
          Copy template <ClipboardList size={12} />
        </button>
      </div>
    </div>

    <div className="bg-pink-50 p-8 rounded-3xl border border-pink-100 flex items-start gap-4">
      <div className="bg-pink-100 p-2.5 rounded-xl text-pink-600"><Heart size={20} /></div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-pink-900">Emotional Readiness</h3>
        <p className="text-sm text-pink-700 leading-relaxed font-medium">It's normal to feel guilt or anxiety. Focus on the positive "transition" rather than "leaving." Surround yourself with peer support groups like NCT or local baby hubs.</p>
      </div>
    </div>
  </div>
);

const AfterReturnPhase = () => (
  <div className="grid gap-6">
    {/* Backup Care Template */}
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-red-50 p-2.5 rounded-xl text-red-500"><ShieldAlert size={20} /></div>
        <h3 className="text-lg font-bold text-slate-800">Backup Care Plan</h3>
      </div>
      <p className="text-sm text-slate-500">The "Plan B" is the secret to staying calm when nursery sickness inevitably happens.</p>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Users, label: "Emergency Contact", val: "Family / Close Friend" },
          { icon: Briefcase, label: "Work Policy", val: "Family Emergency Leave" },
          { icon: RefreshCw, label: "Childcare Alternative", val: "Reliable Babysitter" }
        ].map((item, i) => (
          <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center space-y-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto text-slate-400"><item.icon size={16} /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-xs font-bold text-slate-700 mt-1">{item.val}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Post-Return Review */}
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500"><MessageSquare size={20} /></div>
        <h3 className="text-lg font-bold text-slate-800">The 4-Week Review</h3>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed">After 4 weeks, sit down and reflect. Does the schedule work? Are morning routines sustainable? Is the workload manageable?</p>
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed text-xs text-slate-500 font-medium leading-relaxed">
        <strong>Tip:</strong> If it's not working, speak up. Phased returns can often be extended, or hours adjusted further based on real-world experience.
      </div>
    </div>
  </div>
);

export default TipsView;
