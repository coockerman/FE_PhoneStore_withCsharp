<template>
  <div class="container">
    <div>
      <h2>Tất cả nhà cung cấp</h2>
      <!-- Hiển thị danh sách nhà cung cấp -->
      <ul>
        <li v-for="nhaCungCap in nhaCungCaps" :key="nhaCungCap.id">
          {{ nhaCungCap.tenNCC }} - {{ nhaCungCap.sdt }} - {{ nhaCungCap.diaChi }}
          <!-- Nút xóa nhà cung cấp -->
          <button @click="deleteNhaCungCap(nhaCungCap.maNCC)">Xóa</button>
          <!-- Nút sửa nhà cung cấp -->
          <button @click="editNhaCungCap(nhaCungCap)">Sửa</button>
        </li>
      </ul>
    </div>

    <!-- Form thêm/sửa nhà cung cấp -->
    <div>
      <h2 v-if="editMode">Sửa thông tin nhà cung cấp</h2>
      <h2 v-else>Thêm nhà cung cấp</h2>
      <form @submit.prevent="editMode ? updateNhaCungCap() : addNhaCungCap()">
        <input type="text" v-model="editedNhaCungCap.tenNCC" placeholder="Tên nhà cung cấp" required />
        <input type="text" v-model="editedNhaCungCap.sdt" placeholder="Số điện thoại" required />
        <input type="text" v-model="editedNhaCungCap.diaChi" placeholder="Địa chỉ" required />
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
        .delete(`https://localhost:7202/api/NCC/${id}`)
        .then((response) => {
          console.log(response.data);
          this.getAllNhaCungCaps();
        })
        .catch((error) => {
          console.error("Lỗi khi xóa nhà cung cấp", error);
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

input[type="text"] {
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus {
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
