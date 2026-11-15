export const Feature = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-line/80 bg-white/70 px-4 py-2.5 shadow-soft backdrop-blur">
      <Check />
      <div className="flex flex-wrap items-baseline gap-x-1.5 text-sm">
        <span className="font-semibold text-ink">{title}</span>
        <span className="text-muted">{subtitle}</span>
      </div>
    </div>
  );
};

function Check() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="size-5 shrink-0 text-brand"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}
