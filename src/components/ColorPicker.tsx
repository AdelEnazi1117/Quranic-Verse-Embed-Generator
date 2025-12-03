"use client";

import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeDropper } from "@fortawesome/free-solid-svg-icons";
import type { ColorPreset } from "@/types";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  presets: ColorPreset[];
  getColorName: (name: string) => string;
  label: string;
  customColorLabel: string;
}

export default function ColorPicker({
  value,
  onChange,
  presets,
  getColorName,
  label,
  customColorLabel,
}: ColorPickerProps) {
  const [hexInput, setHexInput] = useState(value);
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Sync hex input with value
  useEffect(() => {
    setHexInput(value);
  }, [value]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let hex = e.target.value;
    setHexInput(hex);

    // Validate and update if valid hex
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(hex);
    } else if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(`#${hex}`);
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setHexInput(color);
    onChange(color);
  };

  const isLightColor = (hexColor: string): boolean => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 180;
  };

  return (
    <div className="mb-5">
      {label && <span className="text-sm text-navy-400 block mb-3">{label}</span>}

      {/* Color Presets */}
      <div className="flex flex-wrap gap-2 mb-3">
        {presets.map((color) => (
          <button
            key={color.value}
            onClick={() => onChange(color.value)}
            className={`color-swatch ${value === color.value ? "active" : ""}`}
            style={{
              backgroundColor: color.value,
              border: isLightColor(color.value) ? "2px solid #374151" : undefined,
              boxShadow: value === color.value ? `0 0 0 2px ${color.value}` : undefined,
            }}
            title={getColorName(color.name)}
          />
        ))}
      </div>

      {/* Custom Color Button + Hex Input Row */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => colorInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2 text-xs text-navy-400 bg-navy-800 border border-navy-700 rounded-md hover:border-navy-600 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faEyeDropper} className="w-3.5 h-3.5" />
          {customColorLabel}
        </button>

        {/* Hidden native color picker */}
        <input
          ref={colorInputRef}
          type="color"
          value={value}
          onChange={handleColorPickerChange}
          className="sr-only"
        />

        <div
          className="w-8 h-8 rounded-md border border-navy-600 flex-shrink-0"
          style={{ backgroundColor: value }}
        />

        <input
          type="text"
          value={hexInput}
          onChange={handleHexChange}
          placeholder="#f97316"
          className="flex-1 px-3 py-2 bg-navy-800 border border-navy-700 rounded-md text-white text-sm font-mono placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
        />
      </div>
    </div>
  );
}
