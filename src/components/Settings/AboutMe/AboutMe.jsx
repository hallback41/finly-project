import styles from "./AboutMe.module.scss";
import { useTranslation, Trans } from "react-i18next";

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["settings__footer"]}>
      <div className={styles["settings__about"]}>
        <p>
          <Trans i18nKey="about.like">
            🚀 Like this app? <span>Hire its creator!</span>
          </Trans>
          <br />
          {t("about.intro")}
          <br />
          <Trans i18nKey="about.email">
            📬 Drop me a line: <a href="mailto:hallback41@gmail.com">hallback41@gmail.com</a>
          </Trans>
        </p>
        <div className={styles["settings__socials"]}>
          <a href="https://github.com/hallback41" target="_blank" rel="noopener noreferrer">
            {t("about.github")}
          </a>
          <a href="https://www.linkedin.com/in/vladislav-miekh-53b864112/" target="_blank" rel="noopener noreferrer">
            {t("about.linkedin")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
