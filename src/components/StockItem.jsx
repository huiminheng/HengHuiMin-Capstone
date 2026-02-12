import { usePrices } from "../contexts/PriceContext";

function StockItem({ stock, calculateProfitLoss, getProfitLossColor }) {
  const { prices } = usePrices();
  const cp = prices[stock.symbol];
  const currentPrice = cp && cp.price;
  const error = cp && cp.error;
  const profitLoss =
    currentPrice !== undefined
      ? calculateProfitLoss(stock.price, currentPrice, stock.quantity)
      : null;

  return (
    <li>
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
}

export default StockItem;
