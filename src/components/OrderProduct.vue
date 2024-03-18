<template>
    <div class="container">
      <div>
        <h2>Tất cả đơn hàng</h2>
        <!-- Hiển thị danh sách đơn hàng -->
        <ul>
          <li v-for="order in orders" :key="order.MaDonHang">
            {{ order.tenKH }} - {{ order.tenNhanVienBanHang }} - {{ order.diaChi }} - {{ order.phuongThucThanhToan }} - {{ order.price }} - {{ order.thoiGianDatHang }}
            <!-- Nút xóa đơn hàng -->
            <button @click="deleteOrder(order.maDonHang)">Xóa</button>
            <!-- Nút sửa đơn hàng -->
            <button @click="editOrder(order)">Sửa</button>
          </li>
        </ul>
      </div>
  
      <!-- Form thêm/sửa đơn hàng -->
      <div>
        <h2 v-if="editMode">Sửa thông tin đơn hàng</h2>
        <h2 v-else>Thêm đơn hàng</h2>
        <form @submit.prevent="editMode ? updateOrder() : addOrder()">
          <input type="text" v-model="editedOrder.TenKH" placeholder="Tên khách hàng" required />
          <input type="text" v-model="editedOrder.TenNhanVienBanHang" placeholder="Tên nhân viên bán hàng" required />
          <input type="text" v-model="editedOrder.DiaChi" placeholder="Địa chỉ" required />
          <input type="text" v-model="editedOrder.PhuongThucThanhToan" placeholder="Phương thức thanh toán" required />
          <input type="number" v-model="editedOrder.Price" placeholder="Giá" required />
          <input type="datetime-local" v-model="editedOrder.ThoiGianDatHang" required />
          <button type="submit">{{ editMode ? "Cập nhật" : "Thêm" }}</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        orders: [],
        editedOrder: {
          TenKH: "",
          TenNhanVienBanHang: "",
          DiaChi: "",
          PhuongThucThanhToan: "",
          Price: 0,
          ThoiGianDatHang: "",
        },
        editMode: false,
      };
    },
    created() {
      this.getAllOrders();
    },
    methods: {
      getAllOrders() {
        axios
          .get("https://localhost:7202/api/Order")
          .then((response) => {
            this.orders = response.data;
          })
          .catch((error) => {
            console.error("Lỗi khi lấy danh sách đơn hàng", error);
          });
      },
      addOrder() {
        axios
          .post("https://localhost:7202/api/Order", this.editedOrder)
          .then((response) => {
            console.log(response.data);
            this.getAllOrders();
            this.resetForm();
          })
          .catch((error) => {
            console.error("Lỗi khi thêm đơn hàng", error);
          });
      },
      editOrder(order) {
        this.editedOrder = { ...order };
        this.editMode = true;
      },
      updateOrder() {
        axios
          .put(`https://localhost:7202/api/Order`, this.editedOrder)
          .then((response) => {
            console.log(response.data);
            this.getAllOrders();
            this.resetForm();
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật đơn hàng", error);
          });
      },
      deleteOrder(id) {
        axios
          .delete(`https://localhost:7202/api/Order/${id}`)
          .then((response) => {
            console.log(response.data);
            this.getAllOrders();
          })
          .catch((error) => {
            console.error("Lỗi khi xóa đơn hàng", error);
          });
      },
      resetForm() {
        this.editMode = false;
        this.editedOrder = {
          TenKH: "",
          TenNhanVienBanHang: "",
          DiaChi: "",
          PhuongThucThanhToan: "",
          Price: 0,
          ThoiGianDatHang: "",
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  li:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }
  
  button {
    padding: 10px 20px;
    margin: 1px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  button.delete {
    background-color: #dc3545; /* Màu đỏ */
  }
  
  button.edit {
    background-color: #28a745; /* Màu xanh lá cây */
  }
  
  button:hover {
    background-color: #0056b3; /* Màu xanh dương sáng hơn khi hover */
  }
  
  input[type="text"],
  input[type="number"],
  input[type="datetime-local"] {
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
  }
  
  input[type="text"]:focus,
  input[type="number"]:focus,
  input[type="datetime-local"]:focus {
    border-color: #007bff; /* Màu xanh dương */
  }
  
  form {
    margin-top: 20px;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 28px;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid #007bff; /* Màu xanh dương */
    padding-bottom: 10px;
  }
  </style>
  