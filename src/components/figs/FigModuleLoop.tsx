import FigFrame from "@/components/figs/FigFrame";

const STEPS = [
  { label: "Theory", x: 100, y: 16, dx: 0, dy: -12, anchor: "middle" as const },
  { label: "Math", x: 176, y: 70, dx: 10, dy: 4, anchor: "start" as const },
  { label: "Worked Ex.", x: 100, y: 124, dx: 0, dy: 20, anchor: "middle" as const },
  { label: "Your Turn", x: 24, y: 70, dx: -10, dy: 4, anchor: "end" as const },
];

export default function FigModuleLoop() {
  return (
    <FigFrame
      number="002"
      caption="Every module runs the same loop: theory, math, a worked example, then prove it yourself."
    >
      <svg viewBox="-45 0 290 140" className="h-full w-full max-w-[300px]" fill="none" aria-hidden="true">
        <circle cx="100" cy="70" r="52" stroke="#E4E3DC" strokeWidth="1.5" strokeDasharray="3 4" />
        {STEPS.map((step, i) => {
          const next = STEPS[(i + 1) % STEPS.length];
          return (
            <line
              key={`line-${step.label}`}
              x1={step.x}
              y1={step.y}
              x2={next.x}
              y2={next.y}
              stroke="#1F7A4D"
              strokeWidth="1.5"
              markerEnd="url(#loop-arrow)"
            />
          );
        })}
        {STEPS.map((step) => (
          <g key={step.label}>
            <circle cx={step.x} cy={step.y} r="5" fill="#FFFFFF" stroke="#1F7A4D" strokeWidth="2" />
            <text
              x={step.x + step.dx}
              y={step.y + step.dy}
              textAnchor={step.anchor}
              className="font-mono"
              fontSize="9"
              fill="#5B5B54"
            >
              {step.label}
            </text>
          </g>
        ))}
        <defs>
          <marker id="loop-arrow" markerWidth="7" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <path d="M0 0 L7 3.5 L0 7 Z" fill="#1F7A4D" />
          </marker>
        </defs>
      </svg>
    </FigFrame>
  );
}
