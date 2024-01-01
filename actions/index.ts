import prismadb from "@/lib/prismabd";

export const getTotalRevenue = async (storeId: string) => {
  const ordersList = await prismadb.order.findMany({
    where: { storeId, isPaid: true },
    include: {
      items: { include: { product: true } },
    },
  });

  const totalPrice = ordersList.reduce((total, current) => {
    const orderRev =
      total + current.items.reduce((t, c) => t + +c.product.price, 0);
    return total + orderRev;
  }, 0);
  return totalPrice;
};

export const getTotalStock = async (storeId: string) =>
  await prismadb.product.count({
    where: { storeId, isArchived: false },
  });
export const getTotalOrders = async (storeId: string) =>
  await prismadb.order.count({
    where: { storeId, isPaid: true },
  });

export const getGraphData = async (storeId: string) => {
  const ordersList = await prismadb.order.findMany({
    where: { storeId, isPaid: true },
    include: {
      items: { include: { product: true } },
    },
  });

  const monthlyRevenue = {};
  for (let order of ordersList) {
    const month = order.updatedAt.getMonth();
    const orderRev = order.items.reduce((t, c) => t + +c.product.price, 0);
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + orderRev;
  }

  let GraphData: { month: string; total: number }[] = [
    { month: "January", total: 0 },
    { month: "February", total: 0 },
    { month: "March", total: 0 },
    { month: "April", total: 0 },
    { month: "May", total: 0 },
    { month: "June", total: 0 },
    { month: "July", total: 0 },
    { month: "August", total: 0 },
    { month: "September", total: 0 },
    { month: "October", total: 0 },
    { month: "November", total: 0 },
    { month: "December", total: 0 },
  ];
  for (let i in monthlyRevenue) {
    GraphData[+i].total=monthlyRevenue[+i]
  }
  return (GraphData);
};
