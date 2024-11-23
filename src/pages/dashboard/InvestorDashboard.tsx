import React, { useState } from 'react';
import { Wallet, TrendingUp, History, Bell, Coins, CreditCard, Boxes } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import WalletConnect from '../../components/wallet/WalletConnect';

const InvestorDashboard = () => {
  const { user } = useAuthStore();
  const [showWalletModal, setShowWalletModal] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Investisseur</h1>
        <div className="flex items-center space-x-4">
          <button className="btn-secondary">
            <Bell className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowWalletModal(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
          >
            <Wallet className="h-5 w-5" />
            <span>Connecter Wallet</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Investissements Actifs',
              value: '€75,000',
              change: '+12.5%',
              icon: Wallet,
            },
            {
              title: 'Rendement Total',
              value: '€8,250',
              change: '+15.2%',
              icon: TrendingUp,
            },
            {
              title: 'Projets Financés',
              value: '5',
              change: '+2',
              icon: History,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="h-6 w-6 text-emerald-500" />
              </div>
              <div className="text-sm text-emerald-500">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Wallet Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Wallet</h2>
            <Wallet className="h-5 w-5 text-emerald-500" />
          </div>

          {/* Platform Assets */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-400">Actifs Plateforme</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Coins className="h-4 w-4 text-emerald-500" />
                  <span>GRT Token</span>
                </div>
                <span className="font-bold">1,500 GRT</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-blue-500" />
                  <span>ETH</span>
                </div>
                <span className="font-bold">2.5 ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Boxes className="h-4 w-4 text-purple-500" />
                  <span>NFTs</span>
                </div>
                <span className="font-bold">3</span>
              </div>
            </div>
          </div>

          {/* Connected Wallet Assets */}
          <div className="space-y-4">
            <h3 className="text-sm text-gray-400">Wallet Externe</h3>
            <div className="space-y-2">
              {!user ? (
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Connecter Wallet</span>
                </button>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Coins className="h-4 w-4 text-emerald-500" />
                      <span>GRT Token</span>
                    </div>
                    <span className="font-bold">500 GRT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-blue-500" />
                      <span>ETH</span>
                    </div>
                    <span className="font-bold">1.2 ETH</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Mes Investissements</h2>
          <div className="space-y-4">
            {[
              {
                project: 'Résidence AVP Paris',
                amount: '€25,000',
                return: '14.2%',
                status: 'En cours',
              },
              {
                project: 'Studio de Jeux Vidéo',
                amount: '€15,000',
                return: '12.8%',
                status: 'En cours',
              },
              {
                project: 'Ferme Solaire',
                amount: '€35,000',
                return: '15.5%',
                status: 'En cours',
              },
            ].map((investment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{investment.project}</p>
                  <p className="text-sm text-gray-400">{investment.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-500">{investment.return}</p>
                  <p className="text-sm text-gray-400">{investment.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Historique des Transactions</h2>
          <div className="space-y-4">
            {[
              {
                type: 'Investissement',
                project: 'Résidence AVP Paris',
                amount: '€25,000',
                date: '2024-03-15',
              },
              {
                type: 'Rendement',
                project: 'Studio de Jeux Vidéo',
                amount: '+€450',
                date: '2024-03-10',
              },
              {
                type: 'Investissement',
                project: 'Ferme Solaire',
                amount: '€35,000',
                date: '2024-03-01',
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{transaction.type}</p>
                  <p className="text-sm text-gray-400">{transaction.project}</p>
                </div>
                <div className="text-right">
                  <p className={transaction.type === 'Rendement' ? 'text-emerald-500' : ''}>
                    {transaction.amount}
                  </p>
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WalletConnect isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} />
    </div>
  );
};

export default InvestorDashboard;