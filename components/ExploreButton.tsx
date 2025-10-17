"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";

export default function ExploreButton() {
  return (
    <motion.div
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.75 }}
      transition={{ type: "keyframes"}}
    >
      <Link
        href="/home"
      >
       <Button className="bg-red-600 hover:bg-red-400">Explore</Button>
      </Link>
    </motion.div>
  );
}
