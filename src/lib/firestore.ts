import { db, auth } from "./firebase";
import { doc, setDoc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";

export const saveMovieSelection = async (category: string, movieTitle: string) => {
  try {
    // Get the currently logged-in user
    const user = auth.currentUser;

    if (!user) {
      return null;
      //throw new Error("User is not logged in");
    }

    // Reference the user's document inside "users" collection
    const voteRef = doc(db, "users", user.uid, "votes", category); // Use category as the document ID

    // Use setDoc() to overwrite the vote for this category
    await setDoc(voteRef, {
      movieTitle,
      timestamp: new Date(),
    });

    console.log(`Saved vote: ${movieTitle} for ${category}`);
  } catch (error) {
    console.error("Error saving movie selection:", error);
  }
};

// Function to get the saved movie selection for a category
export const getSavedMovieSelection = async (category: string) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return null;
      //throw new Error("User is not logged in");
    }

    const voteRef = doc(db, "users", user.uid, "votes", category);
    const voteSnap = await getDoc(voteRef);

    if (voteSnap.exists()) {
      return voteSnap.data().movieTitle; // Return the stored movie title
    } else {
      return null; // No saved movie found
    }
  } catch (error) {
    console.error("Error fetching saved movie selection:", error);
    return null; // Return null in case of error
  }
};

export const savePhoneNumber = async (number: string | number): Promise<boolean> => {
  
  try {
    // Get the currently logged-in user
    const user = auth.currentUser;

    if (!user) {
      return null;
      //throw new Error("User is not logged in");
    }

    const formattedNumber = formatPhoneNumber(number); // Format before saving

    // Reference the user's document inside "users" collection using their UID
    const userRef = doc(db, "users", user.uid);

    // Update the user's document with the new phone number
    await updateDoc(userRef, {
      phoneNumber: formattedNumber, // Use camelCase for consistency
    });

    console.log(`Saved phone number: ${formattedNumber}`);
    return true;
  } catch (error) {
    console.error("Error saving phone number:", error);
    return false;
  }
}

const formatPhoneNumber = (number: string | number) => {
  // Convert number to a string to avoid TypeError
  const numStr = String(number);

  // Remove all non-numeric characters
  const cleaned = numStr.replace(/\D/g, "");

  // Format the number as (123) 456-7890
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // Return the cleaned number if it doesn't match the expected pattern
  return numStr;
};

export const fetchPhoneNumber = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return null; // Return null if no user is logged in

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData.phoneNumber || null; // Return phone number if it exists
    }

    return null; // Return null if user document doesn't exist
  } catch (error) {
    console.error("Error fetching phone number:", error);
    return null;
  }
};


export const saveLetterboxd = async (letterboxd: string): Promise<boolean> => {
  
  try {
    // Get the currently logged-in user
    const user = auth.currentUser;

    if (!user) {
      return null;
      //throw new Error("User is not logged in");
    }

    // Reference the user's document inside "users" collection using their UID
    const userRef = doc(db, "users", user.uid);

    // Update the user's document with the new phone number
    await updateDoc(userRef, {
      letterboxd: letterboxd, // Use camelCase for consistency
    });

    console.log(`Saved letterboxd: ${letterboxd}`);
    return true;
  } catch (error) {
    console.error("Error saving letterboxd:", error);
    return false;
  }
};


export const fetchLetterboxd = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return null; // Return null if no user is logged in

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return userData.letterboxd || null; // Return phone number if it exists
    }

    return null; // Return null if user document doesn't exist
  } catch (error) {
    console.error("Error fetching letterboxd:", error);
    return null;
  }
};
