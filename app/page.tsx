"use client";
import Navbar from "@/components/Navbar";
import PokemonCard from "@/components/PokemonCard";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";


const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [DebouncedSearch] = useDebounce(searchTerm, 5000);
  const [errorMessage, setErrorMessage] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchPokemon = async (query = "") => {
    try {
      const POKE_API = process.env.NEXT_PUBLIC_POKE_API;
      const endpoint = query
        ? `${POKE_API}/${query.toLowerCase()}`
        : `${POKE_API}?limit=24`;
      const response = await fetch(endpoint);
      if (!response) {
        throw new Error("Fail to fetch Pokemon data");
      }
      const data = await response.json();

        if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch Pokemon");
        setPokemonList([]);
        return;
      }
      setPokemonList(data.results || []);

      if (query && data.results.length > 0) {
        // await updateSearch(query, data.results[0]);
      }

    } catch (error) {
      console.log("Error while Fetching Pokemons");
    } finally{
      setIsLoading(false)
    }
  };
    useEffect(() => {
    fetchPokemon(DebouncedSearch);
  }, [DebouncedSearch]);
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar currentPath="/home" />

      <main className="max-w-6xl mx-auto px-4 flex justify-center flex-col items-center mt-10">
      <div>  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>
<section >
  <h2 className="font-bold text-3xl pokemon-font text-center my-6">All Pokemons</h2>
  {
    isLoading?(
      <p></p>
    ):errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>): (
            <ul className="grid md:grid-cols-4 grid-cols-2 gap-3 space-x-2 space-y-2">
              {pokemonList.map((pokemon,i) => (
                <PokemonCard key={i+1} pokemon={pokemon} />
                
              ))}
            </ul>
            )
  }
</section>
      </main>
    </div>
  );
};

export default Page;
