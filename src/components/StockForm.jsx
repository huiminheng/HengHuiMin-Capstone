import { useState } from "react";

function StockForm({ onAddStock }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!symbol || !quantity || !price) {
      alert("Please fill in all fields");
      return;
    }

    const newStock = {
      symbol: symbol.toUpperCase(),
      quantity: Number(quantity),
      price: Number(price),
      id: Date.now(),
    };

    onAddStock(newStock);

    // Clear form
    setSymbol("");
    setQuantity("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Stock Symbol (e.g., AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={styles.input}
      />

      <input
        type="number"
        step="0.01"
        placeholder="Purchase Price per Share"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>
        Add Stock
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
    padding: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    flex: 1,
    minWidth: "150px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};

export default StockForm;
