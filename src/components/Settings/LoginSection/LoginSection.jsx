import style from "./LoginSection.module.scss";
import { FaGoogle, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";

const LoginSection = () => {
  return (
    <div className={style.loginSection}>
      <h2 className={style.loginSection__title}>Login:</h2>
      <div className={style.loginSection__buttons}>
        <button className={style.loginSection__btn + " " + style.google}>
          <FaGoogle size={22} style={{ marginRight: 8 }} />
          <span>Login with Google</span>
        </button>
        <button className={style.loginSection__btn + " " + style.facebook}>
          <FaFacebookF size={22} style={{ marginRight: 8 }} />
          <span>Login with Facebook</span>
        </button>
        <button className={style.loginSection__btn + " " + style.twitter}>
          <FaTwitter size={22} style={{ marginRight: 8 }} />
          <span>Login with Twitter</span>
        </button>
        <button className={style.loginSection__btn + " " + style.github}>
          <FaGithub size={22} style={{ marginRight: 8 }} />
          <span>Login with GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default LoginSection;
