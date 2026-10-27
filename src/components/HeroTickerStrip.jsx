import React from 'react';
import { Shield, Sparkles, Award, Anchor, Target, Users } from 'lucide-react';

export default function HeroTickerStrip({ onOpenCounseling }) {
  const tickerItems = [
    { text: "NDA & CDS New Batch Admissions Open in Gwalior", icon: "⚓", highlight: "ADMISSIONS OPEN" },
    { text: "1-on-1 SSB Dossier Assessment by Ex-Indian Navy Officer Lt. Bharadwaj", icon: "🎯", highlight: "FLAGSHIP MENTORSHIP" },
    { text: "Dedicated Outdoor GTO Ground in Padav, Gwalior (PGT, HGT, Obstacles)", icon: "🏋️", highlight: "REAL OBSTACLES" },
    { text: "4.9★ Google Rating — 150+ Verified Cadet Reviews", icon: "⭐", highlight: "TOP RATED" },
    { text: "AFCAT 2027 Air Force Wing High-Scoring Preparation", icon: "✈️", highlight: "NEW BATCH" },
    { text: "11th & 12th Foundation Course with Integrated NDA Mentorship", icon: "🎖️", highlight: "EARLY STARTER" }
  ];

  return (
    <div className="relative bg-[#060E1E] text-slate-200 border-y border-amber-500/20 py-2.5 overflow-hidden z-20 shadow-md">
      {/* Subtle glowing edge lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>

      <div className="flex items-center overflow-hidden">
        {/* Animated Infinite Marquee Ticker */}
        <div className="animate-ticker flex items-center whitespace-nowrap">
          {/* First loop */}
          {tickerItems.map((item, idx) => (
            <div key={`a-${idx}`} className="inline-flex items-center gap-2.5 mx-6 text-xs sm:text-sm font-medium">
              <span className="text-base">{item.icon}</span>
              <span className="bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wider border border-amber-500/30">
                {item.highlight}
              </span>
              <span className="text-slate-300 hover:text-white transition-colors cursor-pointer" onClick={() => onOpenCounseling(item.text)}>
                {item.text}
              </span>
              <span className="text-slate-700 ml-4">•</span>
            </div>
          ))}

          {/* Second duplicate loop for seamless continuous scrolling */}
          {tickerItems.map((item, idx) => (
            <div key={`b-${idx}`} className="inline-flex items-center gap-2.5 mx-6 text-xs sm:text-sm font-medium">
              <span className="text-base">{item.icon}</span>
              <span className="bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wider border border-amber-500/30">
                {item.highlight}
              </span>
              <span className="text-slate-300 hover:text-white transition-colors cursor-pointer" onClick={() => onOpenCounseling(item.text)}>
                {item.text}
              </span>
              <span className="text-slate-700 ml-4">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
