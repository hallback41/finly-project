import style from "./LoginSection.module.scss";
import { FaGoogle, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const LoginSection = () => {
  const { t } = useTranslation();

  return (
    <div className={style.loginSection}>
      <h2 className={style.loginSection__title}>{t("Login")}</h2>
      <div className={style.loginSection__buttons}>
        <button className={style.loginSection__btn + " " + style.google}>
          <FaGoogle size={22} style={{ marginRight: 8 }} />
          <span>{t("Login with Google")}</span>
        </button>
        <button className={style.loginSection__btn + " " + style.facebook}>
          <FaFacebookF size={22} style={{ marginRight: 8 }} />
          <span>{t("Login with Facebook")}</span>
        </button>
        <button className={style.loginSection__btn + " " + style.twitter}>
          <FaTwitter size={22} style={{ marginRight: 8 }} />
          <span>{t("Login with Twitter")}</span>
        </button>
        <button className={style.loginSection__btn + " " + style.github}>
          <FaGithub size={22} style={{ marginRight: 8 }} />
          <span>{t("Login with GitHub")}</span>
        </button>
      </div>
    </div>
  );
};

export default LoginSection;
