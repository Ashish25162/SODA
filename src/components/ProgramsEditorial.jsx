import React from 'react';
import { coursesData } from '../data/coursesData';

export default function ProgramsEditorial({ onViewSyllabus, onOpenBriefing }) {
  const programsList = [
    {
      num: '01',
      title: 'NDA Foundation',
      brief: 'Academics and SSB grooming from the ground up — for aspirants entering after Class 10.',
      duration: '3 Years',
      eligibility: 'After Class 10',
      courseId: 'foundation',
    },
    {
      num: '02',
      title: 'NDA Crash',
      brief: 'High-intensity written preparation with weekly SSB simulations for final-year aspirants.',
      duration: '6–11 Mo',
      eligibility: 'After Class 12',
      courseId: 'nda',
    },
    {
      num: '03',
      title: 'CDS',
      brief: 'UPSC-grade syllabus for IMA, INA, AFA and OTA entries for graduating students.',
      duration: 'Graduates',
      eligibility: 'IMA · OTA · INA',
      courseId: 'cds',
    },
    {
      num: '04',
      title: 'AFCAT',
      brief: 'Targeted preparation for Flying and Ground Duty branches of the Indian Air Force.',
      duration: 'Graduates',
      eligibility: 'Flying & Ground',
      courseId: 'afcat',
    },
    {
      num: '05',
      title: 'CAPF',
      brief: 'Written, physical and interview preparation for Assistant Commandant entry (BSF/CRPF/CISF).',
      duration: 'Graduates',
      eligibility: 'Central Armed Police',
      courseId: 'capf',
    },
    {
      num: '06',
      title: 'SSB Interview',
      brief: 'A full five-day simulation — psychology, GTO tasks on obstacle grounds, personal interview, group discussion.',
      duration: 'All Entries',
      eligibility: '5-Day Simulation',
      courseId: 'ssb',
    },
  ];

  const handleProgramClick = (prog) => {
    const courseObj = coursesData.find((c) => c.id === prog.courseId) || coursesData[0];
    onViewSyllabus(courseObj);
  };

  return (
    <section className="section section--alt" id="programs">
      <div className="wrap">

        {/* Head */}
        <div className="programs-head">
          <div className="head">
            <p className="eyebrow">02 — Programs</p>
            <h2>The curriculum, <em>sequenced.</em></h2>
          </div>
          <div className="programs-count">
            <strong>06</strong> Programs · <strong>1</strong> Standard
          </div>
        </div>

        {/* List */}
        <div className="program-list" role="list">
          {programsList.map((prog) => (
            <div
              key={prog.num}
              onClick={() => handleProgramClick(prog)}
              className="program"
              role="listitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleProgramClick(prog);
                }
              }}
            >
              <span className="program-num">{prog.num}</span>
              <h3 className="program-title">{prog.title}</h3>
              <p className="program-brief">{prog.brief}</p>
              <div className="program-meta">
                <strong>{prog.duration}</strong>
                {prog.eligibility}
              </div>
              <span className="program-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </span>
            </div>
          ))}
        </div>

        {/* The Path — Enquiry to Commission */}
        <div className="path-band">
          <h3>The Path — Enquiry to Commission</h3>
          <div className="path-steps">
            <div className="path-step">
              <div className="n">// 01</div>
              <h4>Enquire</h4>
              <p>One call. We listen to your background first.</p>
            </div>
            <div className="path-step">
              <div className="n">// 02</div>
              <h4>Assess</h4>
              <p>Diagnostic evaluation, not an admission brochure.</p>
            </div>
            <div className="path-step">
              <div className="n">// 03</div>
              <h4>Train</h4>
              <p>Rigorous academics, physicals and military routine.</p>
            </div>
            <div className="path-step">
              <div className="n">// 04</div>
              <h4>Simulate</h4>
              <p>SSB psychology & GTO, run like the real board.</p>
            </div>
            <div className="path-step">
              <div className="n">// 05</div>
              <h4>Serve</h4>
              <p>You earn your stars and step forward in uniform.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
