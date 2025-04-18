const themes = import.meta.glob("@/assets/icons/ui/categorieGifs/**/**/*.webp", {
  eager: true,
});

const allIcons = Object.entries(themes).reduce((acc, [path, mod]) => {
  const match = path.match(/categorieGifs\/(.*?)\/(.*?)\.webp$/);
  if (!match) return acc;

  const [, theme, name] = match;
  acc[theme] ??= {};
  acc[theme][name] = mod.default;

  return acc;
}, {});

export default allIcons;
