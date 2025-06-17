import { collection, doc, setDoc } from "firebase/firestore";
import { db } from './firebase';


const COLLECTION_NAME = import.meta.env.VITE_FIREBASE_COLLECTION_NAME;

export const addTestDoc = async () => {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const newDocRef = doc(colRef);
    await setDoc(newDocRef, {
      searchTerm: "test",
      count: 1,
      movie_id: 123,
      poster_url: "test_url",
    });
    console.log("Test doc added");
  } catch (e) {
    console.error("Error adding test doc:", e);
  }
};
