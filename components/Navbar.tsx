import { Columns, Heart, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ currentPath = "/dashboard" }: { currentPath: string }) => {
  const navItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Popular", href: "/popular", icon: Heart },
    { name: "Categories", href: "/category", icon: Columns },
  ];
  return (
    <div className="w-full  bg-red-500 text-primary-foreground z-10">
      <div className=" flex justify-between items-center">
        <div className="flex items-center space-x-2  mb-4 p-2 ">
          <Image
            src={"/pokelogo.png"}
            alt="Logo"
            width={100}
            height={50}
          ></Image>{" "}
        </div>
        <nav className="flex items-center">
          {navItems.map((item, key) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            return (
              <Link key={key}
                href={item.href}
                className={`flex items-center space-x-3 py-2 px-2 rounded-lg ${
                  isActive
                    ? " text-primary"
                    : " text-primary-foreground"
                }`}
              >
                <Icon className="w-5 h-5"/>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div>
            <ThemeToggle/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
