// utils/saveToCloud.js
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const saveToCloud = (uid, key, data) => {
  if (!uid) return;
  const ref = doc(db, "users", uid);
  return setDoc(ref, { [key]: data }, { merge: true });
};
