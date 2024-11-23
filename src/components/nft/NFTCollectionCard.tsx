import React from 'react';
import { Users, ArrowRight } from 'lucide-react';

interface NFTCollection {
  id: string;
  name: string;
  description: string;
  price: number;
  supply: number;
  sold: number;
  image: string;
  holders: Array<{
    address: string;
    quantity: number;
    purchaseDate: string;
  }>;
}

interface Props {
  collection: NFTCollection;
  onSelect: () => void;
}

const NFTCollectionCard: React.FC<Props> = ({ collection, onSelect }) => {
  const progress = (collection.sold / collection.supply) * 100;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
      <div className="relative h-48">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
          <p className="text-sm text-gray-300">{collection.description}</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Prix</p>
            <p className="text-lg font-bold">€{collection.price.toLocaleString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-gray-400">
              {collection.holders.length} détenteurs
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Vendus</span>
            <span className="text-emerald-500">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-emerald-500 rounded-full h-2 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{collection.sold} vendus</span>
            <span>{collection.supply} total</span>
          </div>
        </div>

        <button
          onClick={onSelect}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition"
        >
          <span>Voir les Détenteurs</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default NFTCollectionCard;