<template>
    <div class="container">
      <div>
        <h2>Tất cả điện thoại</h2>
      <!-- Hiển thị danh sách điện thoại -->
      <ul>
        <li v-for="phone in phones" :key="phone.maPhone">
          {{ phone.tenPhone }} - {{ phone.loai }} - {{ phone.mauSac }} - {{ getNhaCungCapName(phone.nhaCungCapId) }}
          <!-- Nút xóa điện thoại -->
          <button @click="deletePhone(phone.maPhone)">Xóa</button>
          <!-- Nút sửa điện thoại -->
          <button @click="editPhone(phone)">Sửa</button>
        </li>
      </ul>
      </div>
  
      <!-- Form thêm/sửa điện thoại -->
      <div>
        <h2 v-if="editMode">Sửa thông tin điện thoại</h2>
        <h2 v-else>Thêm điện thoại</h2>
        <form @submit.prevent="editMode ? updatePhone() : addPhone()">
          <input type="text" v-model="editedPhone.tenPhone" placeholder="Tên điện thoại" required />
          <input type="text" v-model="editedPhone.loai" placeholder="Loại" required />
          <input type="text" v-model="editedPhone.mauSac" placeholder="Màu sắc" required />
          <!-- Chỗ chọn nhà cung cấp -->
          <select v-model="editedPhone.nhaCungCapId" required>
            <option v-for="ncc in nhaCungCaps" :key="ncc.maNCC" :value="ncc.maNCC">{{ ncc.tenNCC }}</option>
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
        nhaCungCaps: [], // Danh sách nhà cung cấp
        editedPhone: {
          tenPhone: "",
          loai: "",
          mauSac: "",
          nhaCungCapId: "", // ID của nhà cung cấp
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
      getNhaCungCapName(nhaCungCapId) {
        const nhaCungCap = this.nhaCungCaps.find(ncc => ncc.Id === nhaCungCapId);
        return nhaCungCap ? nhaCungCap.tenNCC : ''; // Trả về tên nhà cung cấp tương ứng hoặc chuỗi rỗng nếu không tìm thấy
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
        this.editedPhone = { ...phone };
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
          .delete(`https://localhost:7202/api/Phone_/${id}`)
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
  </style>
  