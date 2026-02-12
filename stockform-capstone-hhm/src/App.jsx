import { useState, useCallback } from "react";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import { usePrices } from "./contexts/PriceContext";
import "./App.css";

function App() {
  const [stocks, setStocks] = useState([]);
  const { fetchPrice } = usePrices();

  const handleAddStock = useCallback(
    (stock) => {
      setStocks((prev) => [...prev, stock]);
      fetchPrice(stock.symbol);
    },
    [fetchPrice],
  );

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
    <div className="app">
      <h1>📊 Finance Dashboard</h1>
      <div className="main-content-align">
        <StockForm onAddStock={handleAddStock} />
        <h2 className="stock-list-heading">Stock List</h2>
        <StockList
          stocks={stocks}
          calculateProfitLoss={calculateProfitLoss}
          getProfitLossColor={getProfitLossColor}
        />
      </div>
    </div>
  );
}

export default App;
