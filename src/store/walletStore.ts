import { create } from 'zustand';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  grtBalance: number;
  ethBalance: number;
  nftCount: number;
  connect: (address: string) => void;
  disconnect: () => void;
  updateBalances: (grt: number, eth: number, nfts: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: null,
  isConnected: false,
  grtBalance: 0,
  ethBalance: 0,
  nftCount: 0,
  connect: (address) => set({ address, isConnected: true }),
  disconnect: () => set({ address: null, isConnected: false, grtBalance: 0, ethBalance: 0, nftCount: 0 }),
  updateBalances: (grt, eth, nfts) => set({ grtBalance: grt, ethBalance: eth, nftCount: nfts }),
}));