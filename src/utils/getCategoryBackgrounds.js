const importAllBackgrounds = import.meta.glob("/src/assets/images/backgrounds/*/*.webp", { eager: true });

const categoryBackgrounds = {};

for (const path in importAllBackgrounds) {
  const [, theme, file] = path.match(/backgrounds\/([^/]+)\/([^/]+)\.(webp)$/);
  const [category] = file.split("--");

  if (!categoryBackgrounds[theme]) {
    categoryBackgrounds[theme] = {};
  }

  categoryBackgrounds[theme][category] = importAllBackgrounds[path].default;
}

export default categoryBackgrounds;
