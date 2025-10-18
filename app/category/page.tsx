"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { typeColors } from "@/components/Types";
import { useRouter } from "next/navigation";

interface PokemonType {
  name: string;
  url: string;
}

const Page = () => {
  const [types, setTypes] = useState<PokemonType[]>([]);
 const router = useRouter()

 const goToType=(type:string)=>{
    router.push(`/category/${type}`)
 }

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/type");
      const data = await response.json();
      setTypes(data.results || []);
    };

    fetchTypes();
  }, []);

  return (
    <div>
      <Navbar currentPath="/category" />

      <section className="w-full mt-6 items-center">
        <h2 className="font-bold text-3xl pokemon-font text-center my-6">
          Categories / Types
        </h2>

        <ul className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-3 mx-6">
          {types.map((type, key) => (
            <motion.div
            onClick={()=>goToType(type.name)}
              key={key}
              whileHover={{ scale: 1.05 }}
            className={`px-6 py-3 border rounded-lg cursor-pointer capitalize  shadow-md flex items-center gap-2 ${typeColors[type.name] || "bg-gray-300"}`}
            >
              <span className="font-semibold">{key + 1}.</span>
              <span>{type.name}</span>
            </motion.div>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Page;
