import style from "./LoginSection.module.scss";
import { FaGoogle, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { auth, googleProvider } from "../../../firebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const LoginSection = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Следим за состоянием авторизации
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Успешный вход через Google");
    } catch (err) {
      console.error("Ошибка входа через Google:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Выход выполнен");
    } catch (err) {
      console.error("Ошибка выхода:", err);
    }
  };

  return (
    <div className={style.loginSection}>
      <h2 className={style.loginSection__title}>{user ? t("Logout") : t("Login")}</h2>
      <div className={style.loginSection__buttons}>
        {user ? (
          <button className={style.loginSection__btn} onClick={handleLogout}>
            {t("Logout")} ({user.displayName || user.email})
          </button>
        ) : (
          <>
            <button className={style.loginSection__btn + " " + style.google} onClick={handleGoogleLogin}>
              <FaGoogle size={22} style={{ marginRight: 8 }} />
              <span>{t("Login with Google")}</span>
            </button>
            <button className={style.loginSection__btn + " " + style.facebook} disabled>
              <FaFacebookF size={22} style={{ marginRight: 8 }} />
              <span>{t("Login with Facebook")}</span>
            </button>
            <button className={style.loginSection__btn + " " + style.twitter} disabled>
              <FaTwitter size={22} style={{ marginRight: 8 }} />
              <span>{t("Login with Twitter")}</span>
            </button>
            <button className={style.loginSection__btn + " " + style.github} disabled>
              <FaGithub size={22} style={{ marginRight: 8 }} />
              <span>{t("Login with GitHub")}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSection;
