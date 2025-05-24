import styles from "./AboutMe.module.scss";

const AboutMe = () => {
  return (
    <div className={styles["settings__footer"]}>
      <div className={styles["settings__about"]}>
        <p>
          🚀 Like this app? <span>Hire its creator!</span>
          <br />
          👋 I’m Vlad — React & JS enthusiast, UI/UX perfectionist, and a true team player.
          <br />
          📬 Drop me a line: <a href="mailto:hallback41@gmail.com">hallback41@gmail.com</a>
        </p>
        <div className={styles["settings__socials"]}>
          <a href="https://github.com/hallback41" target="_blank" rel="noopener noreferrer">
            🐙 GitHub
          </a>
          <a href="https://www.linkedin.com/in/vladislav-miekh-53b864112/" target="_blank" rel="noopener noreferrer">
            💼 LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
