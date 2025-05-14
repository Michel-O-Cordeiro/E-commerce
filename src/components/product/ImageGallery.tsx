
"use client";

import type { ProductImage } from "@/lib/types";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: ProductImage[];
  selectedImage: ProductImage;
  onSelectImage: (image: ProductImage) => void;
  productName: string;
}

export default function ImageGallery({
  images,
  selectedImage,
  onSelectImage,
  productName,
}: ImageGalleryProps) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Main Image Section - centered and 30% width on medium+ screens */}
      <div className="w-full md:w-[30%] mx-auto">
        <Card className="overflow-hidden shadow-lg w-full">
          <CardContent className="p-0">
            <div className="aspect-square relative w-full">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt || `${productName} - Main View`}
                data-ai-hint={selectedImage.dataAiHint}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Thumbnail Row Section - full width, items spaced out */}
      <div className="flex flex-row flex-wrap justify-between items-center w-full gap-2">
        {images.map((image, index) => (
          <Card
            key={image.url + index}
            onClick={() => onSelectImage(image)}
            className={cn(
              "w-20 h-20", // Fixed size for thumbnails (80x80px)
              "overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md",
              selectedImage.url === image.url
                ? "ring-2 ring-primary ring-offset-2 shadow-xl"
                : "ring-1 ring-border hover:ring-primary/50"
            )}
            role="button"
            aria-label={`Ver imagem ${index + 1} de ${productName}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onSelectImage(image);
              }
            }}
          >
            <CardContent className="p-0">
              <div className="aspect-square relative w-full h-full">
                <Image
                  src={image.url}
                  alt={image.alt || `${productName} - Thumbnail ${index + 1}`}
                  data-ai-hint={image.dataAiHint}
                  fill
                  className="object-contain"
                  sizes="80px" // Corresponds to w-20 h-20 fixed size
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
