"use client";

import { categories } from "../questions/data/categories";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesPage() {
  return (
    <div className="p-6 bg-amber-100 text-black">

      <div className="relative flex flex-col items-center w-full">
        {/* Home icon link */}
        <Link href="/" className="absolute sm:top-3 top-1 left-4">
          <Image
            src="/home.svg"   // Make sure you have home.svg in the "public" folder
            alt="Home"
            width={30}
            height={30}
            className="cursor-pointer 
              w-5 h-5     // Base: smaller for very small screens (iPhone in portrait)
              sm:w-6 sm:h-6 // From 640px up, slightly larger
              md:w-8 md:h-8 // And so on...
              "
          />
        </Link>

        <h1 className="text-center text-lg sm:text-4xl font-bold mb-10 mt-1">SELECT A CATEGORY</h1>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center max-w-4xl mx-auto mb-20">
        {categories.map((category, index) => (
          <li key={category.name} className="border border-black w-96 h-10 justify-center text-center p-2 rounded-md text-black hover:bg-black hover:text-white">
            <Link href={`/questions/${encodeURIComponent(index)}`} className="hover:underline">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
