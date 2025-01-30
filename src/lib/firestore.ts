import { db, auth } from "./firebase";
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";

export const saveMovieSelection = async (category: string, movieTitle: string) => {
  try {
    // Get the currently logged-in user
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User is not logged in");
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
      throw new Error("User is not logged in");
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
