import React from 'react';
import { ArrowRight, Rocket, Coins, Users, BarChart, Shield, Leaf, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-20">
        <h1 className="text-5xl md:text-6xl font-bold">
          <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
La bite à dudule          </span>
          <br />
          avec GoRent
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Rejoignez l'avenir du financement participatif. Investissez dans des projets innovants et soutenez l'économie réelle grâce à notre plateforme.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/projects"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg flex items-center space-x-2 transition"
          >
            <span>Explorer les Projets</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg transition">
            En savoir plus
          </button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-emerald-500/10 rounded-3xl blur-3xl"></div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              La Nouvelle Génération du
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                Financement Participatif
              </span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              GoRent révolutionne le financement de projets en combinant la puissance de la blockchain 
              avec les principes éprouvés du crowdfunding. Notre plateforme permet aux porteurs de projets 
              de lever des fonds de manière transparente et aux investisseurs de participer à des opportunités 
              uniques tout en bénéficiant de la sécurité des NFTs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Shield,
                  title: 'Sécurisé',
                  description: 'Transactions et investissements protégés par la blockchain'
                },
                {
                  icon: Leaf,
                  title: 'Durable',
                  description: 'Projets éthiques et responsables'
                },
                {
                  icon: Coins,
                  title: 'Rentable',
                  description: 'Rendements attractifs et transparents'
                },
                {
                  icon: Gem,
                  title: 'Exclusif',
                  description: 'Accès à des opportunités uniques'
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <feature.icon className="h-6 w-6 text-emerald-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80" 
              alt="Blockchain Technology" 
              className="rounded-lg w-full h-48 object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80" 
              alt="Digital Investment" 
              className="rounded-lg w-full h-48 object-cover mt-8"
            />
            <img 
              src="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=800&q=80" 
              alt="Sustainable Projects" 
              className="rounded-lg w-full h-48 object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" 
              alt="Financial Growth" 
              className="rounded-lg w-full h-48 object-cover mt-8"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: Rocket, label: 'Projets Financés', value: '150+' },
          { icon: Users, label: 'Investisseurs Actifs', value: '2.5K+' },
          { icon: Coins, label: 'Total Investi', value: '25M€+' },
          { icon: BarChart, label: 'Rendement Moyen', value: '12.8%' },
        ].map((stat, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
            <stat.icon className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-gray-400">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Rest of the code remains unchanged */}
      {/* Featured Projects */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Projets à la Une</h2>
          <Link to="/projects" className="text-emerald-500 hover:text-emerald-400 flex items-center space-x-2">
            <span>Voir Tout</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Résidence AVP Paris',
              location: 'Paris, France',
              image: 'https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&w=800&q=80',
              progress: 75,
              target: '2.5M€',
              apy: '14.2%'
            },
            {
              title: 'Studio de Jeux Vidéo',
              location: 'Lyon, France',
              image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
              progress: 45,
              target: '500K€',
              apy: '12.8%'
            },
            {
              title: 'Ferme Solaire',
              location: 'Bordeaux, France',
              image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
              progress: 60,
              target: '1.8M€',
              apy: '15.5%'
            }
          ].map((project, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-400">{project.location}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progression</span>
                    <span className="text-emerald-500">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 rounded-full h-2"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-400">Objectif</p>
                    <p className="font-semibold">{project.target}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">Rendement</p>
                    <p className="font-semibold text-emerald-500">{project.apy}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="text-center space-y-12">
        <h2 className="text-3xl font-bold">Comment ça marche</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Choisissez votre Projet',
              description: 'Parcourez notre sélection de projets innovants et à fort potentiel.',
              step: '01'
            },
            {
              title: 'Investissez en NFT',
              description: 'Participez au financement grâce à des NFT sécurisés par la blockchain.',
              step: '02'
            },
            {
              title: 'Recevez vos Gains',
              description: 'Bénéficiez des revenus générés par le succès des projets.',
              step: '03'
            }
          ].map((item, index) => (
            <div key={index} className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;