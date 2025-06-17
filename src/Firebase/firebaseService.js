import { db } from './firebase';

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  orderBy,
  limit
} from "firebase/firestore";

const COLLECTION_NAME = import.meta.env.VITE_FIREBASE_COLLECTION_NAME;

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, where("searchTerm", "==", searchTerm));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      const data = snapshot.docs[0].data();
      await updateDoc(docRef, { count: data.count + 1 });
    } else {
      const newDocRef = doc(colRef);
      await setDoc(newDocRef, {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};


export const getTrendingMovies = async () => {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy("count", "desc"), limit(5));
    const snapshot = await getDocs(q);

    const trendingMovies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return trendingMovies;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};