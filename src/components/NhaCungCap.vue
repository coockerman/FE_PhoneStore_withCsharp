<template>
  <div class="container">
    <div>
      <h2>Tất cả nhà cung cấp</h2>
      <!-- Hiển thị danh sách nhà cung cấp -->
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="nhaCungCap in nhaCungCaps" :key="nhaCungCap.id">
              <!-- Tên nhà cung cấp -->
              <td>{{ nhaCungCap.tenNCC }}</td>
              <!-- Số điện thoại -->
              <td>{{ nhaCungCap.sdt }}</td>
              <!-- Địa chỉ -->
              <td>{{ nhaCungCap.diaChi }}</td>
              <!-- Nút xóa nhà cung cấp -->
              <td>
                <button
                  @click="deleteNhaCungCap(nhaCungCap.maNCC)"
                  class="btn btn-delete"
                >
                  Xóa
                </button>
                <!-- Nút sửa nhà cung cấp -->
                <button
                  @click="editNhaCungCap(nhaCungCap)"
                  class="btn btn-edit"
                >
                  Sửa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Form thêm/sửa nhà cung cấp -->
    <div>
      <h2 v-if="editMode">Sửa thông tin nhà cung cấp</h2>
      <h2 v-else>Thêm nhà cung cấp</h2>
      <form @submit.prevent="editMode ? updateNhaCungCap() : addNhaCungCap()">
        <!-- Tên nhà cung cấp -->
        <input
          type="text"
          v-model="editedNhaCungCap.tenNCC"
          placeholder="Tên nhà cung cấp"
          required
        />
        <!-- Số điện thoại -->
        <input
          type="text"
          v-model="editedNhaCungCap.sdt"
          placeholder="Số điện thoại"
          required
        />
        <!-- Địa chỉ -->
        <input
          type="text"
          v-model="editedNhaCungCap.diaChi"
          placeholder="Địa chỉ"
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
      nhaCungCaps: [],
      editedNhaCungCap: {
        tenNCC: "",
        sdt: "",
        diaChi: "",
      },
      editMode: false,
    };
  },
  created() {
    this.getAllNhaCungCaps();
  },
  methods: {
    getAllNhaCungCaps() {
      axios
        .get("https://localhost:7202/api/NCC")
        .then((response) => {
          this.nhaCungCaps = response.data;
        })
        .catch((error) => {
          console.error("Lỗi khi lấy danh sách nhà cung cấp", error);
        });
    },
    addNhaCungCap() {
      axios
        .post("https://localhost:7202/api/NCC", this.editedNhaCungCap)
        .then((response) => {
          console.log(response.data);
          this.getAllNhaCungCaps();
          this.resetForm();
        })
        .catch((error) => {
          console.error("Lỗi khi thêm nhà cung cấp", error);
        });
    },
    editNhaCungCap(nhaCungCap) {
      this.editedNhaCungCap = { ...nhaCungCap };
      this.editMode = true;
    },
    updateNhaCungCap() {
      axios
        .put(`https://localhost:7202/api/NCC`, this.editedNhaCungCap)
        .then((response) => {
          console.log(response.data);
          this.getAllNhaCungCaps();
          this.resetForm();
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật nhà cung cấp", error);
        });
    },
    deleteNhaCungCap(id) {
      axios
        .put(`https://localhost:7202/api/NCC/${id}/toggleVisibility`)
        .then((response) => {
          console.log(response.data);
          this.getAllNhaCungCaps();
        })
        .catch((error) => {
          console.error(
            "Lỗi khi thay đổi trạng thái hiển thị nhà cung cấp",
            error
          );
        });
    },
    resetForm() {
      this.editMode = false;
      this.editedNhaCungCap = {
        tenNCC: "",
        sdt: "",
        diaChi: "",
      };
    },
  },
};
</script>

<style>
.container {
  margin: 20px auto;
  max-width: 800px;
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
  background-color: #007bff;
  color: #fff;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-delete {
  background-color: #ff4d4f; /* Màu đỏ */
  color: #fff; /* Màu chữ là trắng */
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
