import React, { useState } from 'react';
import { X, CheckCircle, User, Shield, Save } from 'lucide-react';
import { StudentUser, setStudentUser } from '../lib/storage';

interface CadetProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  cadet: StudentUser;
  onUpdated: (updated: StudentUser) => void;
}

export const CadetProfileModal: React.FC<CadetProfileModalProps> = ({
  isOpen,
  onClose,
  cadet,
  onUpdated,
}) => {
  const [formData, setFormData] = useState({
    fullName: cadet.fullName,
    email: cadet.email,
    mobile: cadet.mobile,
    defenceEntry: cadet.defenceEntry,
    educationLevel: cadet.educationLevel,
    previousSsbExperience: cadet.previousSsbExperience,
    city: cadet.city || 'Gwalior',
    state: cadet.state || 'Madhya Pradesh',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudentUser = {
      ...cadet,
      ...formData,
      lastLoginAt: new Date().toISOString(),
    };
    setStudentUser(updated);
    onUpdated(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-1/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-cream-2 border border-tactical-2 rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-dossier relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-ink-3 hover:text-ink p-1 rounded"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <div className="flex items-center space-x-2 text-gold font-mono text-xs uppercase tracking-widest mb-1">
            <Shield size={14} />
            <span>CADET DOSSIER // {cadet.studentCode}</span>
          </div>
          <h2 className="text-2xl font-bold text-ink">Edit Candidate Profile</h2>
          <p className="text-xs text-ink-3 mt-1">
            Update your officer aspirational goals, contact details, and target defence entry.
          </p>
        </div>

        {savedSuccess && (
          <div className="mb-4 p-3 bg-olive/15 border border-olive/30 text-olive rounded text-xs font-bold flex items-center space-x-2">
            <CheckCircle size={15} />
            <span>Profile dossier saved and synchronized successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                Cadet ID (Assigned)
              </label>
              <input
                type="text"
                disabled
                value={cadet.studentCode}
                className="w-full px-3.5 py-2.5 bg-cream-3 border border-tactical rounded text-xs font-mono font-bold text-ink cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                Target Defence Entry
              </label>
              <select
                value={formData.defenceEntry}
                onChange={(e) => setFormData({ ...formData, defenceEntry: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
              >
                <option value="NDA (National Defence Academy)">NDA (National Defence Academy)</option>
                <option value="CDS (Combined Defence Services)">CDS (Combined Defence Services)</option>
                <option value="AFCAT (Air Force Common Admission)">AFCAT (Air Force Common Admission)</option>
                <option value="OTA (Officers Training Academy)">OTA (Officers Training Academy)</option>
                <option value="INET (Indian Naval Entrance)">INET (Indian Naval Entrance)</option>
                <option value="CAPF (Assistant Commandant)">CAPF (Assistant Commandant)</option>
                <option value="Direct Entry / TGC / SSC Tech">Direct Entry / TGC / SSC Tech</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                Education Level
              </label>
              <select
                value={formData.educationLevel}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
              >
                <option value="Class 11">Class 11 (School Foundation)</option>
                <option value="Class 12">Class 12 (Board Appearing)</option>
                <option value="Undergraduate">Undergraduate (College Pursuing)</option>
                <option value="Graduate">Graduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="sm:col-span-1">
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                SSB History
              </label>
              <select
                value={formData.previousSsbExperience}
                onChange={(e) => setFormData({ ...formData, previousSsbExperience: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-xs text-ink focus:outline-none focus:border-gold"
              >
                <option value="First Time (Fresher)">Fresher</option>
                <option value="Screened Out Candidate">Screened Out</option>
                <option value="Conference Out Candidate">Conference Out</option>
                <option value="Previously Recommended">Recommended</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-ink-2 mb-1 font-bold">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-cream-1 border border-tactical-2 rounded text-sm text-ink focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="pt-3 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-cream-3 hover:bg-cream-4 text-ink font-mono text-xs font-bold uppercase rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-navy-1 hover:bg-navy-3 text-cream-1 font-mono text-xs font-bold uppercase rounded transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <Save size={15} className="text-gold" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
