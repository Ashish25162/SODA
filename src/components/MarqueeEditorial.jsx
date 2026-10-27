import React from 'react';

export default function MarqueeEditorial() {
  const items = [
    'National Defence Academy',
    'Combined Defence Services',
    'Air Force Common Admission',
    'Central Armed Police Forces',
    'Services Selection Board',
    'Gwalior, Madhya Pradesh',
  ];

  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-item">
          {items.map((item, index) => (
            <span key={`m1-${index}`}>{item}</span>
          ))}
        </div>
        <div className="marquee-item" aria-hidden="true">
          {items.map((item, index) => (
            <span key={`m2-${index}`}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
