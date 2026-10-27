import React from 'react';
import { MapPin, Phone, Smartphone, MessageCircle } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-[#0A192F] text-slate-300 text-xs border-b border-slate-800 py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left: Address and Phone */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-slate-300">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>MLB Colony, Padav, Gwalior (Near Miss Hills School)</span>
          </div>
          <span className="hidden md:inline text-slate-700">|</span>
          <a
            href="tel:+918433247664"
            className="flex items-center gap-1.5 hover:text-amber-400 font-medium transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>+91 84332 47664</span>
          </a>
        </div>

        {/* Right: Android App & WhatsApp */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/918433247664?text=Hi%20SODA,%20I%20want%20to%20know%20more%20about%20defence%20coaching%20batches."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp Us</span>
          </a>
          <span className="text-slate-700">|</span>
          <a
            href="https://play.google.com/store/apps/details?id=com.ajmyig.nfiuah"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 px-2.5 py-1 rounded-md border border-slate-700 transition-all font-medium"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Download Official Android App</span>
          </a>
        </div>
      </div>
    </div>
  );
}
