import { useState, useEffect } from "react";

export const useGeckoCoins = (limit = 50, refreshInterval = 900000) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoins = () => {
    setLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
    )
      .then((res) => res.json())
      .then((data) => {
        setCoins(
          data.map((c) => ({
            id: c.id,
            name: c.name,
            symbol: c.symbol,
            price: c.current_price,
            rank: c.market_cap_rank,
            icon: c.image,
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, refreshInterval);
    return () => clearInterval(interval);
  }, [limit, refreshInterval]);

  return { coins, loading };
};
