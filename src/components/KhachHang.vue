<template>
  <div class="container">
    <div>
      <h2>Tất cả khách hàng</h2>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Giới tính</th>
              <th>Địa chỉ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="khachHang in khachHangs" :key="khachHang.maKH">
              <td>{{ khachHang.tenKH }}</td>
              <td>{{ khachHang.sdt }}</td>
              <td>{{ khachHang.gioiTinh }}</td>
              <td>{{ khachHang.diaChi }}</td>
              <td>
                <button class="btn-delete" @click="deleteKhachHang(khachHang.maKH)">
                  Xóa
                </button>
                <button class="btn-edit" @click="editKhachHang(khachHang)">
                  Sửa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h2>{{ editMode ? "Sửa thông tin khách hàng" : "Thêm khách hàng" }}</h2>
      <form @submit.prevent="editMode ? updateKhachHang() : addKhachHang()">
        <input type="text" v-model="newKhachHang.tenKH" placeholder="Tên" required />
        <input type="text" v-model="newKhachHang.sdt" placeholder="Số điện thoại" required />

        <select v-model="newKhachHang.gioiTinh" required>
          <option value="" disabled hidden>Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>

        <input type="text" v-model="newKhachHang.diaChi" placeholder="Địa chỉ" required />

        <button type="submit" class="btn">{{ editMode ? "Cập nhật" : "Thêm" }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      khachHangs: [],
      newKhachHang: {
        tenKH: "",
        sdt: "",
        gioiTinh: "",
        diaChi: "",
      },
      editMode: false,
    };
  },
  created() {
    this.getAllKhachHangs();
  },
  methods: {
    getAllKhachHangs() {
      axios
        .get("https://localhost:7202/api/KhachHang_")
        .then((response) => {
          this.khachHangs = response.data;
        })
        .catch((error) => {
          console.error("Lỗi khi lấy danh sách khách hàng", error);
        });
    },
    addKhachHang() {
      axios
        .post("https://localhost:7202/api/KhachHang_", this.newKhachHang)
        .then((response) => {
          console.log(response.data);
          this.getAllKhachHangs();
          this.resetForm();
        })
        .catch((error) => {
          console.error("Lỗi khi thêm khách hàng", error);
        });
    },
    editKhachHang(khachHang) {
      // Đặt dữ liệu của khách hàng vào biến newKhachHang để chỉnh sửa
      this.newKhachHang = { ...khachHang };
      this.editMode = true; // Chuyển sang chế độ sửa
    },
    updateKhachHang() {
      axios
        .put(`https://localhost:7202/api/KhachHang_`, this.newKhachHang)
        .then((response) => {
          console.log(response.data);
          this.getAllKhachHangs();
          this.resetForm();
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật khách hàng", error);
        });
    },
    deleteKhachHang(id) {
    axios.put(`https://localhost:7202/api/KhachHang_/${id}/toggleVisibility`)
        .then((response) => {
            console.log(response.data);
            this.getAllKhachHangs();
        })
        .catch((error) => {
            console.error("Lỗi khi ẩn khách hàng", error);
        });
},
    resetForm() {
      // Xóa dữ liệu trong form sau khi thêm hoặc sửa
      this.newKhachHang = {
        tenKH: "",
        sdt: "",
        gioiTinh: "",
        diaChi: "",
      };
      this.editMode = false; // Chuyển về chế độ thêm mới
    },
  },
};
</script>

<style>
:root {
  --primary-color: #007bff;
  --danger-color: #dc3545;
  --success-color: #28a745;
}

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

button,
button.delete,
button.edit {
  padding: 10px 20px;
  cursor: pointer;
  color: #fff;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button {
  background-color: var(--primary-color);
}

button.delete {
  background-color: var(--danger-color);
}

button.edit {
  background-color: var(--success-color);
}

button:hover,
button.delete:hover,
button.edit:hover {
  filter: brightness(0.9);
}

input[type="text"],
select {
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
select:focus {
  border-color: var(--primary-color);
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
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 10px;
}
</style>
