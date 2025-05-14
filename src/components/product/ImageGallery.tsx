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
      <div className="w-full md:w-[30%]">
        <Card className="overflow-hidden shadow-lg w-full">
          <CardContent className="p-0">
            <div className="aspect-square relative w-full">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt || `${productName} - Main View`}
                data-ai-hint={selectedImage.dataAiHint}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Thumbnail Grid Section - full width */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 w-full">
        {images.map((image, index) => (
          <Card
            key={image.url + index}
            onClick={() => onSelectImage(image)}
            className={cn(
              "overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md",
              selectedImage.url === image.url
                ? "ring-2 ring-primary ring-offset-2 shadow-xl"
                : "ring-1 ring-border hover:ring-primary/50"
            )}
          >
            <CardContent className="p-0">
              <div className="aspect-square relative w-full">
                <Image
                  src={image.url}
                  alt={image.alt || `${productName} - Thumbnail ${index + 1}`}
                  data-ai-hint={image.dataAiHint}
                  fill
                  className="object-cover"
                  sizes="10vw" // Adjust if necessary, 10vw is a general small size
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
