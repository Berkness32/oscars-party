// app/voting/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { categories } from "../data/categories";
import Link from "next/link";
import Image from "next/image";
import MoviesList from "../components/MoviesList";
import { saveMovieSelection, getSavedMovieSelection } from "../../../lib/firestore"; // Import function
import next from "next";

export default function VotingPage() {
  const router = useRouter();

  // Track which category is active
  // Grab the dynamic route parameter from the URL:
  const params = useParams();
  const index = parseInt(params.index, 10);     // Convert "0", "1", etc. to a number

  // If the index is out of range, handle it (optional)
  if (index < 0 || index >= categories.length) {
    return <div>Invalid category!</div>;
  }

  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch the saved movie selection from Firestore whenever the category changes
  useEffect(() => {
    // If invalid, just skip fetching
    if (index < 0 || index >= categories.length) return;

    const categoryName = categories[index].name;

    async function fetchSelectedMovie() {
      try {
        const movieTitle = await getSavedMovieSelection(categoryName);
        setSelectedMovie(movieTitle || null);
      } catch (error) {
        console.error("Error fetching saved movie:", error);
      }
    }
    fetchSelectedMovie();
  }, [index]);


  const currentCategory = categories[index];

  // Callback to handle movie selection
  async function handleSelectMovie(movieTitle) {
    setSelectedMovie(movieTitle);
    try {
      await saveMovieSelection(currentCategory.name, movieTitle);
    } catch (error) {
      alert("Error saving vote. Make sure you're logged in.");
    }
  }

  // Define your NEXT and PREVIOUS handlers:
  function handleNextCategory() {
    const nextIndex = index + 1;
    if (nextIndex < categories.length) {
      router.push(`/questions/${nextIndex}`);
    } else {
      alert("All votes submitted!");
    }
  }

  function handlePreviousCategory() {
    const prevIndex = index - 1;
    if (prevIndex >= 0) {
      router.push(`/questions/${prevIndex}`);
    } else {
      alert("No previous category!");
    }
  }

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
        <Link href="/list" className="absolute sm:top-3 top-1 right-4">
          <Image
            src="/list.svg"   // Make sure you have home.svg in the "public" folder
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

