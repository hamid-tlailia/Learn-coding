import type { Locale } from "@/i18n/config";

/** The Code Master mark: a gradient tile with </>, then the name. */
export function Logo({ size = "md", withName = true }: { locale?: Locale; size?: "md" | "xl"; withName?: boolean }) {
  const big = size === "xl";
  return (
    <span className="inline-flex items-center gap-2" dir="ltr" aria-label="Code Master">
      <span
        aria-hidden="true"
        className={`btn-grad grid place-items-center font-mono font-bold ${big ? "size-16 rounded-2xl text-2xl" : "size-9 rounded-xl text-sm"}`}
      >
        {"</>"}
      </span>
      {withName && (
        <span aria-hidden="true" className={`font-display font-bold leading-none ${big ? "text-4xl" : "text-base"}`}>
          Code <span className="text-grad">Master</span>
        </span>
      )}
    </span>
  );
}
