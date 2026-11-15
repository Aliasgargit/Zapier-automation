"use client";

export const Input = ({
  label,
  placeholder,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
  type?: "text" | "password";
}) => {
  return (
    <div>
      <div className="pb-1.5 pt-3 text-sm font-medium text-ink">
        <span className="text-brand">*</span> <label>{label}</label>
      </div>
      <input
        className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
