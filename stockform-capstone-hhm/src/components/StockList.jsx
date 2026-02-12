import StockItem from "./StockItem";

function StockList({ stocks, calculateProfitLoss, getProfitLossColor }) {
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
