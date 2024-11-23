import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface NFTCollection {
  id: string;
  name: string;
  holders: Array<{
    address: string;
    quantity: number;
    purchaseDate: string;
  }>;
}

interface Props {
  collection: NFTCollection;
  onClose: () => void;
}

const NFTHoldersList: React.FC<Props> = ({ collection, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          Détenteurs - {collection.name}
        </h2>

        <div className="space-y-4">
          {collection.holders.map((holder, index) => (
            <div
              key={index}
              className="bg-gray-700/50 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-mono">{holder.address}</p>
                  <a
                    href={`https://etherscan.io/address/${holder.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-500 hover:text-emerald-400"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-sm text-gray-400">
                  Acheté le {new Date(holder.purchaseDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">{holder.quantity} NFT{holder.quantity > 1 ? 's' : ''}</p>
                <p className="text-sm text-emerald-500">
                  €{(holder.quantity * 25000).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTHoldersList;