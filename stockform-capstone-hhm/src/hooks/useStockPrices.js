import { useState, useCallback } from "react";

export default function useStockPrices(apiKey) {
  const [prices, setPrices] = useState({});

  // useCallback keeps this function stable (doesn't recreate every render)
  const fetchPrice = useCallback(
    async (symbol) => {
      setPrices((prev) => ({
        ...prev,
        [symbol]: { fetching: true },
      }));

      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`,
        );

        // Check for HTTP errors
        if (!response.ok) {
          setPrices((prev) => ({
            ...prev,
            [symbol]: { error: `HTTP error: ${response.status}` },
          }));
          return;
        }

        const data = await response.json();

        if (data && data["Global Quote"] && data["Global Quote"]["05. price"]) {
          const price = parseFloat(data["Global Quote"]["05. price"]);
          if (price > 0) {
            setPrices((prev) => ({
              ...prev,
              [symbol]: { price },
            }));
            return;
          }
        }

        // Handle API-specific errors
        const err =
          (data && data.Note) ||
          (data && data["Error Message"]) ||
          "No price data available";
        setPrices((prev) => ({
          ...prev,
          [symbol]: { error: err },
        }));
      } catch (error) {
        setPrices((prev) => ({
          ...prev,
          [symbol]: { error: error.message || "Fetch error" },
        }));
      }
    },
    [apiKey],
  );

  return { prices, fetchPrice };
}
