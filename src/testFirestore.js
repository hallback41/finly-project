import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Функция для теста Firestore
export async function testFirestoreCRUD() {
  const testRef = doc(db, "testCollection", "testDoc");
  // Пишем тестовые данные
  await setDoc(testRef, { hello: "world", time: Date.now() });
  // Читаем их обратно
  const snap = await getDoc(testRef);
  if (snap.exists()) {
    console.log("Firestore test read:", snap.data());
  } else {
    console.log("Firestore test: document not found");
  }
}
