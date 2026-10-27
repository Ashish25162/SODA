import React from 'react';

export default function PathEditorial({ onOpenBriefing }) {
  const steps = [
    {
      n: '// 01',
      title: 'Enquire',
      desc: "One call. We listen to where you are, what exam you're aiming for, and what's realistic for your age and academic stream."
    },
    {
      n: '// 02',
      title: 'Assess',
      desc: "A diagnostic assessment on academics, fitness baseline and military aptitude — so the roadmap fits you, not a generic brochure."
    },
    {
      n: '// 03',
      title: 'Train',
      desc: "Comprehensive UPSC syllabus mastery, daily current affairs analysis, physical conditioning and strict military daily routines."
    },
    {
      n: '// 04',
      title: 'Simulate',
      desc: "Full 5-day SSB simulation on our outdoor GTO ground in Gwalior — psychology dossier, obstacle tasks, and 1-on-1 officer interview."
    },
    {
      n: '// 05',
      title: 'Serve',
      desc: "You walk into the Services Selection Board with authentic composure. And then you walk out recommended in uniform."
    }
  ];

  return (
    <section className="section-editorial section--light" id="path">
      <div className="container-custom">
        
        {/* Section Head */}
        <div className="section-head-custom">
          <p className="label-tactical">06 — The Path</p>
          <h2>From enquiry<br />to commission.</h2>
        </div>

        {/* 5-Step Horizontal Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6 mt-14">
          {steps.map((step, idx) => (
            <div key={idx} className="journey-step">
              <div className="n">{step.n}</div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
