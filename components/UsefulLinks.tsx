
import React from 'react';
import { ExternalLink, Info, Link as LinkIcon, ChevronRight } from 'lucide-react';

const usefulLinks = [
  {
    title: "Tax-free childcare",
    desc: "Official GOV.UK guide explaining how parents and the government can top up a childcare account to pay for approved childcare.",
    url: "https://www.gov.uk/help-with-childcare-costs/tax-free-childcare",
    tag: "Funding"
  },
  {
    title: "Childcare grant (for students)",
    desc: "Information about the childcare grant that helps eligible students pay for childcare while studying.",
    url: "https://www.gov.uk/childcare-grant/what-youll-get",
    tag: "Education"
  },
  {
    title: "15 hours free childcare for 3–4-year-olds",
    desc: "Details of the government’s free childcare entitlement for children aged 3 and 4, and how it works.",
    url: "https://www.gov.uk/help-with-childcare-costs/free-childcare-and-education-for-3-to-4-year-olds",
    tag: "Universal"
  },
  {
    title: "Free childcare for 2-year-olds (extra support)",
    desc: "Official page on how some 2-year-olds can get free childcare if parents meet certain criteria.",
    url: "https://www.gov.uk/help-with-childcare-costs/free-childcare-2-year-olds-extra-support",
    tag: "Support"
  },
  {
    title: "Universal credit and childcare",
    desc: "How to claim back up to 85% of your childcare costs if you are working and eligible for Universal Credit.",
    url: "https://www.gov.uk/help-with-childcare-costs/universal-credit",
    tag: "Benefits"
  },
  {
    title: "Childcare guide: best start in life",
    desc: "A comprehensive guide on multiple support options — free hours, Tax-Free Childcare, and other support for your child's early years.",
    url: "https://beststartinlife.gov.uk",
    tag: "Guide"
  }
];

const UsefulLinks: React.FC = () => {
  return (
    <section className="space-y-8 px-2 mt-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-blue-400" />
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Resources</h3>
          </div>
          <h4 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            Government-provided childcare support & funding
          </h4>
        </div>
        <p className="text-xs text-slate-400 font-medium max-w-xs md:text-right">
          Official resources to help you navigate the financial side of returning to work.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {usefulLinks.map((link, i) => (
          <a 
            key={i}
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {link.tag}
                </span>
                <ExternalLink size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <h5 className="text-[15px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                  {link.title}
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {link.desc}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-[10px] font-bold text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
              Visit official guide <ChevronRight size={12} />
            </div>
          </a>
        ))}
        
        {/* Placeholder for visual balance removed as we now have an even number (6) */}
      </div>
    </section>
  );
};

export default UsefulLinks;
