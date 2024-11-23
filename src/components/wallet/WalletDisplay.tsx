import React from 'react';
import { useWalletStore } from '../../store/walletStore';
import { Coins, CreditCard, Boxes } from 'lucide-react';

const WalletDisplay = () => {
  const { isConnected, address, grtBalance, ethBalance, nftCount } = useWalletStore();

  if (!isConnected || !address) return null;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Coins className="h-4 w-4 text-emerald-500" />
          <span>GRT Token</span>
        </div>
        <span className="font-bold">{grtBalance} GRT</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-4 w-4 text-blue-500" />
          <span>ETH</span>
        </div>
        <span className="font-bold">{ethBalance} ETH</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Boxes className="h-4 w-4 text-purple-500" />
          <span>NFTs</span>
        </div>
        <span className="font-bold">{nftCount}</span>
      </div>
    </div>
  );
};

export default WalletDisplay;