import FigFrame from "@/components/figs/FigFrame";

export default function FigMasteryCurve() {
  return (
    <FigFrame number="003" caption="Mastery compounds: each completed module raises the floor for the next.">
      <svg viewBox="0 0 200 120" className="h-full w-full max-w-[220px]" fill="none" aria-hidden="true">
        <line x1="18" y1="10" x2="18" y2="104" stroke="#E4E3DC" strokeWidth="1.5" />
        <line x1="18" y1="104" x2="190" y2="104" stroke="#E4E3DC" strokeWidth="1.5" />
        <path
          d="M18 100 L45 100 L45 84 L72 84 L72 66 L99 66 L99 52 L126 52 L126 36 L153 36 L153 24 L180 24"
          stroke="#1F7A4D"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="180" cy="24" r="3" fill="#1F7A4D" />
        <text x="18" y="116" fontSize="8" className="font-mono" fill="#5B5B54">
          modules completed
        </text>
        <text
          x="12"
          y="56"
          fontSize="8"
          className="font-mono"
          fill="#5B5B54"
          transform="rotate(-90 12 56)"
          textAnchor="middle"
        >
          mastery
        </text>
      </svg>
    </FigFrame>
  );
}
