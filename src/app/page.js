"use client";

import { useState, useEffect } from "react";
import { auth, googleSignIn, loginUser, logoutUser } from "../lib/auth";
import Link from "next/link";
import Image from "next/image";
import { onAuthStateChanged, User } from "firebase/auth";
import { savePhoneNumber, fetchPhoneNumber, saveLetterboxd, fetchLetterboxd } from "../lib/firestore";

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [hasPhoneNumber, setHasPhoneNumber] = useState(false);
  const [letterboxd, setLetterboxd] = useState("");
  const [hasLetterboxd, setHasLetterboxd] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
useEffect(() => {
  if (!auth) return; // Ensure auth is initialized before using

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);

    if (currentUser) {
      (async () => {
        const number = await fetchPhoneNumber();
        const letterboxd = await fetchLetterboxd();
        if (number) {
          setNumber(number);
          setHasPhoneNumber(true);
        }
        if (letterboxd) {
            setLetterboxd(letterboxd);
            setHasLetterboxd(true);
          }
        setLoading(false);
      })();
    } else {
      setLoading(false);
    }
  });

  return () => unsubscribe(); // Cleanup on unmount
}, []);

  if (loading) return <p className="bg-amber-100">Loading...</p>;

  const handleSavePhoneNumber = async () => {
    const success = await savePhoneNumber(number);
    if (success) {
      // If the phone number was saved successfully, update state
      setHasPhoneNumber(true);
    } else {
      // Handle any errors (optional)
      console.error("Failed to save phone number");
    }
  }

  const handleSaveLetterboxd = async () => {
    const success = await saveLetterboxd(letterboxd);
    if (success) {
      setHasLetterboxd(true);
    } else {
      console.error("Failed to save the Letterboxd account");
    }
  }

  // Login with email & password
  const handleEmailLogin = async () => {
    try {
      await loginUser(email, password);
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    await logoutUser();
  };

  if (user) {
    return (

      <div className="flex flex-col items-center justify-center bg-amber-100 text-black h-screen">
        <button onClick={handleLogout} className="absolute flex top-0 right-5 mt-4 px-4 py-2 hover:border hover:border-black  hover:rounded-md">
          <Image
            src={"/logout.svg"}
            alt="logout"
            width={25}
            height={25}
            className='
              w-6 h-6
              sm:w-8 sm:h-8
              md:w-12 md:h-12
            '
          />
        </button>

        <div className='flex items-center mx-8'>
          <Image
            src={"/oscars.svg"}
            alt="Oscar"
            width={50}
            height={50}
            className='
              w-6 h-6
              sm:w-8 sm:h-8
              md:w-12 md:h-12
            '
          />
          <h1 className="text-2xl md:text-5xl sm:text-4xl font-bold px-4"> 2025 OSCARS PICKS </h1>
        </div>
        <p className="font-monteCarlo">I am planning to add in some social features soon so we can</p> 
         <p className="font-monteCarlo">see each other&apos;s picks and letterboxd accounts</p>

        {hasPhoneNumber ? (
          <div className="flex mt-10">
            <Image
              src="/phone.svg"
              alt="phone number"
              width={30}
              height={30}
            />
            <p className="p-2">{number}</p>
          </div>
        ) : (
          <>
            <div className="flex mt-10">
              <input
                type="tel"
                placeholder="&nbsp;Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="border p-2 w-60 sm:w-70 md:w-80 rounded-full"
              />
              <button 
                onClick={handleSavePhoneNumber}
                className="hover:border hover:rounded-md hover:border-black ml-4 px-3">
                  <Image
                    src="/check.svg"
                    alt="Submit"
                    width={30}
                    height={30}
                    className="cursor-pointer 
                      w-5 h-5     // Base: smaller for very small screens (iPhone in portrait)
                      sm:w-6 sm:h-6 // From 640px up, slightly larger
                      md:w-8 md:h-8 // And so on...
                      "
                  />
              </button>
            </div>
          </>
        )}

        {hasLetterboxd ? (
          <div className="flex mt-2">
            <Image
              src="/letterboxd.svg"
              alt="letterboxd"
              width={30}
              height={30}
            />
            <p className="p-2">{letterboxd}</p>
          </div>
        ) : (
          <>
            <div className="flex mt-2">
              <input
                type="text"
                placeholder="&nbsp;letterboxd username"
                value={letterboxd}
                onChange={(e) => setLetterboxd(e.target.value)}
                className="border p-2 w-60 sm:w-70 md:w-80 rounded-full"
              />
              <button
                onClick={handleSaveLetterboxd}
                className="hover:border hover:rounded-md hover:border-black ml-4 px-3">
                  <Image
                    src="/check.svg"
                    alt="Submit"
                    width={30}
                    height={30}
                    className="cursor-pointer 
                      w-5 h-5     // Base: smaller for very small screens (iPhone in portrait)
                      sm:w-6 sm:h-6 // From 640px up, slightly larger
                      md:w-8 md:h-8 // And so on...
                      "
                  />
              </button>
            </div>
          </>
        )}


        <Link href="/questions/0"
          className='mt-5 border rounded-md border-black hover:bg-gray-300 px-3'
        >
          <Image
            src="/start.svg"   // Make sure you have home.svg in the "public" folder
            alt="Home"
            width={40}
            height={40}
            className="cursor-pointer 
              w-6 h-6     // Base: smaller for very small screens (iPhone in portrait)
              sm:w-8 sm:h-8 // From 640px up, slightly larger
              "
          />
        </Link>

      </div>
    );
  }

  // If user is not logged in, show the login screen
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-amber-100 text-black">

        <div className='flex items-center mx-8 mb-8'>
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

      <h1 className="font-bold mb-4">Login to Continue</h1>

      <input
        type="email"
        placeholder="&nbsp;Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-80 rounded-full mb-2"
      />
      <input
        type="password"
        placeholder="&nbsp;Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded-full w-80 mb-2"
      />

      <button onClick={handleEmailLogin} className="flex w-60 px-4 py-2 border border-black bg-blue-200 text-black hover:bg-sky-700 hover:text-white rounded-lg mb-2">
          <Image
            src={"/login.svg"}
            alt="Oscar"
            width={25}
            height={25}
          />
          <p className="px-4">Sign in with Email</p>
      </button>

      <button onClick={googleSignIn} className="flex w-60 px-4 py-2 border border-black bg-green-200 text-black hover:bg-lime-700 hover:text-white rounded-lg">
          <Image
            src={"/google.svg"}
            alt="Oscar"
            width={25}
            height={25}
          />
          <p className="px-4">Sign in with Google</p>
      </button>
    </div>
  );
}
