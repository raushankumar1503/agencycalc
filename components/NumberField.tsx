"use client";

export interface NumberFieldProps {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  helper?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  error?: string | null;
}

export default function NumberField({
  id,
  name,
  label,
  required,
  helper,
  placeholder,
  value,
  onChange,
  suffix,
  error,
}: NumberFieldProps) {
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : helper ? helperId : undefined;

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="ml-0.5 text-red-600" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`field-input ${suffix ? "pr-10" : ""} ${
            error ? "border-red-500 focus:border-red-500" : ""
          }`}
        />
        {suffix && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-neutral-500"
          >
            {suffix}
          </span>
        )}
      </div>
      {helper && (
        <p id={helperId} className="field-helper">
          {helper}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}