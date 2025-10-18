export const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-orange-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-sky-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-amber-800",
  ghost: "bg-indigo-700",
  dragon: "bg-indigo-500",
  dark: "bg-gray-800",
  steel: "bg-slate-400",
  fairy: "bg-pink-300",
  stellar: "bg-violet-500",  // for Gen 9
  shadow: "bg-gray-900",     // for legacy Shadow Pokémon
};


interface TypeProps {
  typeName: keyof typeof typeColors;
}

const Type: React.FC<TypeProps> = ({ typeName }) => {
  const bgColor = typeColors[typeName] || "bg-gray-500";
  return (
    <div
      className={`inline-block px-2 py-1  text-gray-50 rounded-md ${bgColor}`}
    >
      {typeName.toUpperCase()}
    </div>
  );
};

export default Type;  