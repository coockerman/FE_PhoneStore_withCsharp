<template>
  <div class="container">
    <div>
      <h2>Tất cả điện thoại</h2>
      <div class="sort-dropdown">
      <label for="sort">Sắp xếp:</label>
      <select v-model="sortBy" @change="sortItems">
        <option value="name">Theo tên</option>
        <option value="price">Theo giá</option>
      </select>
      <select v-model="sortOrder" @change="sortItems">
        <option value="asc">Tăng dần</option>
        <option value="desc">Giảm dần</option>
      </select>
    </div>
      <!-- Hiển thị danh sách điện thoại dưới dạng bảng -->
      <table class="table">
        <thead>
          <tr>
            <th>Tên điện thoại</th>
            <th>Loại</th>
            <th>Màu sắc</th>
            <th>Nhà cung cấp</th>
            <th>Giá(đồng)</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="phone in phones" :key="phone.maPhone">
            <td>{{ phone.tenPhone }}</td>
            <td>{{ phone.loai }}</td>
            <td>{{ phone.mauSac }}</td>
            <td>{{ phone.nhaCungCapId }}</td>
            <td>{{ phone.price }}</td>
            <!-- Thay đổi để hiển thị tên nhà cung cấp -->
            <td>
              <!-- Nút xóa điện thoại -->
              <button @click="deletePhone(phone.maPhone)" class="delete">
                Xóa
              </button>
              <!-- Nút sửa điện thoại -->
              <button @click="editPhone(phone)" class="edit">Sửa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form thêm/sửa điện thoại -->
    <div>
      <h2 v-if="editMode">Sửa thông tin điện thoại</h2>
      <h2 v-else>Thêm điện thoại</h2>
      <form @submit.prevent="editMode ? updatePhone() : addPhone()">
        <input
          type="text"
          v-model="editedPhone.tenPhone"
          placeholder="Tên điện thoại"
          required
        />
        <input
          type="text"
          v-model="editedPhone.loai"
          placeholder="Loại"
          required
        />
        <input
          type="text"
          v-model="editedPhone.mauSac"
          placeholder="Màu sắc"
          required
        />
        <input
          type="number"
          v-model="editedPhone.price"
          placeholder="Giá"
          required
        />
        <!-- Thêm dropdown cho nhà cung cấp -->
        <select v-model="editedPhone.nhaCungCapId" required>
          <option value="" disabled selected hidden>Chọn nhà cung cấp</option>
          <option
            v-for="nhaCungCap in nhaCungCaps"
            :key="nhaCungCap.MaNCC"
            :value="nhaCungCap.tenNCC"
          >
            {{ nhaCungCap.tenNCC }}
          </option>
        </select>

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
      phones: [],
      sortOrder: "asc",
      nhaCungCaps: [], // Danh sách nhà cung cấp
      editedPhone: {
        tenPhone: "",
        loai: "",
        mauSac: "",
        nhaCungCapId: "", // Sửa thành đối tượng nhà cung cấp
        price: 0,
      },
      editMode: false,
    };
  },
  created() {
    this.getAllPhones();
    this.getAllNhaCungCaps();
  },
  methods: {
    getAllPhones() {
      axios
        .get("https://localhost:7202/api/Phone_")
        .then((response) => {
          this.phones = response.data;
        })
        .catch((error) => {
          console.error("Lỗi khi lấy danh sách điện thoại", error);
        });
    },
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
    addPhone() {
      axios
        .post("https://localhost:7202/api/Phone_", this.editedPhone)
        .then((response) => {
          console.log(response.data);
          this.getAllPhones();
          this.resetForm();
        })
        .catch((error) => {
          console.error("Lỗi khi thêm điện thoại", error);
        });
    },
    editPhone(phone) {
      // Copy toàn bộ dữ liệu của phone vào editedPhone
      this.editedPhone = { ...phone };
      // Gán lại giá trị của nhacungcap thành đối tượng nhà cung cấp tương ứng
      this.editedPhone.nhaCungCap = this.nhaCungCaps.find(
        (ncc) => ncc.id === phone.nhaCungCapId
      );
      this.editMode = true;
    },
    updatePhone() {
      axios
        .put(`https://localhost:7202/api/Phone_`, this.editedPhone)
        .then((response) => {
          console.log(response.data);
          this.getAllPhones();
          this.resetForm();
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật điện thoại", error);
        });
    },
    deletePhone(id) {
      axios
        .put(`https://localhost:7202/api/Phone_/${id}/toggleVisibility`)
        .then((response) => {
          console.log(response.data);
          this.getAllPhones();
        })
        .catch((error) => {
          console.error("Lỗi khi xóa điện thoại", error);
        });
    },
    resetForm() {
      this.editMode = false;
      this.editedPhone = {
        tenPhone: "",
        loai: "",
        mauSac: "",
        nhaCungCapId: "",
      };
    },
    sortItems() {
      if (this.sortBy === "name") {
        this.phones.sort((a, b) => {
          const nameA = a.tenPhone.toUpperCase();
          const nameB = b.tenPhone.toUpperCase();
          if (nameA < nameB) {
            return this.sortOrder === "asc" ? -1 : 1;
          }
          if (nameA > nameB) {
            return this.sortOrder === "asc" ? 1 : -1;
          }
          return 0;
        });
      } else if (this.sortBy === "price") {
        //sort theo giá
        if (this.sortOrder === "asc") {
          this.phones.sort((a, b) => a.price - b.price);
        } else {
          this.phones.sort((a, b) => b.price - a.price);
        }
      }
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
.sort-dropdown {
  margin-bottom: 10px; /* Khoảng cách dưới */
}

/* Tùy chỉnh style cho dropdown */
.sort-dropdown select {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
  