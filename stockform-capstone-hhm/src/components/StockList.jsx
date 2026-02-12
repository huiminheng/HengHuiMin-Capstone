import StockItem from "./StockItem";

function StockList({ stocks, calculateProfitLoss, getProfitLossColor }) {
  if (!stocks || stocks.length === 0) {
    return <div>No stocks available. Please add a stock.</div>;
  }
  return (
    <ul>
      {stocks.map((stock) => (
        <StockItem
          key={stock.id}
          stock={stock}
          calculateProfitLoss={calculateProfitLoss}
          getProfitLossColor={getProfitLossColor}
        />
      ))}
    </ul>
  );
}

export default StockList;
