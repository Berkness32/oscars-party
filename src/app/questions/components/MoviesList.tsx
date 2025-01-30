// app/voting/components/MoviesList.tsx
import Image from "next/image";

interface Movie {
  title: string;
  poster: string;
}

interface MoviesListProps {
  movies: Movie[];  
  selectedMovie: string | null;
  onSelectMovie: (movieTitle: string) => void;
}

export default function MoviesList({
  movies,
  selectedMovie,
  onSelectMovie,
}: MoviesListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
      {movies.map((movie) => {
        const isSelected = movie.title === selectedMovie;

        return (
          <div
            key={movie.title}
            onClick={() => onSelectMovie(movie.title)}
            className={`flex flex-col items-center rounded-lg hover:border-black transition p-2 cursor-pointer
              ${isSelected ? "bg-black text-amber-100" : "border border-transparent"}`}
          >
            <Image
              src={movie.poster}
              alt={movie.title}
              width={150}
              height={200}
              className="w-[150px] h-[200px] object-cover rounded-md"
            />
            <p className="mt-2 text-center font-monteCarlo">{movie.title}</p>
          </div>
        );
      })}
    </div>
  );
}

