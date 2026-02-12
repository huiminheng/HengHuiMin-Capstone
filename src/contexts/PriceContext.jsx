import { createContext, useContext } from "react";
import useStockPrices from "../hooks/useStockPrices";

const PriceContext = createContext();

export const PriceProvider = ({ apiKey, children }) => {
  const { prices, fetchPrice } = useStockPrices(apiKey);
  return (
    <PriceContext.Provider value={{ prices, fetchPrice }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrices = () => useContext(PriceContext);
