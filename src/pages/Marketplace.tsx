import React, { useState } from 'react';
import { Search, SlidersHorizontal, Wallet } from 'lucide-react';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const mockNFTs = [
    {
      id: 1,
      title: "Résidence AVP Paris #001",
      price: 25000,
      apy: 14.2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      project: "Résidence AVP Paris",
      location: "Paris, France",
      tokenId: "#001",
      seller: "0x1234...5678"
    },
    {
      id: 2,
      title: "Studio de Jeux Vidéo #015",
      price: 15000,
      apy: 12.8,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      project: "Studio de Jeux Vidéo",
      location: "Lyon, France",
      tokenId: "#015",
      seller: "0x9876...4321"
    },
    {
      id: 3,
      title: "Ferme Solaire #023",
      price: 35000,
      apy: 15.5,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
      project: "Ferme Solaire",
      location: "Bordeaux, France",
      tokenId: "#023",
      seller: "0x5678...9012"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Marketplace NFT</h1>
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Rechercher des NFTs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-700/50 transition"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-800/50 p-4 rounded-lg">
          <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
            <option>Projet</option>
            <option>Résidence AVP Paris</option>
            <option>Studio de Jeux Vidéo</option>
            <option>Ferme Solaire</option>
          </select>
          <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
            <option>Prix</option>
            <option>0€ - 10K€</option>
            <option>10K€ - 50K€</option>
            <option>50K€+</option>
          </select>
          <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
            <option>APY</option>
            <option>10-12%</option>
            <option>12-15%</option>
            <option>15%+</option>
          </select>
          <select className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2">
            <option>Statut</option>
            <option>À vendre</option>
            <option>Vendu</option>
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockNFTs.map((nft) => (
          <div key={nft.id} className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
            <div className="relative">
              <img src={nft.image} alt={nft.title} className="w-full h-48 object-cover" />
              <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-emerald-500 font-semibold">{nft.apy}% APY</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{nft.title}</h3>
                <p className="text-gray-400 text-sm">{nft.project}</p>
                <p className="text-gray-400 text-sm">{nft.location}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Prix</p>
                  <p className="text-xl font-bold">€{nft.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Token ID</p>
                  <p className="font-mono">{nft.tokenId}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>Vendeur: {nft.seller}</span>
              </div>
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition">
                <Wallet className="h-4 w-4" />
                <span>Acheter</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
