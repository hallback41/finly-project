import React, { useState } from "react";

// Первая заглушка — по символу
const fallbackUrl = (symbol) =>
  `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png`;
// Финальная — всегда биткоин, если даже по символу не грузится
const finalFallbackUrl = "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/btc.svg";

const ImageWithFallback = ({ src, alt, symbol, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [fallbackTried, setFallbackTried] = useState(false);

  return (
    <img
      src={imgSrc}
      alt={alt}
      {...props}
      onError={() => {
        // Если пробовали только оригинал — пробуем по символу
        if (!fallbackTried) {
          setImgSrc(fallbackUrl(symbol));
          setFallbackTried(true);
        } else {
          // Уже пробовали fallback — ставим финальный
          setImgSrc(finalFallbackUrl);
        }
      }}
    />
  );
};

export default ImageWithFallback;
