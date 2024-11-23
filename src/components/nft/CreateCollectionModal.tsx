import React, { useState } from 'react';
import { X, Upload, Plus, Minus, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { supabase } from '../../lib/supabase';

interface Props {
  onClose: () => void;
}

const CreateCollectionModal: React.FC<Props> = ({ onClose }) => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    supply: '',
    apy: '',
    image: null as File | null,
    rules: [''],
    minimumLockPeriod: '12',
    votingRights: false,
    revenueShare: false,
  });

  const addRule = () => {
    setFormData(prev => ({
      ...prev,
      rules: [...prev.rules, '']
    }));
  };

  const removeRule = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }));
  };

  const updateRule = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      rules: prev.rules.map((rule, i) => i === index ? value : rule)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // Validation
      if (parseInt(formData.supply) < 1) {
        throw new Error('Le nombre de NFTs doit être supérieur à 0');
      }
      if (parseInt(formData.price) < 0) {
        throw new Error('Le prix doit être positif');
      }
      if (parseFloat(formData.apy) < 0 || parseFloat(formData.apy) > 100) {
        throw new Error('L\'APY doit être entre 0 et 100%');
      }

      // Create collection in database
      const { data: collection, error: collectionError } = await supabase
        .from('collections')
        .insert([{
          project_id: user.id,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          supply: parseInt(formData.supply),
          apy: parseFloat(formData.apy),
          sold: 0,
          rules: formData.rules.filter(rule => rule.trim() !== ''),
          status: 'active',
          minimum_lock_period: parseInt(formData.minimumLockPeriod),
          voting_rights: formData.votingRights,
          revenue_share: formData.revenueShare,
        }])
        .select()
        .single();

      if (collectionError) throw collectionError;

      // Upload image if provided
      if (formData.image && collection) {
        const fileExt = formData.image.name.split('.').pop();
        const filePath = `collections/${collection.id}/image.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('nft-images')
          .upload(filePath, formData.image);

        if (uploadError) throw uploadError;

        // Update collection with image URL
        const { error: updateError } = await supabase
          .from('collections')
          .update({ image_url: filePath })
          .eq('id', collection.id);

        if (updateError) throw updateError;
      }

      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Créer une Collection NFT</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <span className="text-red-500 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Nom de la Collection
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Prix (€)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Nombre de NFTs
                </label>
                <input
                  type="number"
                  value={formData.supply}
                  onChange={e => setFormData(prev => ({ ...prev, supply: e.target.value }))}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  APY (%)
                </label>
                <input
                  type="number"
                  value={formData.apy}
                  onChange={e => setFormData(prev => ({ ...prev, apy: e.target.value }))}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Période de Blocage Minimale (mois)
              </label>
              <input
                type="number"
                value={formData.minimumLockPeriod}
                onChange={e => setFormData(prev => ({ ...prev, minimumLockPeriod: e.target.value }))}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
                min="1"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Droits et Avantages
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.votingRights}
                    onChange={e => setFormData(prev => ({ ...prev, votingRights: e.target.checked }))}
                    className="rounded border-gray-600 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Droits de vote sur les décisions du projet</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.revenueShare}
                    onChange={e => setFormData(prev => ({ ...prev, revenueShare: e.target.checked }))}
                    className="rounded border-gray-600 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Partage des revenus du projet</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Image de la Collection
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-emerald-500 hover:text-emerald-400"
                    >
                      <span>Télécharger un fichier</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">ou glisser-déposer</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    PNG, JPG jusqu'à 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Règles et Conditions
              </label>
              {formData.rules.map((rule, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={rule}
                    onChange={e => updateRule(index, e.target.value)}
                    placeholder="Ex: Blocage minimum de 12 mois"
                    className="flex-grow bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {index === formData.rules.length - 1 ? (
                    <button
                      type="button"
                      onClick={addRule}
                      className="p-2 text-emerald-500 hover:text-emerald-400"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeRule(index)}
                      className="p-2 text-red-500 hover:text-red-400"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition"
              disabled={isLoading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Création...' : 'Créer la Collection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollectionModal;