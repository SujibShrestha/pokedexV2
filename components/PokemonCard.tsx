import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./ui/card"; // adjust import path
import Type, { typeColors } from "./Types";
import {motion, scale} from 'framer-motion'

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
    types: { type: { name: keyof typeof typeColors } }[];
  sprites: {
    other: {
      "official-artwork": { front_default: string };
    };
  };
}

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    fetch(pokemon.url)
      .then((res) => res.json())
      .then((data: PokemonDetails) => {
        setDetails(data);
      });
  }, [pokemon.url]);

  if (!details) return <p>Loading...</p>;

  return (
    <motion.div whileHover={{scale:1.04}}>
    <Card className="md:w-60 w-50">
      <CardHeader>
        <CardTitle>#{details.id}</CardTitle> {/* ID as title */}
        <CardDescription>{pokemon.name.toUpperCase()}</CardDescription> 
      </CardHeader>

      <CardContent className="flex justify-center bg-foreground mx-5">
        <img
          src={details.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-32 h-32 object-contain"
        />
      </CardContent>

      <CardFooter>
        {/* Types as footer */}
        {details.types.map((t) => (
          <span
            key={t.type.name}
            className={`px-2 py-1 rounded text-sm capitalize mr-1`}
          >
            <Type key={t.type.name} typeName={t.type.name} />
          </span>
        ))}
      </CardFooter>
    </Card>
    </motion.div>
  );
};

export default PokemonCard;
