"use client"

import Navbar from '@/components/Navbar';
import PokemonCard, { Pokemon } from '@/components/PokemonCard';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface TypePokemon {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

const Page = () => {
    const {type} = useParams();
   const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchTypePokemons = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();
          const pokemonList = data.pokemon.map((p:TypePokemon) => p.pokemon);
      setPokemons(pokemonList || []);
      
    };
    fetchTypePokemons();
  }, [type]);
   
  return (
 <div className="min-h-screen bg-background overflow-hidden">
      <Navbar currentPath="/category" />

      <main className="max-w-6xl mx-auto px-4 flex flex-col items-center mt-5">
      

        <section className="w-full mt-2">
          <h2 className="font-bold text-3xl pokemon-font text-center my-2 mb-10 ">
            All Pokémons
          </h2>

         
            <ul className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-3">
              {pokemons.map((pokemon, i) => (
                <PokemonCard key={i} pokemon={pokemon} />
              ))}
            </ul>

       
        </section>
      </main>
    </div>
  )
}

export default Page