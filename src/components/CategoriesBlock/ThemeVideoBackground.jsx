import React from "react";
import styles from "./CategoriesBlock.module.scss";

const ThemeVideoBackground = ({ theme }) => {
  const sources = {
    ios: "/videos/ios-bg.mp4",
    iosDark: "/videos/ios-bg-dark.mp4",
  };

  const videoSrc = sources[theme];
  if (!videoSrc) return null;

  return (
    <video
      key={theme}
      crossOrigin="anonymous"
      className={styles["categories__bg-video"]}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      controlsList="nodownload noremoteplay nofullscreen"
      tabIndex={-1}
      aria-hidden="true"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};

export default ThemeVideoBackground;
