"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import Type, { typeColors } from "./Types";
import { motion } from "framer-motion";

export interface PokemonDetails {
  id: number;
  types: { type: { name: keyof typeof typeColors } }[];
  sprites: {
    other: {
      "official-artwork": { front_default: string };
    };
  };
}

export interface Pokemon {
  name: string;
  url?: string;
  details?: PokemonDetails;
}

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(
    pokemon.details || null
  ); 
  useEffect(() => {
    if (!pokemon.details && pokemon.url) {
      const fetchDetails = async () => {
        try {
          const res = await fetch(pokemon.url!);
          if (!res.ok) throw new Error("Failed to fetch Pokémon details");
          const data: PokemonDetails = await res.json();
          setDetails(data);
        } catch (err) {
          console.error("Error fetching Pokémon details:", err);
        }
      };
      fetchDetails();
    }
  }, [pokemon.details, pokemon.url]);

  if (!details) return <p className="text-center">Loading...</p>;

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card className="w-full sm:w-48 md:w-60 mr-2 mb-4">
        <CardHeader>
          <CardTitle>#{details.id}</CardTitle>
          <CardDescription>{pokemon.name.toUpperCase()}</CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center bg-foreground mx-5">
          <img
            src={details.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-32 h-32 object-contain"
          />
        </CardContent>

        <CardFooter className="flex gap-1">
          {details.types.map((t) => (
            <Type key={t.type.name} typeName={t.type.name} />
          ))}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PokemonCard;
