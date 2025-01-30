import { FC } from "react";
import Payment from "@/components/Payment";

const Home:FC = () => {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Midtrans Integration</h1>
      <Payment />
    </div>
  )
}

export default Home;