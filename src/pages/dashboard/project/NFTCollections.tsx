import React, { useState, useEffect } from 'react';
import { Plus, Users, Coins, Tag, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { supabase } from '../../../lib/supabase';
import CreateCollectionModal from '../../../components/nft/CreateCollectionModal';
import NFTCollectionCard from '../../../components/nft/NFTCollectionCard';
import NFTHoldersList from '../../../components/nft/NFTHoldersList';

interface NFTCollection {
  id: string;
  project_id: string;
  name: string;
  description: string;
  price: number;
  supply: number;
  sold: number;
  apy: number;
  image: string;
  rules: string[];
  status: 'active' | 'paused' | 'sold_out';
}

const NFTCollections = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchCollections();
  }, [user]);

  const fetchCollections = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('project_id', user.id);

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des collections:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-bold">Aucune Collection NFT</h2>
          <p className="text-gray-400">
            Créez votre première collection NFT pour commencer à lever des fonds pour votre projet.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition mx-auto"
          >
            <Plus className="h-5 w-5" />
            <span>Créer ma Première Collection</span>
          </button>
        </div>
        {showCreateModal && (
          <CreateCollectionModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    );
  }

  const totalValue = collections.reduce((acc, col) => acc + (col.sold * col.price), 0);
  const totalSupply = collections.reduce((acc, col) => acc + col.supply, 0);
  const totalSold = collections.reduce((acc, col) => acc + col.sold, 0);
  const averageAPY = collections.reduce((acc, col) => acc + col.apy, 0) / collections.length;

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400">Valeur Totale</p>
              <p className="text-2xl font-bold">€{totalValue.toLocaleString()}</p>
            </div>
            <Coins className="h-6 w-6 text-emerald-500" />
          </div>
          <p className="text-sm text-emerald-500">
            {((totalSold / totalSupply) * 100).toFixed(1)}% vendus
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400">NFTs Vendus</p>
              <p className="text-2xl font-bold">{totalSold} / {totalSupply}</p>
            </div>
            <Tag className="h-6 w-6 text-emerald-500" />
          </div>
          <p className="text-sm text-emerald-500">
            {totalSupply - totalSold} disponibles
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400">Collections Actives</p>
              <p className="text-2xl font-bold">{collections.length}</p>
            </div>
            <Users className="h-6 w-6 text-emerald-500" />
          </div>
          <p className="text-sm text-emerald-500">
            {collections.filter(c => c.status === 'active').length} en vente
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400">APY Moyen</p>
              <p className="text-2xl font-bold">{averageAPY.toFixed(1)}%</p>
            </div>
            <TrendingUp className="h-6 w-6 text-emerald-500" />
          </div>
          <p className="text-sm text-emerald-500">
            Sur toutes les collections
          </p>
        </div>
      </div>

      {/* Collections Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Collections NFT</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
        >
          <Plus className="h-5 w-5" />
          <span>Nouvelle Collection</span>
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((collection) => (
          <NFTCollectionCard
            key={collection.id}
            collection={collection}
            onSelect={() => setSelectedCollection(collection.id)}
          />
        ))}
      </div>

      {/* Modals */}
      {selectedCollection && (
        <NFTHoldersList
          collection={collections.find(c => c.id === selectedCollection)!}
          onClose={() => setSelectedCollection(null)}
        />
      )}

      {showCreateModal && (
        <CreateCollectionModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default NFTCollections;