import type { QrFieldDefinition, QrFormValue } from "@/lib/qr-types";

type QrFieldProps = {
  field: QrFieldDefinition;
  value: QrFormValue;
  error?: string;
  onChange: (nextValue: QrFormValue) => void;
};

export function QrField({ field, value, error, onChange }: QrFieldProps) {
  const baseClassName =
    "w-full rounded-[1.35rem] border bg-white px-4 py-3 text-sm text-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition focus:border-[var(--brand)] focus:outline-none";
  const decoratedClassName = `${baseClassName} ${error ? "border-rose-300" : "border-[var(--border)]"}`;

  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-800">{field.label}</span>
        {field.helper ? <span className="text-xs text-slate-500">{field.helper}</span> : null}
      </div>

      {field.type === "textarea" ? (
        <textarea
          value={typeof value === "string" ? value : ""}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${decoratedClassName} resize-y`}
        />
      ) : null}

      {field.type === "select" ? (
        <select
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          className={decoratedClassName}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {field.type === "switch" ? (
        <button
          type="button"
          role="switch"
          aria-checked={Boolean(value)}
          onClick={() => onChange(!value)}
          className={`flex w-full items-center justify-between rounded-[1.35rem] border px-4 py-3 text-left shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition ${
            value
              ? "border-[var(--brand)] bg-[var(--brand-soft)] text-slate-900"
              : "border-[var(--border)] bg-white text-slate-700"
          }`}
        >
          <div>
            <span className="block text-sm font-medium">{field.placeholder ?? field.label}</span>
            {field.options?.[0]?.description ? (
              <span className="mt-1 block text-xs text-slate-500">{field.options[0].description}</span>
            ) : null}
          </div>
          <span
            className={`relative h-7 w-12 rounded-full transition ${
              value ? "bg-[var(--brand)]" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                value ? "left-6" : "left-1"
              }`}
            />
          </span>
        </button>
      ) : null}

      {!["textarea", "select", "switch"].includes(field.type) ? (
        <input
          type={field.type}
          value={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
          inputMode={field.inputMode}
          autoComplete={field.autoComplete}
          onChange={(event) => onChange(event.target.value)}
          className={decoratedClassName}
        />
      ) : null}

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </label>
  );
}
