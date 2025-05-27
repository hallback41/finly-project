import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

function useCloudLocalStorage(key, initialValue) {
  const { user } = useAuth();
  const [data, setData] = useState(() => {
    // Начальное значение — из локалки
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "users", user.uid);

    const unsub = onSnapshot(ref, async (snap) => {
      const cloudData = snap.exists() ? snap.data()[key] : undefined;
      if (cloudData === undefined) {
        // Если в облаке пусто — миграция из локалки
        const localData = localStorage.getItem(key);
        const dataToSave = localData ? JSON.parse(localData) : initialValue;
        await setDoc(ref, { [key]: dataToSave }, { merge: true });
        setData(dataToSave);
        localStorage.removeItem(key);
      } else {
        // Если данные разные — обновить локалку и state
        if (JSON.stringify(cloudData) !== JSON.stringify(data)) {
          setData(cloudData);
          localStorage.setItem(key, JSON.stringify(cloudData));
        }
      }
    });

    return () => unsub();
    // eslint-disable-next-line
  }, [user, key]);

  const saveData = useCallback(
    (newData) => {
      setData(newData);
      if (user) {
        const ref = doc(db, "users", user.uid);
        setDoc(ref, { [key]: newData }, { merge: true });
      } else {
        localStorage.setItem(key, JSON.stringify(newData));
      }
    },
    [user, key]
  );

  return [data, saveData];
}

export default useCloudLocalStorage;
