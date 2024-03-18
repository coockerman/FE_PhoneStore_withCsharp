<template>
  <div id="nav">
      <router-link to="/khachhang">Quản lý khách hàng</router-link> |
      <router-link to="/nhacungcap">Quản lý nhà cung cấp</router-link> |
      <router-link to="/userMain">Quản lý user</router-link> |
      <router-link to="/phoneProduct">Quản lý phone</router-link> |
      <router-link to="/orderProduct">Quản lý đơn hàng</router-link> |

  </div>
  <router-view />
</template>

<script>

</script>

<style>
#nav {
  background-color: #333;
  overflow: hidden;
}

#nav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 16px 20px;
  text-decoration: none;
  font-size: 17px;
}

#nav a:hover {
  background-color: #ddd;
  color: black;
}

#nav a.active {
  background-color: #04aa6d;
  color: white;
}
</style>
