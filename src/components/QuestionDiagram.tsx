import React from 'react';

interface QuestionDiagramProps {
  type: string;
  label?: string;
}

export const QuestionDiagram: React.FC<QuestionDiagramProps> = ({ type, label }) => {
  const ink = '#0A1428';
  const gold = '#C9A961';
  const olive = '#5A7048';
  const bgCard = '#FAF6EE';
  const borderTone = '#E4DCCB';

  const renderContent = () => {
    switch (type) {
      case 'mirror_horizontal':
        return (
          <g>
            <rect x="220" y="55" width="200" height="90" fill="none" stroke={ink} strokeWidth="2" strokeDasharray="4 4" />
            <line x1="320" y1="45" x2="320" y2="155" stroke={gold} strokeWidth="2.5" strokeDasharray="3 3" />
            <text x="320" y="35" textAnchor="middle" fill={gold} fontSize="11" fontFamily="JetBrains Mono, monospace">
              MIRROR LINE (M-M')
            </text>
            <circle cx="270" cy="85" r="14" fill={olive} />
            <circle cx="270" cy="115" r="7" fill={ink} />
            <text x="370" y="105" textAnchor="middle" fill={ink} fontSize="28" fontWeight="bold">
              ?
            </text>
          </g>
        );

      case 'water_reflection':
        return (
          <g>
            <text x="320" y="32" textAnchor="middle" fill={ink} fontSize="11" fontFamily="JetBrains Mono, monospace">
              WATER REFLECTION PLANE
            </text>
            {/* Object above water */}
            <polygon points="300,90 320,50 340,90" fill={ink} />
            <circle cx="320" cy="65" r="4" fill={gold} />
            {/* Water line */}
            <line x1="200" y1="105" x2="440" y2="105" stroke={gold} strokeWidth="2" strokeDasharray="6 3" />
            <line x1="220" y1="110" x2="420" y2="110" stroke={gold} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
            {/* Reflection question mark */}
            <text x="320" y="148" textAnchor="middle" fill={olive} fontSize="26" fontWeight="bold">
              ?
            </text>
          </g>
        );

      case 'nonverbal_mirror':
        return (
          <g>
            <line x1="320" y1="35" x2="320" y2="155" stroke={gold} strokeWidth="2" strokeDasharray="5 3" />
            <path d="M 250,60 L 290,60 L 270,120 Z" fill={olive} />
            <rect x="245" y="100" width="15" height="15" fill={ink} />
            <text x="370" y="105" textAnchor="middle" fill={ink} fontSize="28" fontWeight="bold">
              ?
            </text>
          </g>
        );

      case 'nonverbal_water':
        return (
          <g>
            <line x1="200" y1="100" x2="440" y2="100" stroke={gold} strokeWidth="2.5" />
            <path d="M 280,50 L 320,85 L 360,50" fill="none" stroke={ink} strokeWidth="4" />
            <circle cx="320" cy="55" r="7" fill={olive} />
            <text x="320" y="145" textAnchor="middle" fill={gold} fontSize="28" fontWeight="bold">
              ?
            </text>
          </g>
        );

      case 'nonverbal_grid':
        return (
          <g>
            <text x="320" y="32" textAnchor="middle" fill={ink} fontSize="11" fontFamily="JetBrains Mono, monospace">
              PATTERN COMPLETION
            </text>
            <circle cx="260" cy="95" r="16" fill={ink} />
            <circle cx="320" cy="95" r="16" fill="none" stroke={gold} strokeWidth="3" />
            <circle cx="380" cy="95" r="16" fill={ink} />
            <text x="430" y="102" fill={gold} fontSize="24" fontWeight="bold">
              ?
            </text>
          </g>
        );

      case 'nonverbal_rotation':
      case 'rotation':
        return (
          <g>
            <text x="320" y="35" textAnchor="middle" fill={ink} fontSize="11" fontFamily="JetBrains Mono, monospace">
              ROTATE CLOCKWISE 90°
            </text>
            <polygon points="285,115 315,65 345,115" fill={olive} />
            <path d="M 390,110 A 50 50 0 0 0 390,70" fill="none" stroke={gold} strokeWidth="3.5" markerEnd="url(#arrow-gold)" />
          </g>
        );

      case 'nonverbal_sequence':
        return (
          <g>
            <text x="320" y="32" textAnchor="middle" fill={ink} fontSize="11" fontFamily="JetBrains Mono, monospace">
              ALTERNATING PROGRESSION
            </text>
            <rect x="210" y="70" width="45" height="45" fill="none" stroke={ink} strokeWidth="3" />
            <circle cx="295" cy="92" r="22" fill={olive} />
            <rect x="345" y="70" width="45" height="45" fill="none" stroke={ink} strokeWidth="3" />
            <text x="425" y="102" fill={gold} fontSize="28" fontWeight="bold">
              ?
            </text>
          </g>
        );

      case 'cube':
        return (
          <g>
            <text x="320" y="28" textAnchor="middle" fill={ink} fontSize="11" fontFamily="JetBrains Mono, monospace">
              UNFOLDED CUBE NET
            </text>
            {/* T-shape cube net */}
            <rect x="290" y="38" width="36" height="36" fill={bgCard} stroke={ink} strokeWidth="1.5" />
            <text x="308" y="60" textAnchor="middle" fill={ink} fontSize="12" fontWeight="bold">A</text>

            <rect x="254" y="74" width="36" height="36" fill={bgCard} stroke={ink} strokeWidth="1.5" />
            <text x="272" y="96" textAnchor="middle" fill={ink} fontSize="12" fontWeight="bold">B</text>

            <rect x="290" y="74" width="36" height="36" fill={bgCard} stroke={gold} strokeWidth="2" />
            <text x="308" y="96" textAnchor="middle" fill={gold} fontSize="12" fontWeight="bold">C</text>

            <rect x="326" y="74" width="36" height="36" fill={bgCard} stroke={ink} strokeWidth="1.5" />
            <text x="344" y="96" textAnchor="middle" fill={ink} fontSize="12" fontWeight="bold">D</text>

            <rect x="290" y="110" width="36" height="36" fill={bgCard} stroke={ink} strokeWidth="1.5" />
            <text x="308" y="132" textAnchor="middle" fill={ink} fontSize="12" fontWeight="bold">E</text>

            <rect x="290" y="146" width="36" height="36" fill={bgCard} stroke={ink} strokeWidth="1.5" />
            <text x="308" y="168" textAnchor="middle" fill={ink} fontSize="12" fontWeight="bold">F</text>
          </g>
        );

      case 'direction':
      case 'path':
        return (
          <g>
            <circle cx="320" cy="95" r="45" fill="none" stroke={borderTone} strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="320" y1="40" x2="320" y2="150" stroke={ink} strokeWidth="1.5" opacity="0.4" />
            <line x1="265" y1="95" x2="375" y2="95" stroke={ink} strokeWidth="1.5" opacity="0.4" />
            <text x="320" y="32" textAnchor="middle" fill={ink} fontSize="11" fontWeight="bold">N</text>
            <text x="388" y="99" textAnchor="middle" fill={ink} fontSize="11" fontWeight="bold">E</text>
            <text x="320" y="166" textAnchor="middle" fill={ink} fontSize="11" fontWeight="bold">S</text>
            <text x="252" y="99" textAnchor="middle" fill={ink} fontSize="11" fontWeight="bold">W</text>
            {/* Bearing vector */}
            <line x1="320" y1="95" x2="355" y2="60" stroke={gold} strokeWidth="3" markerEnd="url(#arrow-gold)" />
            <circle cx="320" cy="95" r="4" fill={olive} />
          </g>
        );

      case 'grid_rotation':
      case 'line_mirror':
      case 'arrow_rotation':
      case 'coordinate':
      default:
        return (
          <g>
            <rect x="260" y="55" width="120" height="80" rx="4" fill="none" stroke={ink} strokeWidth="2" />
            <line x1="320" y1="55" x2="320" y2="135" stroke={gold} strokeWidth="1.5" strokeDasharray="4 4" />
            <polygon points="280,95 295,75 305,95" fill={olive} />
            <circle cx="350" cy="95" r="10" fill={ink} />
            <text x="320" y="42" textAnchor="middle" fill={ink} fontSize="11" fontFamily="JetBrains Mono, monospace">
              SPATIAL ALIGNMENT // {type.toUpperCase().replace('_', ' ')}
            </text>
          </g>
        );
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-3 p-4 bg-cream-2 border border-tactical rounded-md shadow-sm">
      <svg
        viewBox="0 0 640 190"
        className="w-full max-w-[540px] h-[170px] select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="arrow-gold" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill={gold} />
          </marker>
        </defs>
        {renderContent()}
      </svg>
      {label && (
        <span className="text-[11px] font-mono text-ink-3 tracking-wider uppercase mt-1">
          {label}
        </span>
      )}
    </div>
  );
};
