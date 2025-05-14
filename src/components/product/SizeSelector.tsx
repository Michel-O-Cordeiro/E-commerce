"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Ruler } from "lucide-react";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
}: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="space-y-3">
      <Label htmlFor="size-selector" className="text-base font-semibold flex items-center gap-2">
        <Ruler className="w-5 h-5 text-primary" />
        Tamanho: <span className="text-muted-foreground font-normal">{selectedSize}</span>
      </Label>
      <RadioGroup
        id="size-selector"
        value={selectedSize}
        onValueChange={onSelectSize}
        className="flex flex-wrap gap-2"
      >
        {sizes.map((size) => (
          <Label
            key={size}
            htmlFor={`size-${size}`}
            className={`flex items-center justify-center cursor-pointer rounded-md border p-3 transition-colors hover:bg-accent hover:text-accent-foreground
              ${selectedSize === size ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-1" : "bg-card hover:border-primary/50"}
              min-w-[40px] h-[40px] text-sm font-medium`}
          >
            <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
            {size}
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
