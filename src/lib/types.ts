export interface ProductImage {
  url: string;
  alt: string;
  dataAiHint: string;
}

export interface ColorVariant {
  name: string;
  hex: string; // e.g., '#FF0000'
  className: string; // Tailwind class for swatch, e.g., 'bg-red-500'
  images: ProductImage[]; // Each color variant now has its own set of images
}

export interface Product {
  id: string;
  name: string;
  price: number;
  // images: ProductImage[]; // Removed top-level images
  description: string;
  variants: {
    sizes: string[];
    colors: ColorVariant[]; // ColorVariant now contains images
  };
  defaultSelectedColorName?: string;
  defaultSelectedSize?: string;
}

export interface CepAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}
