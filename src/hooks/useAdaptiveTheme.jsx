import { useEffect } from "react";

const useAdaptiveTheme = (currentTheme, setCurrentTheme) => {
  useEffect(() => {
    if (currentTheme !== "iosAuto") return;

    const updateTheme = () => {
      if (!navigator.geolocation) {
        console.warn("Geolocation not supported");
        fallbackTheme();
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const { latitude, longitude } = coords;
            const res = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`);
            const data = await res.json();

            if (data.status !== "OK") {
              fallbackTheme();
              return;
            }

            const now = new Date();
            const sunrise = new Date(data.results.sunrise);
            const sunset = new Date(data.results.sunset);
            const isNight = now < sunrise || now > sunset;

            setCurrentTheme(isNight ? "iosDark" : "ios");
          } catch (error) {
            console.error("Can't get theme from time:", error);
            fallbackTheme();
          }
        },
        (err) => {
          console.warn("⚠️ Geo fallback:", err.message);
          fallbackTheme();
        }
      );
    };

    const fallbackTheme = () => {
      const hour = new Date().getHours();
      const isNight = hour < 7 || hour > 19;
      setCurrentTheme(isNight ? "iosDark" : "ios");
    };

    updateTheme();
    const interval = setInterval(updateTheme, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [currentTheme, setCurrentTheme]);
};

export default useAdaptiveTheme;
