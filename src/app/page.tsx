import ProductClientPage from '@/components/product/ProductClientPage';
import type { Product } from '@/lib/types';
import { Toaster } from "@/components/ui/toaster"; 


const MOCK_PRODUCT: Product = {
  id: 'SNK001',
  name: 'Chuteira Futsal Nike Beco 2 - Adulto',
  price: 279.90,
  description:
    'Conquiste os gramados com o Chuteira Futsal Nike Beco 2 - Adulto. Design moderno, conforto superior e durabilidade. Perfeito para o futebol, combinando estilo e performance.',
  variants: {
    sizes: ['38', '39', '40', '41', '42', '43'],
    colors: [
      {
        name: 'Vermelho',
        hex: '#dd1515',
        className: 'bg-red-800',
        images: [
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/8295512VA9.jpg', alt: 'Tênis Azul Marinho - Vista Lateral', dataAiHint: 'sneaker side' },
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/8295512VA4.jpg', alt: 'Tênis Azul Marinho - Vista Superior', dataAiHint: 'sneaker top' },
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/8295512VA3.jpg', alt: 'Tênis Azul Marinho - Vista Traseira', dataAiHint: 'sneaker back' },
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/8295512VA1.jpg', alt: 'Tênis Azul Marinho - Vista Frontal', dataAiHint: 'sneaker front' },
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/8295512VA5.jpg', alt: 'Par de Tênis Azul Marinho', dataAiHint: 'sneaker pair' },
        ],
      },
      {
        name: 'Azul Claro',
        hex: '#b7ebee',
        className: 'bg-white border border-border',
        images: [
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/829551T8A20.jpg', alt: 'Tênis Branco Clássico - Vista Lateral', dataAiHint: 'sneaker side' },
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/829551T8A24.jpg', alt: 'Tênis Branco Clássico - Vista Superior', dataAiHint: 'sneaker top' },
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/829551T8A23.jpg', alt: 'Tênis Branco Clássico - Vista Traseira', dataAiHint: 'sneaker back' },
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/829551T8A21.jpg', alt: 'Tênis Branco Clássico - Vista Frontal', dataAiHint: 'sneaker front' },
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/829551T8A25.jpg', alt: 'Par de Tênis Branco Clássico', dataAiHint: 'sneaker pair' },
        ],
      },
      {
        name: 'Preto',
        hex: '#000000',
        className: 'bg-black',
        images: [
          { url: 'https://imgcentauro-a.akamaihd.net/800x800/8295512KA11.jpg', alt: 'Chuteira Futsal Nike Beco 2 - Adulto - Vista Lateral', dataAiHint: 'sneaker side' },
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/8295512KA15.jpg', alt: 'Chuteira Futsal Nike Beco 2 - Adulto - Vista Superior', dataAiHint: 'sneaker top' },
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/8295512KA14.jpg', alt: 'Chuteira Futsal Nike Beco 2 - Adulto - Vista Traseira', dataAiHint: 'sneaker back' },
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/8295512KA12.jpg', alt: 'Chuteira Futsal Nike Beco 2 - Adulto - Vista Frontal', dataAiHint: 'sneaker front' },
          { url: 'https://imgcentauro-a.akamaihd.net/1024x1024/8295512KA16.jpg', alt: 'Par de Chuteira Futsal Nike Beco 2 - Adulto', dataAiHint: 'sneaker pair' },
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
