<template>
  <div class="container">
    <div>
      <h2>Tất cả khách hàng</h2>
      <ul>
        <li v-for="khachHang in khachHangs" :key="khachHang.maKH">
          {{ khachHang.tenKH }} - {{ khachHang.sdt }} -
          {{ khachHang.gioiTinh }} -
          {{ khachHang.diaChi }}
          <button class="delete" @click="deleteKhachHang(khachHang.maKH)">
            Delete
          </button>
          <button class="edit" @click="editKhachHang(khachHang)">Edit</button>
        </li>
      </ul>
    </div>

    <div>
      <h2 v-if="editMode">Sửa thông tin khách hàng</h2>
      <h2 v-else>Thêm khách hàng</h2>
      <form @submit.prevent="editMode ? updateKhachHang() : addKhachHang()">
        <input
          type="text"
          :value="editMode ? editedKhachHang.tenKH : newKhachHang.tenKH"
          @input="
            editMode
              ? (editedKhachHang.tenKH = $event.target.value)
              : (newKhachHang.tenKH = $event.target.value)
          "
          placeholder="Tên"
          required
        />
        <input
          type="text"
          :value="editMode ? editedKhachHang.sdt : newKhachHang.sdt"
          @input="
            editMode
              ? (editedKhachHang.sdt = $event.target.value)
              : (newKhachHang.sdt = $event.target.value)
          "
          placeholder="Số điện thoại"
          required
        />

        <select v-model="selectedGender" required>
          <option value="" disabled selected hidden>Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>

        <input
          type="text"
          :value="editMode ? editedKhachHang.diaChi : newKhachHang.diaChi"
          @input="
            editMode
              ? (editedKhachHang.diaChi = $event.target.value)
              : (newKhachHang.diaChi = $event.target.value)
          "
          placeholder="Địa chỉ"
          required
        />

        <button type="submit">{{ editMode ? "Update" : "Add" }}</button>
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
      editedKhachHang: {
        maKH: null,
        tenKH: "",
        sdt: "",
        gioiTinh: "",
        diaChi: "",
      },
      editMode: false,
    };
  },
  computed: {
    selectedGender: {
      get() {
        return this.editMode
          ? this.editedKhachHang.gioiTinh
          : this.newKhachHang.gioiTinh;
      },
      set(value) {
        if (this.editMode) {
          this.editedKhachHang.gioiTinh = value;
        } else {
          this.newKhachHang.gioiTinh = value;
        }
      },
    },
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
          console.error("Error fetching khach hangs", error);
        });
    },
    addKhachHang() {
      axios
        .post("https://localhost:7202/api/KhachHang_", this.newKhachHang)
        .then((response) => {
          console.log(response.data);
          this.getAllKhachHangs();
          this.newKhachHang = { tenKH: "", sdt: "", gioiTinh: "", diaChi: "" };
        })
        .catch((error) => {
          console.error("Error adding khach hang", error);
        });
    },
    editKhachHang(khachHang) {
      this.editedKhachHang = { ...khachHang };
      this.editMode = true;
    },
    updateKhachHang() {
      axios
        .put(`https://localhost:7202/api/KhachHang_`, this.editedKhachHang)
        .then((response) => {
          console.log(response.data);
          this.getAllKhachHangs();
          this.editMode = false;
          this.editedKhachHang = {
            maKH: null,
            tenKH: "",
            sdt: "",
            gioiTinh: "",
            diaChi: "",
          };
        })
        .catch((error) => {
          console.error("Error updating khach hang", error);
        });
    },
    deleteKhachHang(id) {
      axios
        .delete(`https://localhost:7202/api/KhachHang_/${id}`)
        .then((response) => {
          console.log(response.data);
          this.getAllKhachHangs();
        })
        .catch((error) => {
          console.error("Error deleting khach hang", error);
        });
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

