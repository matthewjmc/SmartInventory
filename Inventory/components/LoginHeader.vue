<template>
  <header class="header">
    <h1 class="title">CIE Inventory System</h1>
    <ul>
      <div v-if="$auth.loggedIn">{{ $auth.user.email }}</div>
      <li><v-btn @click="logout"> LOGOUT </v-btn></li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "LoginHeader",
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        console.log("Logged out successfully");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}
.header .title {
  font-size: 2rem;
  color: #ffffff;
}
.header ul {
  display: flex;
}
.header a {
  font-weight: 600;
  display: inline-block;
  background: #fff;
  color: #d77113;
  padding: 0.3rem 1rem;
  margin-right: 1rem;
  border-radius: 10px;
}
.container {
  max-width: 8000px;
  margin: 1rem;
  overflow: hidden;
  padding: 1rem 2rem;
  background: #ff8d24;
}
</style>
