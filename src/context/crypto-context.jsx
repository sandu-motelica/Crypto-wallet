import { createContext } from "react";
import { useEffect, useState } from "react";
import { fakeFetchCrypto, fetchAssets } from "../api";
import { precentDifference } from "../utils";

const CryptoContext = createContext({
  asserts: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();

      setAssets(
        assets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id);
          return {
            grow: coin.price > asset.price,
            growPrecent: precentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        })
      );
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;
