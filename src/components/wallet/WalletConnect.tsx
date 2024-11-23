import React from 'react';
import { X, Wallet } from 'lucide-react';
import { useWalletStore } from '../../store/walletStore';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

interface WalletConnectProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUPPORTED_WALLETS = [
  {
    name: 'MetaMask',
    icon: '🦊',
    description: 'Connect to your MetaMask wallet',
  },
  {
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Connect using WalletConnect',
  },
  {
    name: 'Coinbase Wallet',
    icon: '📱',
    description: 'Connect to Coinbase Wallet',
  },
  {
    name: 'Trust Wallet',
    icon: '🔐',
    description: 'Connect to Trust Wallet',
  },
];

const WalletConnect: React.FC<WalletConnectProps> = ({ isOpen, onClose }) => {
  const { connect } = useWalletStore();
  const { address } = useAccount();
  const { connectors, connectAsync } = useConnect();
  const { disconnect } = useDisconnect();

  if (!isOpen) return null;

  const handleConnect = async (walletName: string) => {
    try {
      const connector = connectors.find(c => c.name === walletName);
      if (connector) {
        const result = await connectAsync({ connector });
        if (result.address) {
          connect(result.address);
          onClose();
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <Wallet className="h-6 w-6 text-emerald-500" />
          <h2 className="text-2xl font-bold">
            {address ? 'Wallet Connecté' : 'Connecter un Wallet'}
          </h2>
        </div>

        {address ? (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">Adresse</p>
              <p className="font-mono">{`${address.slice(0, 6)}...${address.slice(-4)}`}</p>
            </div>
            <button
              onClick={handleDisconnect}
              className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg p-4 transition"
            >
              Déconnecter
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {SUPPORTED_WALLETS.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleConnect(wallet.name)}
                  className="w-full bg-gray-700 hover:bg-gray-600 rounded-lg p-4 flex items-center space-x-4 transition"
                >
                  <span className="text-2xl">{wallet.icon}</span>
                  <div className="text-left">
                    <p className="font-semibold">{wallet.name}</p>
                    <p className="text-sm text-gray-400">{wallet.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm text-gray-400 text-center">
              En connectant un wallet, vous acceptez les conditions d'utilisation de GoRent
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;