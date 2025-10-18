"use client";
import Navbar from "@/components/Navbar";
import PokemonCard, { Pokemon } from "@/components/PokemonCard";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { updateSearch } from "./actions/supabase";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 2000);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPokemon = async (query: string) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const POKE_API = process.env.NEXT_PUBLIC_POKE_API;
      const endpoint = query
        ? `${POKE_API}/${query.toLowerCase()}`
        : `${POKE_API}?limit=24`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Pokémon not found");

      const data = await response.json();

      if (query) {
        // Single Pokémon search → wrap in array with details
        setPokemonList([
          {
            name: data.name,
            url: `${POKE_API}/${data.name}`,
            details: data,
          },
        ]);
        if (query) {
  await updateSearch(query, data); // always send the Pokémon object
}
      } else {
        // List endpoint
        setPokemonList(data.results || []);
      }
       
    } catch (err: any) {
      console.error(err);
      setPokemonList([]);
      setErrorMessage("Pokémon not found.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar currentPath="/" />

      <main className="max-w-6xl mx-auto px-4 flex flex-col items-center mt-10">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className="w-full mt-6">
          <h2 className="font-bold text-3xl pokemon-font text-center my-6">
            All Pokémons
          </h2>

          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500 text-center">{errorMessage}</p>
          ) : (
            <ul className="grid md:grid-cols-4 grid-cols-2 gap-3">
              {pokemonList.map((pokemon, i) => (
                <PokemonCard key={i} pokemon={pokemon} />
              ))}
            </ul>
          )}
       
        </section>
      </main>
    </div>
  );
};

export default Page;
