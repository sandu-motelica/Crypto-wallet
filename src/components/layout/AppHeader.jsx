import { Layout, Select, Space, Button } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // backgroundColor: "#fff",
};
export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const { crypto } = useCrypto();
  function handleSelect(value) {
    console.log(value);
  }

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") setSelect(true);
      document.addEventListener("keypress", keypress);
      return () => document.remove("keypress", keypress);
    };
  }, []);

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        value="press / to open"
        onSelect={handleSelect}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary">Add Asset</Button>
    </Layout.Header>
  );
}
