import React from 'react'

const PokemonCards = ({currVal}) => {
  // Function to determine background color based on Pokémon type
  const getTypeColor = (type) => {
    const typeColors = {
      normal: 'bg-gray-200',
      fire: 'bg-red-100',
      water: 'bg-blue-100',
      grass: 'bg-green-100',
      electric: 'bg-yellow-100',
      ice: 'bg-cyan-100',
      fighting: 'bg-red-200',
      poison: 'bg-purple-100',
      ground: 'bg-amber-100',
      flying: 'bg-indigo-100',
      psychic: 'bg-pink-100',
      bug: 'bg-lime-100',
      rock: 'bg-yellow-200',
      ghost: 'bg-purple-200',
      dark: 'bg-gray-700',
      dragon: 'bg-violet-100',
      steel: 'bg-gray-300',
      fairy: 'bg-pink-200'
    };
    
    return typeColors[type] || 'bg-gray-100';
  }

  // Get first type for card background
  const mainType = currVal.types[0].type.name;
  const bgColor = getTypeColor(mainType);
  
  return (
    <li className="list-none transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className={`rounded-2xl overflow-hidden shadow-md ${bgColor} border border-gray-200 flex flex-col h-full`}>
        {/* Pokemon image with background */}
        <div className="relative pt-6 pb-2 px-4 flex justify-center">
          <div className="absolute inset-0 opacity-10 bg-gray-800 rounded-t-2xl"></div>
          <div className="relative z-10">
            <img
              className="h-40 w-40 object-contain drop-shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-110"
              src={currVal?.sprites?.other?.dream_world?.front_default || currVal?.sprites?.front_default}
              alt={currVal.name}
            />
          </div>
        </div>
        
        {/* Pokemon ID badge */}
        <div className="absolute top-4 right-4 bg-white/90 text-gray-700 rounded-full px-2 py-1 text-xs font-bold shadow-sm">
          #{String(currVal.id).padStart(3, '0')}
        </div>
        
        {/* Pokemon info */}
        <div className="bg-white p-4 rounded-t-3xl -mt-4 flex-grow flex flex-col">
          <h2 className="font-bold text-xl capitalize text-gray-800 mb-2">{currVal.name}</h2>
          
          {/* Types */}
          <div className="flex flex-wrap gap-2 mb-4">
            {currVal.types.map((val, index) => (
              <span 
                key={index}
                className={`${getTypeColor(val.type.name)} px-3 py-1 rounded-full text-xs font-medium capitalize shadow-sm`}
              >
                {val.type.name}
              </span>
            ))}
          </div>
          
          {/* Stats */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="flex flex-col">
                <span className="text-gray-500">Height</span>
                <span className="font-semibold">{(currVal.height / 10).toFixed(1)}m</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Weight</span>
                <span className="font-semibold">{(currVal.weight / 10).toFixed(1)}kg</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Speed</span>
                <span className="font-semibold">{currVal.stats[5].base_stat}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default PokemonCards