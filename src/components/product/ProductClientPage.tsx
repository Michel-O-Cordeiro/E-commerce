// @ts-nocheck
"use client";

import React, { useEffect, useMemo } from "react";
import type { Product, ProductImage, CepAddress, ColorVariant } from "@/lib/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import ImageGallery from "./ImageGallery";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";
import CepChecker from "./CepChecker";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductClientPageProps {
  product: Product;
}

const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
const FALLBACK_IMAGE: ProductImage = { url: 'https://placehold.co/600x600.png', alt: 'Imagem do produto indisponível', dataAiHint: 'placeholder product' };

export default function ProductClientPage({ product }: ProductClientPageProps) {
  // Helper to get ColorVariant object for a given color name
  const getColorVariantByName = (name?: string): ColorVariant | undefined => {
    return product.variants.colors.find(c => c.name === name);
  };

  // Helper to get images for a given color name
  const getImagesForColorName = (name?: string): ProductImage[] => {
    return getColorVariantByName(name)?.images || [];
  };

  // Initial selected color logic
  const initialSelectedColorObject = getColorVariantByName(product.defaultSelectedColorName) || product.variants.colors[0] || ({} as ColorVariant);
  const [selectedColor, setSelectedColor] = useLocalStorage<ColorVariant>(
    `${product.id}_selectedColor`,
    initialSelectedColorObject,
    FIFTEEN_MINUTES_MS
  );

  // Initial selected image logic (based on initial selected color)
  const initialImagesForDefaultColor = getImagesForColorName(initialSelectedColorObject.name);
  const initialImageForStorage = initialImagesForDefaultColor.length > 0 ? initialImagesForDefaultColor[0] : FALLBACK_IMAGE;

  const [selectedImage, setSelectedImage] = useLocalStorage<ProductImage>(
    `${product.id}_selectedImage`,
    initialImageForStorage,
    FIFTEEN_MINUTES_MS
  );

  // Derived state: current images to display in the gallery based on selectedColor
  const currentDisplayImages = useMemo(() => {
    return getImagesForColorName(selectedColor?.name);
  }, [selectedColor, product.variants.colors]); // eslint-disable-line react-hooks/exhaustive-deps

  // Effect to update selectedImage if it's not valid for the current selectedColor
  useEffect(() => {
    const imagesForCurrentColor = getImagesForColorName(selectedColor?.name);
    if (imagesForCurrentColor.length > 0) {
      const isSelectedImageInCurrentSet = imagesForCurrentColor.some(
        img => img.url === selectedImage?.url && img.alt === selectedImage?.alt
      );
      if (!isSelectedImageInCurrentSet) {
        setSelectedImage(imagesForCurrentColor[0]);
      }
    } else {
      setSelectedImage(FALLBACK_IMAGE);
    }
    // selectedImage is intentionally not a dependency to prevent infinite loops.
    // This effect reacts to changes in selectedColor or the product's color variants.
  }, [selectedColor, product.variants.colors, setSelectedImage]); // eslint-disable-line react-hooks/exhaustive-deps


  const [selectedSize, setSelectedSize] = useLocalStorage<string>(
    `${product.id}_selectedSize`,
    product.defaultSelectedSize || (product.variants.sizes.length > 0 ? product.variants.sizes[0] : ''),
    FIFTEEN_MINUTES_MS
  );

  const [cep, setCep] = useLocalStorage<string>(`${product.id}_cep`, "", FIFTEEN_MINUTES_MS);
  const [address, setAddress] = useLocalStorage<CepAddress | null>(`${product.id}_address`, null, FIFTEEN_MINUTES_MS);

  const handleColorSelect = (colorName: string) => {
    const newSelectedColorVariant = getColorVariantByName(colorName);
    if (newSelectedColorVariant) {
      setSelectedColor(newSelectedColorVariant);
      // The useEffect above will handle updating selectedImage
    }
  };
  
  // Ensure the image passed to the gallery is valid for the current color set, or a fallback.
  const imageForGallery = currentDisplayImages.find(img => img.url === selectedImage?.url && img.alt === selectedImage?.alt)
                        || currentDisplayImages[0]
                        || FALLBACK_IMAGE;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="w-full">
          <ImageGallery
            images={currentDisplayImages.length > 0 ? currentDisplayImages : [FALLBACK_IMAGE]}
            selectedImage={imageForGallery}
            onSelectImage={setSelectedImage}
            productName={product.name}
          />
        </div>

        <div className="w-full flex flex-col">
          <Card className="flex-grow shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl lg:text-4xl font-bold">
                {product.name}
              </CardTitle>
              <CardDescription className="text-muted-foreground pt-1">
                ID do produto: {product.id}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-4xl font-extrabold text-primary">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Ou em até 10x de R$ {(product.price / 10).toFixed(2).replace(".", ",")} sem juros
                </p>
              </div>

              <Separator />

              {product.variants.sizes && product.variants.sizes.length > 0 && (
                <SizeSelector
                  sizes={product.variants.sizes}
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                />
              )}

              {product.variants.colors && product.variants.colors.length > 0 && (
                 <ColorSelector
                  colors={product.variants.colors}
                  selectedColorName={selectedColor?.name || ''}
                  onSelectColor={handleColorSelect}
                />
              )}
              
              <Separator />

              <CepChecker
                cep={cep}
                onCepChange={setCep}
                address={address}
                onAddressChange={setAddress}
              />

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Descrição do Produto</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="flex-1 text-lg py-6">
                  <ShoppingBag className="mr-2 h-5 w-5" /> Comprar Agora
                </Button>
                <Button size="lg" variant="outline" className="flex-1 text-lg py-6">
                  <Heart className="mr-2 h-5 w-5" /> Adicionar aos Favoritos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
