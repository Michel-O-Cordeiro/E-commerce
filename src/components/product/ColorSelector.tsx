"use client";

import type { ColorVariant } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Palette, Check } from "lucide-react";

interface ColorSelectorProps {
  colors: ColorVariant[];
  selectedColorName: string;
  onSelectColor: (colorName: string) => void;
}

export default function ColorSelector({
  colors,
  selectedColorName,
  onSelectColor,
}: ColorSelectorProps) {
  if (!colors || colors.length === 0) return null;
  
  const selectedColorDetails = colors.find(c => c.name === selectedColorName);

  return (
    <div className="space-y-3">
      <Label htmlFor="color-selector" className="text-base font-semibold flex items-center gap-2">
        <Palette className="w-5 h-5 text-primary" />
        Cor: <span className="text-muted-foreground font-normal">{selectedColorDetails?.name || ''}</span>
      </Label>
      <RadioGroup
        id="color-selector"
        value={selectedColorName}
        onValueChange={onSelectColor}
        className="flex flex-wrap gap-3"
      >
        {colors.map((color) => (
          <Label
            key={color.name}
            htmlFor={`color-${color.name}`}
            title={color.name}
            className={cn(
              "relative flex items-center justify-center cursor-pointer rounded-full border-2 w-10 h-10 transition-all duration-200 ease-in-out",
              "hover:opacity-80 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring",
              selectedColorName === color.name
                ? "ring-2 ring-offset-2 ring-primary shadow-md"
                : "border-border",
              color.className // This applies the background color
            )}
            style={{ backgroundColor: color.hex !== 'className' ? color.hex : undefined }}
          >
            <RadioGroupItem
              value={color.name}
              id={`color-${color.name}`}
              className="sr-only"
            />
            {selectedColorName === color.name && (
              <Check
                className={cn(
                  "w-5 h-5",
                  // Determine check color based on swatch brightness
                  (color.hex === '#FFFFFF' || color.hex.toLowerCase() === '#ffffff' || color.className.includes('white') || color.className.includes('light')) && !color.className.includes('dark')
                    ? "text-black"
                    : "text-white"
                )}
              />
            )}
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
