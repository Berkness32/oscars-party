// app/voting/page.tsx
"use client";

import { useState, useEffect } from "react";
import { categories } from "./data/categories";
import Link from "next/link";
import Image from "next/image";
import MoviesList from "./components/MoviesList";
import { saveMovieSelection, getSavedMovieSelection } from "../../lib/firestore"; // Import function
import next from "next";

export default function VotingPage() {
  // Track which category is active
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Current category data
  const currentCategory = categories[currentIndex];

  // Fetch the saved movie selection when the category changes
  useEffect(() => {
    async function fetchSelectedMovie() {
      try {
        const movieTitle = await getSavedMovieSelection(currentCategory.name);
        setSelectedMovie(movieTitle || null); // Ensure no movie is selected if nothing is saved
      } catch (error) {
        console.error("Error fetching saved movie:", error);
      }
    }

    fetchSelectedMovie();
  }, [currentCategory.name]);

  // Callback for MoviesList
  async function handleSelectMovie(movieTitle) {
    setSelectedMovie(movieTitle);

    try {
      await saveMovieSelection(currentCategory.name, movieTitle);
    } catch (error) {
      alert("Error saving vote. Make sure you're logged in.");
    }
  }

  const handleNextCategory = () => {
    // Only advance if not at the last category
    setCurrentIndex((prevIndex) => {
      if (prevIndex < categories.length - 1) {
        return prevIndex + 1;
      }
      alert("All votes submitted!")
      return prevIndex; // No change if it's already at the end
    });
  };

  const handlePreviousCategory = () => {
    // Only go back if not at the first category
    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex; // No change if it's already at the start
    });
  };

  return (
    <div className="min-h-screen bg-amber-100 text-black flex flex-col items-center p-4">
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
        {/* Dynamically show the category name */}
        <h1 className="text-center text-lg sm:text-4xl font-bold mb-10 mt-1">{currentCategory.name}</h1>
      </div>

      {/* Display the movies for this category */}
      <MoviesList 
        movies={currentCategory.movies}
        selectedMovie={selectedMovie}
        onSelectMovie={handleSelectMovie}
      />

      <div className="flex">
        <button
            // if __ ? __ : __
          onClick={handlePreviousCategory}
          className="mt-6 mb-10 px-4 mr-2 border border-amber-100 hover:border-black rounded-md "
        >
          <Image
            src="/arrow-back.svg"   // Make sure you have home.svg in the "public" folder
            alt="Next"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </button>


        {/* Button to go to next category */}
        <button
          onClick={handleNextCategory}
          className="mt-6 mb-10 px-4  ml-2 border border-amber-100 hover:border-black rounded-md "
        >
          <Image
            src="/arrow-forward.svg"   // Make sure you have home.svg in the "public" folder
            alt="Next"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}

