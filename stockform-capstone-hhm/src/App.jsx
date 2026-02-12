import { useState } from "react";
import StockForm from "./components/StockForm";

function App() {
  const [stocks, setStocks] = useState([]);

  const handleAddStock = (stock) => {
    setStocks([...stocks, stock]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Finance Dashboard</h1>

      <StockForm onAddStock={handleAddStock} />

      <h2>Stock List</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            {stock.symbol} — {stock.quantity} shares @ ${stock.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
