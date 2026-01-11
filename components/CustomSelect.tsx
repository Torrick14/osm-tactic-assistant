
import React from 'react';

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: any) => void;
  icon?: React.ReactNode;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, onChange, icon }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-slate-100 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-4 py-3 text-slate-900 font-medium transition-all outline-none"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </div>
  );
};
