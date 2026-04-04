type DemoFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "date" | "time" | "number";
  options?: string[];
  placeholder?: string;
};

export function DemoField({
  label,
  value,
  onChange,
  type = "text",
  options,
  placeholder,
}: DemoFieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {options ? (
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-[var(--brand)]"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-[var(--brand)]"
        />
      )}
    </label>
  );
}
