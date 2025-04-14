import React, { useEffect, useState } from 'react'
import PokemonCards from './PokemonCards';

const Pokemon = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=500";

    const FetchAPI = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();

            const PokemonDetails = data.results.map(async (currVal) => {
                const res = await fetch(currVal.url);
                const data = res.json();
                return data;
            });

            const AllPokemoms = await Promise.all(PokemonDetails);
            setPokemons(AllPokemoms);
            setLoading(false);

        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        FetchAPI();
    }, []);

    const SearchResult = pokemons.filter((crrVal) => 
        crrVal.name.includes(search.toLowerCase())
    )

    if(loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
                    <h1 className="text-2xl font-bold text-indigo-700">Loading Pokémon...</h1>
                </div>
            </div>
        )
    }

    if(error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-red-600">Error: {error.message}</h1>
                    <button 
                        onClick={() => FetchAPI()} 
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <section className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-indigo-800 mb-6">Pokédex</h1>
                    <p className="text-xl text-indigo-600 mb-8">Gotta catch 'em all!</p>
                    
                    <div className="relative max-w-md mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search Pokémon by name..."
                            className="pl-10 w-full py-3 border border-indigo-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-12">
                    {SearchResult.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">No Pokémon found matching "{search}"</p>
                        </div>
                    ) : (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {SearchResult.map((currVal) => (
                                <PokemonCards key={currVal.id} currVal={currVal} />
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Pokemon