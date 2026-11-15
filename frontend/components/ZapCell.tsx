"use client";

export const ZapCell = ({
  name,
  index,
  onClick,
  image,
  kind = "action",
}: {
  name?: string;
  index: number;
  onClick: () => void;
  image?: string;
  kind?: "trigger" | "action";
}) => {
  const isConfigured = Boolean(name && name !== "Trigger" && name !== "Action");
  const accent =
    kind === "trigger"
      ? "from-orange-500/15 to-amber-200/20 border-brand/40"
      : "from-sky-500/10 to-emerald-200/20 border-ink/15";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex w-[340px] items-center gap-4 rounded-2xl border bg-gradient-to-br ${accent} bg-white px-5 py-5 text-left shadow-soft transition hover:-translate-y-1 hover:border-brand hover:shadow-glow`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white shadow-sm">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name || kind} className="h-8 w-8 object-contain" />
        ) : (
          <span className="font-display text-lg font-bold text-brand">
            {kind === "trigger" ? "⚡" : "➜"}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-md bg-ink/5 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
            {kind === "trigger" ? "Trigger" : "Action"} {index}
          </span>
          {isConfigured ? (
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              Ready
            </span>
          ) : (
            <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
              Choose
            </span>
          )}
        </div>
        <div className="truncate font-display text-lg font-semibold text-ink">
          {isConfigured ? name : kind === "trigger" ? "Select a trigger" : "Select an action"}
        </div>
        <div className="text-sm text-muted">
          {isConfigured
            ? "Click to change this step"
            : kind === "trigger"
              ? "What starts this Zap?"
              : "What should happen next?"}
        </div>
      </div>

      <div className="text-muted transition group-hover:text-brand">›</div>
    </button>
  );
};

export const NodeConnector = () => {
  return (
    <div className="flex flex-col items-center py-2">
      <div className="h-8 w-px bg-gradient-to-b from-brand/70 to-ink/20" />
      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-brand/40 bg-white text-[10px] font-bold text-brand shadow-sm">
        ●
      </div>
      <div className="h-8 w-px bg-gradient-to-b from-ink/20 to-brand/70" />
    </div>
  );
};
