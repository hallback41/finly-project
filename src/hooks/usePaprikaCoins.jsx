import { useState, useEffect } from "react";

export const usePaprikaCoins = (limit = 50) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((data) => {
        setCoins(
          data
            .sort((a, b) => a.rank - b.rank)
            .slice(0, limit)
            .map((c) => ({
              id: c.id,
              name: c.name,
              symbol: c.symbol,
              price: c.quotes.USD.price,
              rank: c.rank,
              icon: `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/${c.symbol.toLowerCase()}.svg`,
            }))
        );
        setLoading(false);
      });
  }, [limit]);

  return { coins, loading };
};
