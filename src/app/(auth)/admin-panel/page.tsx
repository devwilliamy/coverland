import Admin from "@/components/admin-panel/Admin";
import { getAllAdminPanelOrders } from "@/lib/db/admin-panel/orders";

export default async function AdminPage() {
  // const response = await getAllAdminPanelOrders();
  // console.log("Response:", response)
  return <Admin />;
}
