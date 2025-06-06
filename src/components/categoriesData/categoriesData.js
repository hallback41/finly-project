const categories = [
  {
    id: "food",
    name: "FOOD",
    color: "#D47C38",
    type: "expense",
    priority: "high",
    monthlyLimit: 5000,
    createdAt: "2025-04-08T11:00:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/food.gif",
      fantasy: "/icons/fantasy/food.gif",
      oldSchool: "/icons/oldSchool/food.gif",
      cyberpunk: "/icons/cyberpunk/food.gif",
    },
  },
  {
    id: "home",
    name: "HOME",
    color: "#8B6D44",
    type: "expense",
    priority: "normal",
    monthlyLimit: 8000,
    createdAt: "2025-04-08T11:01:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/home.gif",
      fantasy: "/icons/fantasy/home.gif",
      oldSchool: "/icons/oldSchool/home.gif",
      cyberpunk: "/icons/cyberpunk/home.gif",
    },
  },
  {
    id: "medicine",
    name: "MEDICINE",
    color: "#5A97CA",
    type: "expense",
    priority: "normal",
    monthlyLimit: 2000,
    createdAt: "2025-04-08T11:02:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/medicine.gif",
      fantasy: "/icons/fantasy/medicine.gif",
      oldSchool: "/icons/oldSchool/medicine.gif",
      cyberpunk: "/icons/cyberpunk/medicine.gif",
    },
  },
  {
    id: "fun",
    name: "FUN",
    color: "#D8A33D",
    type: "expense",
    priority: "normal",
    monthlyLimit: 3000,
    createdAt: "2025-04-08T11:03:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/fun.gif",
      fantasy: "/icons/fantasy/fun.gif",
      oldSchool: "/icons/oldSchool/fun.gif",
      cyberpunk: "/icons/cyberpunk/fun.gif",
    },
  },
  {
    id: "clothes",
    name: "CLOTHES",
    color: "#AB4D4D",
    type: "expense",
    priority: "low",
    monthlyLimit: 2500,
    createdAt: "2025-04-08T11:04:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/clothes.gif",
      fantasy: "/icons/fantasy/clothes.gif",
      oldSchool: "/icons/oldSchool/clothes.gif",
      cyberpunk: "/icons/cyberpunk/clothes.gif",
    },
  },
  {
    id: "hobby",
    name: "HOBBY",
    color: "#8D52A1",
    type: "expense",
    priority: "low",
    monthlyLimit: 3000,
    createdAt: "2025-04-08T11:05:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/hobby.gif",
      fantasy: "/icons/fantasy/hobby.gif",
      oldSchool: "/icons/oldSchool/hobby.gif",
      cyberpunk: "/icons/cyberpunk/hobby.gif",
    },
  },
  {
    id: "pets",
    name: "PETS",
    color: "#C96A45",
    type: "expense",
    priority: "normal",
    monthlyLimit: 2000,
    createdAt: "2025-04-08T11:06:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/pets.gif",
      fantasy: "/icons/fantasy/pets.gif",
      oldSchool: "/icons/oldSchool/pets.gif",
      cyberpunk: "/icons/cyberpunk/pets.gif",
    },
  },
  {
    id: "restaurant",
    name: "RESTAURANT",
    color: "#D8D048",
    type: "expense",
    priority: "low",
    monthlyLimit: 3500,
    createdAt: "2025-04-08T11:07:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/restaurant.gif",
      fantasy: "/icons/fantasy/restaurant.gif",
      oldSchool: "/icons/oldSchool/restaurant.gif",
      cyberpunk: "/icons/cyberpunk/restaurant.gif",
    },
  },
  {
    id: "sport",
    name: "SPORT",
    color: "#7CC26E",
    type: "expense",
    priority: "normal",
    monthlyLimit: 2500,
    createdAt: "2025-04-08T11:08:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/sport.gif",
      fantasy: "/icons/fantasy/sport.gif",
      oldSchool: "/icons/oldSchool/sport.gif",
      cyberpunk: "/icons/cyberpunk/sport.gif",
    },
  },
  {
    id: "credits",
    name: "CREDITS",
    color: "#5E4230",
    type: "expense",
    priority: "high",
    monthlyLimit: 6000,
    createdAt: "2025-04-08T11:09:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/credits.gif",
      fantasy: "/icons/fantasy/credits.gif",
      oldSchool: "/icons/oldSchool/credits.gif",
      cyberpunk: "/icons/cyberpunk/credits.gif",
    },
  },
  {
    id: "internet",
    name: "INTERNET",
    color: "#68A2C8",
    type: "expense",
    priority: "normal",
    monthlyLimit: 800,
    createdAt: "2025-04-08T11:10:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/internet.gif",
      fantasy: "/icons/fantasy/internet.gif",
      oldSchool: "/icons/oldSchool/internet.gif",
      cyberpunk: "/icons/cyberpunk/internet.gif",
    },
  },
  {
    id: "personal",
    name: "PERSONAL",
    color: "#B5CB69",
    type: "expense",
    priority: "normal",
    monthlyLimit: 1500,
    createdAt: "2025-04-08T11:11:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/personal.gif",
      fantasy: "/icons/fantasy/personal.gif",
      oldSchool: "/icons/oldSchool/personal.gif",
      cyberpunk: "/icons/cyberpunk/personal.gif",
    },
  },
  {
    id: "car",
    name: "CAR",
    color: "#AD5757",
    type: "expense",
    priority: "normal",
    monthlyLimit: 5000,
    createdAt: "2025-04-08T11:12:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "./",
      fantasy: "/icons/fantasy/car.gif",
      oldSchool: "/icons/oldSchool/car.gif",
      cyberpunk: "/icons/cyberpunk/car.gif",
    },
  },
  {
    id: "savings",
    name: "SAVINGS",
    color: "#DCD269",
    type: "saving",
    priority: "high",
    monthlyLimit: 7000,
    createdAt: "2025-04-08T11:13:00.000Z",
    userId: "user_001",
    expenses: [],
    icons: {
      pixel: "/icons/pixel/savings.gif",
      fantasy: "/icons/fantasy/savings.gif",
      oldSchool: "/icons/oldSchool/savings.gif",
      cyberpunk: "/icons/cyberpunk/savings.gif",
    },
  },
];

export default categories;
