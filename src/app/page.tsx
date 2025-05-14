import ProductClientPage from '@/components/product/ProductClientPage';
import type { Product } from '@/lib/types';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

// Mock data for the product
// This would typically come from an API or database
const MOCK_PRODUCT: Product = {
  id: 'P001',
  name: 'Camiseta Premium Conforto Total',
  price: 79.90,
  images: [
    { url: 'https://placehold.co/600x600.png', alt: 'Camiseta Vista Frontal', dataAiHint: 'tshirt front' },
    { url: 'https://placehold.co/600x600.png', alt: 'Camiseta Vista Traseira', dataAiHint: 'tshirt back' },
    { url: 'https://placehold.co/600x600.png', alt: 'Detalhe do Tecido da Camiseta', dataAiHint: 'tshirt fabric detail' },
    { url: 'https://placehold.co/600x600.png', alt: 'Modelo Vestindo Camiseta', dataAiHint: 'tshirt lifestyle model' },
    { url: 'https://placehold.co/600x600.png', alt: 'Camiseta Dobrada', dataAiHint: 'tshirt folded' },
  ],
  description:
    'Experimente o máximo de conforto e estilo com nossa Camiseta Premium. Feita com o mais puro algodão respirável, esta camiseta foi desenhada para ser usada o dia todo. Disponível em uma variedade de tamanhos e cores para combinar perfeitamente com seu estilo. Ideal para qualquer ocasião, seja casual ou um pouco mais arrumada.',
  variants: {
    sizes: ['P', 'M', 'G', 'GG', 'XG'],
    colors: [
      { name: 'Azul Marinho', hex: '#000080', className: 'bg-blue-800' },
      { name: 'Verde Floresta', hex: '#228B22', className: 'bg-green-700' },
      { name: 'Cinza Mescla', hex: '#808080', className: 'bg-gray-500' },
      { name: 'Branco Clássico', hex: '#FFFFFF', className: 'bg-white border border-border' },
      { name: 'Preto Intenso', hex: '#000000', className: 'bg-black' },
    ],
  },
  defaultSelectedColorName: 'Azul Marinho',
  defaultSelectedSize: 'M',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ProductClientPage product={MOCK_PRODUCT} />
      <Toaster />
    </main>
  );
}
