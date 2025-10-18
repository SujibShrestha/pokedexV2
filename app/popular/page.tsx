import Navbar from "@/components/Navbar";
import React from "react";
import { getPopularPokemons } from "../actions/supabase";

const Page = async () => {
  const pokemonList = (await getPopularPokemons()) || [];

  return (
    <div>
      <Navbar currentPath="/popular" />

      <section className="w-full mt-6">
        <h2 className="font-bold text-3xl pokemon-font text-center my-6">
          Popular Pokémons
        </h2>

        <ul className="flex flex-col items-center gap-3">
          {pokemonList.map((pokemon, i) => (
            <div
              key={i}
              className={`w-[80vw] ${
  i === 0
    ? "bg-yellow-400"
    : i === 1
    ? "bg-slate-400"
    : i === 2
    ? "bg-yellow-900"
    : "bg-transparent"
} p-6 mx-5 flex gap-6 items-center justify-around border rounded-lg`}
            >
              <span className="pokemon-font text-2xl">{i + 1}</span>
              <span className="pokemon-font text-2xl">
                {pokemon.name.toUpperCase()}
              </span>{" "}
              <img src={pokemon.image} alt="image" height={50} width={50} />
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Page;
