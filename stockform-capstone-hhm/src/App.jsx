import { useState } from "react";
import StockForm from "./components/StockForm";

const API_KEY = "PY5454LK1DK9S6X2";

function App() {
  const [stocks, setStocks] = useState([]);
  const [currentPrices, setCurrentPrices] = useState({});

  const handleAddStock = (stock) => {
    setStocks((prev) => [...prev, stock]);
    // Fetch current price for the new stock
    fetchCurrentPrice(stock.symbol);
  };

  const fetchCurrentPrice = async (symbol) => {
    try {
      // mark as fetching
      setCurrentPrices((prev) => ({
        ...prev,
        [symbol]: { fetching: true },
      }));

      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`,
      );

      console.log("HTTP", response.status, "ok", response.ok);

      const data = await response.json();
      console.log("AlphaVantage response for", symbol, data);

      if (data && data["Global Quote"] && data["Global Quote"]["05. price"]) {
        const price = parseFloat(data["Global Quote"]["05. price"]);
        if (price > 0) {
          setCurrentPrices((prev) => ({
            ...prev,
            [symbol]: { price },
          }));
          return;
        }
      }

      // handle rate-limit, error message, or missing data
      const err =
        (data && data.Note) ||
        (data && data["Error Message"]) ||
        "No price data available";
      setCurrentPrices((prev) => ({
        ...prev,
        [symbol]: { error: err },
      }));
      console.warn(symbol, err);
    } catch (error) {
      setCurrentPrices((prev) => ({
        ...prev,
        [symbol]: { error: error.message || "Fetch error" },
      }));
      console.error("Error fetching price:", error);
    }
  };

  const calculateProfitLoss = (purchasePrice, currentPrice, quantity) => {
    const p = parseFloat(purchasePrice);
    const c = parseFloat(currentPrice);
    const q = Number(quantity);
    return (c - p) * q;
  };

  const getProfitLossColor = (profitLoss) => {
    return profitLoss >= 0 ? "#28a745" : "#dc3545";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Finance Dashboard</h1>

      <StockForm onAddStock={handleAddStock} />

      <h2>Stock List</h2>
      <ul>
        {stocks.map((stock) => {
          const cp = currentPrices[stock.symbol];
          const currentPrice = cp && cp.price;
          const error = cp && cp.error;
          const profitLoss =
            currentPrice !== undefined
              ? calculateProfitLoss(stock.price, currentPrice, stock.quantity)
              : null;

          return (
            <li key={stock.id}>
              <div>
                <strong>{stock.symbol}</strong> — {stock.quantity} shares @ $
                {parseFloat(stock.price).toFixed(2)}
              </div>

              {currentPrice !== undefined ? (
                <div style={{ marginLeft: "20px", fontSize: "14px" }}>
                  Current Price: ${currentPrice.toFixed(2)}
                  <br />
                  <span style={{ color: getProfitLossColor(profitLoss) }}>
                    Profit/Loss: ${profitLoss.toFixed(2)}
                  </span>
                </div>
              ) : error ? (
                <div
                  style={{
                    marginLeft: "20px",
                    fontSize: "14px",
                    color: "#dc3545",
                  }}
                >
                  Error: {error}
                </div>
              ) : (
                <div
                  style={{
                    marginLeft: "20px",
                    fontSize: "14px",
                    color: "#999",
                  }}
                >
                  Fetching current price...
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
