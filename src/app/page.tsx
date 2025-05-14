import ProductClientPage from '@/components/product/ProductClientPage';
import type { Product } from '@/lib/types';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

// Mock data for the product
const MOCK_PRODUCT: Product = {
  id: 'SNK001',
  name: 'Tênis Esportivo Urbano Pro',
  price: 279.90,
  description:
    'Conquiste as ruas com o Tênis Esportivo Urbano Pro. Design moderno, conforto superior e durabilidade para o seu dia a dia. Perfeito para qualquer aventura urbana, combinando estilo e performance.',
  variants: {
    sizes: ['38', '39', '40', '41', '42', '43'],
    colors: [
      {
        name: 'Azul Marinho',
        hex: '#000080',
        className: 'bg-blue-800',
        images: [
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Azul Marinho - Vista Lateral', dataAiHint: 'sneaker side' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Azul Marinho - Vista Superior', dataAiHint: 'sneaker top' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Azul Marinho - Vista Traseira', dataAiHint: 'sneaker back' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Azul Marinho - Vista Frontal', dataAiHint: 'sneaker front' },
          { url: 'https://placehold.co/600x600.png', alt: 'Par de Tênis Azul Marinho', dataAiHint: 'sneaker pair' },
        ],
      },
      {
        name: 'Verde Floresta',
        hex: '#228B22',
        className: 'bg-green-700',
        images: [
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Verde Floresta - Vista Lateral', dataAiHint: 'sneaker side' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Verde Floresta - Vista Superior', dataAiHint: 'sneaker top' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Verde Floresta - Vista Traseira', dataAiHint: 'sneaker back' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Verde Floresta - Vista Frontal', dataAiHint: 'sneaker front' },
          { url: 'https://placehold.co/600x600.png', alt: 'Par de Tênis Verde Floresta', dataAiHint: 'sneaker pair' },
        ],
      },
      {
        name: 'Cinza Mescla',
        hex: '#808080',
        className: 'bg-gray-500',
        images: [
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Cinza Mescla - Vista Lateral', dataAiHint: 'sneaker side' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Cinza Mescla - Vista Superior', dataAiHint: 'sneaker top' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Cinza Mescla - Vista Traseira', dataAiHint: 'sneaker back' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Cinza Mescla - Vista Frontal', dataAiHint: 'sneaker front' },
          { url: 'https://placehold.co/600x600.png', alt: 'Par de Tênis Cinza Mescla', dataAiHint: 'sneaker pair' },
        ],
      },
      {
        name: 'Branco Clássico',
        hex: '#FFFFFF',
        className: 'bg-white border border-border',
        images: [
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Branco Clássico - Vista Lateral', dataAiHint: 'sneaker side' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Branco Clássico - Vista Superior', dataAiHint: 'sneaker top' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Branco Clássico - Vista Traseira', dataAiHint: 'sneaker back' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Branco Clássico - Vista Frontal', dataAiHint: 'sneaker front' },
          { url: 'https://placehold.co/600x600.png', alt: 'Par de Tênis Branco Clássico', dataAiHint: 'sneaker pair' },
        ],
      },
      {
        name: 'Preto Intenso',
        hex: '#000000',
        className: 'bg-black',
        images: [
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Preto Intenso - Vista Lateral', dataAiHint: 'sneaker side' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Preto Intenso - Vista Superior', dataAiHint: 'sneaker top' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Preto Intenso - Vista Traseira', dataAiHint: 'sneaker back' },
          { url: 'https://placehold.co/600x600.png', alt: 'Tênis Preto Intenso - Vista Frontal', dataAiHint: 'sneaker front' },
          { url: 'https://placehold.co/600x600.png', alt: 'Par de Tênis Preto Intenso', dataAiHint: 'sneaker pair' },
        ],
      },
    ],
  },
  defaultSelectedColorName: 'Azul Marinho',
  defaultSelectedSize: '40',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ProductClientPage product={MOCK_PRODUCT} />
      <Toaster />
    </main>
  );
}
