import { Layout } from "antd";
import AppHeader from "./components/loyout/AppHeader";
import AppSider from "./components/loyout/AppSider";
import AppContent from "./components/loyout/AppContent";

export default function App() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
