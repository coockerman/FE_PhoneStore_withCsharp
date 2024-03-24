<template>
  <div class="container">
    <div>
      <h2>Tất cả đơn hàng</h2>
      <!-- Hiển thị danh sách đơn hàng -->
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Nhân viên bán</th>
              <th>Địa chỉ</th>
              <th>Thanh toán</th>
              <th>Giá</th>
              <th>Thời gian</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.MaDonHang">
              <!-- Tên khách hàng -->
              <td>{{ order.tenKH }}</td>
              <!-- Tên nhân viên bán hàng -->
              <td>{{ order.tenUser }}</td>
              <!-- Địa chỉ -->
              <td>{{ order.diaChi }}</td>
              <!-- Phương thức thanh toán -->
              <td>{{ order.phuongThucThanhToan }}</td>
              <!-- Giá -->
              <td>{{ order.price }}</td>
              <!-- Thời gian đặt hàng -->
              <td>{{ order.thoiGianDatHang }}</td>
              <!-- Nút xóa và sửa đơn hàng -->
              <td>
                <button
                  @click="deleteOrder(order.maDonHang)"
                  class="btn btn-delete"
                >
                  Xóa
                </button>
                <button @click="editOrder(order)" class="btn btn-edit">
                  Sửa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Form thêm/sửa đơn hàng -->
    <div>
      <h2 v-if="editMode">Sửa thông tin đơn hàng</h2>
      <h2 v-else>Thêm đơn hàng</h2>
      <form @submit.prevent="editMode ? updateOrder() : addOrder()">

        <select v-model="editedOrder.tenKH" required>
          <option value="" disabled selected hidden>Chọn khách hàng</option>
          <option
            v-for="customer in customers"
            :key="customer.MaKH"
            :value="customer.tenKH"
          >
            {{ customer.tenKH }}
          </option>
        </select>

        <select v-model="editedOrder.tenUser" required>
          <option value="" disabled selected hidden>
            Chọn nhân viên bán hàng
          </option>
          <option
            v-for="employee in employees"
            :key="employee.MaUser"
            :value="employee.tenUser"
          >
            {{ employee.tenUser }}
          </option>
        </select>
        <input
          type="text"
          v-model="editedOrder.diaChi"
          placeholder="Địa chỉ"
          required
        />
        <input
          type="text"
          v-model="editedOrder.phuongThucThanhToan"
          placeholder="Phương thức thanh toán"
          required
        />
        <input
          type="number"
          v-model="editedOrder.price"
          placeholder="Giá"
          required
        />
        <input
          type="datetime-local"
          v-model="editedOrder.thoiGianDatHang"
          required
        />
        <button type="submit" class="btn">
          {{ editMode ? "Cập nhật" : "Thêm" }}
        </button>
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
        tenKH: "",
        tenUser: "",
        diaChi: "",
        phuongThucThanhToan: "",
        price: 0,
        thoiGianDatHang: "",
      },
      customers: [], // Danh sách khách hàng
      employees: [], // Danh sách nhân viên bán hàng
      editMode: false,
    };
  },
  created() {
    this.getAllOrders();
    this.getAllCustomers();
    this.getAllEmployees();
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
    getAllCustomers() {
      axios
        .get("https://localhost:7202/api/KhachHang_")
        .then((response) => {
          this.customers = response.data;
        })
        .catch((error) => {
          console.error("Lỗi khi lấy danh sách khách hàng", error);
        });
    },
    getAllEmployees() {
      axios
        .get("https://localhost:7202/api/User")
        .then((response) => {
          this.employees = response.data;
        })
        .catch((error) => {
          console.error("Lỗi khi lấy danh sách nhân viên", error);
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
        tenKH: "",
        tenUser: "",
        diaChi: "",
        phuongThucThanhToan: "",
        price: 0,
        thoiGianDatHang: "",
      };
    },
  },
};
</script>
  
  <style>
.container {
  margin: 20px auto;
  max-width: 1200px;
  font-family: Arial, sans-serif;
}

.table-container {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}

.btn {
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

.btn-delete {
  background-color: #ff4d4f; /* Màu đỏ */
  color: #fff; /* Màu chữ là trắng */
  margin-right: 5px;
}

.btn-delete:hover {
  background-color: #d93636; /* Màu khi di chuột vào */
}

.btn-edit {
  background-color: #52c41a; /* Màu xanh lá cây */
  color: #fff; /* Màu chữ là trắng */
}

.btn-edit:hover {
  background-color: #389e0d; /* Màu khi di chuột vào */
}
</style>
  