import { createWebHistory, createRouter } from "vue-router";
import KhachHang from "../components/KhachHang.vue";
import NhaCungCap from "../components/NhaCungCap.vue";
import UserMain from "../components/UserMain.vue";
import PhoneProduct from "../components/PhoneProduct.vue";
import OrderProduct from "../components/OrderProduct.vue";
import ThongKe from "../components/ChartComponent.vue";

const routes = [
    {
      path: "/khachhang",
      name: "KhachHang",
      component: KhachHang,
    },
    {
      path: "/nhacungcap",
      name: "NhaCungCap",
      component: NhaCungCap,
    },
    {
      path: "/userMain",
      name: "UserMain",
      component: UserMain,
    },
    {
      path: "/phoneProduct",
      name: "PhoneProduct",
      component: PhoneProduct,
    },
    {
      path: "/orderProduct",
      name: "OrderProduct",
      component: OrderProduct,
    },
    {
      path: "/ThongKe",
      name: "ThongKe",
      component: ThongKe,
    }
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;