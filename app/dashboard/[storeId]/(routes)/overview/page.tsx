import { getTotalRevenue,getTotalStock,getTotalOrders, getGraphData } from "@/actions";
import Heading from "@/components/Heading";
import OverView from "@/components/OverView";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatedPrice } from "@/utils";
import { CreditCard, LucideBadgeDollarSign, Package } from "lucide-react";
const page = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const totalRevenue = await getTotalRevenue(storeId);
  const totalSales = await getTotalOrders(storeId);
  const stockCount = await getTotalStock(storeId);
  const graphdata = await getGraphData(storeId)
  return (
    <div className="h-full  overflow-x-hidden max-w-full">
      <Heading title="Overview" description="Overview your total Income" />

      <div className="grid my-10 grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4   w-full">
        <Card>
          <CardHeader>
            <CardTitle className="flex font-medium  max-lg:text-lg  items-center justify-between">
              Total Revenue <LucideBadgeDollarSign />
            </CardTitle>
            <p className="text-2xl font-bold ">{formatedPrice(totalRevenue)}</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex font-medium  max-lg:text-lg  items-center justify-between">
              Total Sales <CreditCard />
            </CardTitle>
            <p className="text-2xl font-bold ">+{totalSales}</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex max-lg:text-lg font-medium  items-center justify-between">
              Products in Stock
              <Package />
            </CardTitle>
            <p className="text-2xl font-bold ">{stockCount}</p>
          </CardHeader>
        </Card>
      </div>
      <div className=" w-[1200px] max-md:w-[350px] max-w-5xl mx-auto  h-full overflow-auto">
        <OverView data={graphdata}/>
      </div>
      
    </div>
  );
};

export default page;
