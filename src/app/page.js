import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-amber-100 text-black h-screen">
      <div className='flex items-center mx-8'>
        <Image
          src={"/oscars.svg"}
          alt="Oscar"
          width={50}
          height={50}
          className='
            w-5 h-5
            sm:w-8 sm:h-8
            md:w-12 md:h-12
          '
        />
        <h1 className="text-xl md:text-5xl sm:text-4xl font-bold px-4"> 2025 OSCARS PICKS </h1>
      </div>
      <Link href="/questions"
        className='mt-10 border rounded-md border-black hover:bg-amber-300 px-3'
      >
        <Image
          src="/start.svg"   // Make sure you have home.svg in the "public" folder
          alt="Home"
          width={40}
          height={40}
          className="cursor-pointer 
            w-5 h-5     // Base: smaller for very small screens (iPhone in portrait)
            sm:w-6 sm:h-6 // From 640px up, slightly larger
            md:w-8 md:h-8 // And so on...
            "
        />
      </Link>
    </div>
  );
}
