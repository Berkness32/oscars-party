import { createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// Register User
export const registerUser = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      email: email,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Error registering:", error.message);
    throw error;
  }
};

// Google Sign-In
export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login
export const loginUser = async (email, password) => {
  try {
    // Try signing in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; 
  } catch (error) {
    // Check if the error is because the user does not exist
    if (error.code === "auth/user-not-found") {
      // Create a new user if sign-in fails due to no existing user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Optionally, store user data in Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        username: username,
        email: email,
        createdAt: new Date(),
      });
      return newUser;
    } else {
      // If it's any other error, rethrow so you can catch it elsewhere
      throw error;
    }
  }
};

// Logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

export {auth};
