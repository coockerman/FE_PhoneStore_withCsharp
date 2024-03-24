<template>
  <div class="container">
    <div>
      <h2>Tất cả nhân viên</h2>
      <!-- Hiển thị danh sách người dùng dưới dạng bảng -->
      <table class="table">
        <thead>
          <tr>
            <th>Tên nhân viên</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.maUser">
            <td>{{ user.tenUser }}</td>
            <td>{{ user.sdt }}</td>
            <td>{{ user.diaChi }}</td>
            <td>
              <!-- Nút xóa người dùng -->
              <button @click="deleteUser(user.maUser)" class="delete">
                Xóa
              </button>
              <!-- Nút sửa người dùng -->
              <button @click="editUser(user)" class="edit">Sửa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <!-- Form thêm/sửa người dùng -->
      <h2 v-if="editMode">Sửa thông tin nhân viên</h2>
      <h2 v-else>Thêm nhân viên</h2>
      <form @submit.prevent="editMode ? updateUser() : addUser()">
        <input
          type="text"
          v-model="editedUser.tenUser"
          placeholder="Tên người dùng"
          required
        />
        <input
          type="text"
          v-model="editedUser.sdt"
          placeholder="Số điện thoại"
          required
        />
        <input
          type="text"
          v-model="editedUser.diaChi"
          placeholder="Địa chỉ"
          required
        />
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
      users: [],
      editedUser: {
        tenUser: "",
        sdt: "",
        diaChi: "",
      },
      editMode: false,
    };
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      axios
        .get("https://localhost:7202/api/User")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Lỗi khi lấy danh sách người dùng", error);
        });
    },
    addUser() {
      axios
        .post("https://localhost:7202/api/User", this.editedUser)
        .then((response) => {
          console.log(response.data);
          this.getAllUsers();
          this.resetForm();
        })
        .catch((error) => {
          console.error("Lỗi khi thêm người dùng", error);
        });
    },
    editUser(user) {
      this.editedUser = { ...user };
      this.editMode = true;
    },
    updateUser() {
      axios
        .put(`https://localhost:7202/api/User`, this.editedUser)
        .then((response) => {
          console.log(response.data);
          this.getAllUsers();
          this.resetForm();
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật người dùng", error);
        });
    },
    deleteUser(id) {
      axios
        .put(`https://localhost:7202/api/User/${id}/ToggleVisibility`)
        .then((response) => {
          console.log(response.data);
          this.getAllUsers();
        })
        .catch((error) => {
          console.error("Lỗi khi xóa người dùng", error);
        });
    },
    resetForm() {
      this.editMode = false;
      this.editedUser = {
        tenUser: "",
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
  