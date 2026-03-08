import { menuData } from "@/data/menu";
import { MenuAndCart } from "@/components/MenuAndCart";

export default function Home() {
  return <MenuAndCart menuData={menuData} />;
}
