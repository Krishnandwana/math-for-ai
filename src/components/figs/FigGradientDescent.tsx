import FigFrame from "@/components/figs/FigFrame";

export default function FigGradientDescent() {
  return (
    <FigFrame number="001" caption="Gradient descent: each step moves against the gradient, toward the minimum.">
      <svg viewBox="0 0 200 120" className="h-full w-full max-w-[220px]" fill="none" aria-hidden="true">
        <path
          d="M10 100 Q 60 -10 100 100 Q 140 -10 190 100"
          stroke="#E4E3DC"
          strokeWidth="2"
          opacity="0.5"
        />
        <path d="M20 95 Q 100 5 180 95" stroke="#1F7A4D" strokeWidth="1.5" opacity="0.35" />
        <circle cx="34" cy="72" r="3.5" fill="#1F7A4D" />
        <circle cx="55" cy="46" r="3.5" fill="#1F7A4D" />
        <circle cx="78" cy="24" r="3.5" fill="#1F7A4D" />
        <circle cx="100" cy="14" r="4" fill="#1F7A4D" />
        <path d="M34 72 L55 46" stroke="#1F7A4D" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M55 46 L78 24" stroke="#1F7A4D" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M78 24 L100 14" stroke="#1F7A4D" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#1F7A4D" />
          </marker>
        </defs>
      </svg>
    </FigFrame>
  );
}
