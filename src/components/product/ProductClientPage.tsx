"use client";

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

export default function ProductClientPage({ product }: ProductClientPageProps) {
  const initialImage = product.images.length > 0 ? product.images[0] : { url: '', alt: 'Placeholder', dataAiHint: 'placeholder image' };
  const [selectedImage, setSelectedImage] = useLocalStorage<ProductImage>(
    `${product.id}_selectedImage`,
    initialImage,
    FIFTEEN_MINUTES_MS
  );

  const initialColor = product.variants.colors.find(c => c.name === product.defaultSelectedColorName) || product.variants.colors[0];
  const [selectedColor, setSelectedColor] = useLocalStorage<ColorVariant>(
    `${product.id}_selectedColor`,
    initialColor || ({} as ColorVariant), // Handle empty colors array
    FIFTEEN_MINUTES_MS
  );
  
  const [selectedSize, setSelectedSize] = useLocalStorage<string>(
    `${product.id}_selectedSize`,
    product.defaultSelectedSize || (product.variants.sizes.length > 0 ? product.variants.sizes[0] : ''),
    FIFTEEN_MINUTES_MS
  );

  const [cep, setCep] = useLocalStorage<string>(`${product.id}_cep`, "", FIFTEEN_MINUTES_MS);
  const [address, setAddress] = useLocalStorage<CepAddress | null>(`${product.id}_address`, null, FIFTEEN_MINUTES_MS);

  const handleColorSelect = (colorName: string) => {
    const newSelectedColor = product.variants.colors.find(c => c.name === colorName);
    if (newSelectedColor) {
      setSelectedColor(newSelectedColor);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Image Gallery Section */}
        <div className="lg:w-2/5">
          <ImageGallery
            images={product.images}
            selectedImage={selectedImage.url ? selectedImage : initialImage} // Ensure selectedImage has a url
            onSelectImage={setSelectedImage}
            productName={product.name}
          />
        </div>

        {/* Product Details Section */}
        <div className="lg:w-3/5 flex flex-col">
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
