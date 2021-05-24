<template>
  <div>
    <AppHeader class="container" />
    <div class="flex-container">
      <div>
        <img src="~assets/CIElogo.png" />
      </div>
      <div class="box">
        <form>
          <div class="infoEntry">
            <div class="entryName">
              <label>Username</label>
            </div>
            <div class="inputEntry">
              <input type="username" v-model="username" label="Username" />
            </div>
          </div>

          <div class="infoEntry">
            <div class="entryName">
              <label>Password</label>
            </div>
            <div class="inputEntry">
              <input type="password" v-model="password" label="Password" />
            </div>
          </div>
        </form>
        <!-- <v-text-field class="entry" v-model="username" label="Username"> </v-text-field>
        <v-text-field class="entry" v-model="password" label="Password" type="password"> </v-text-field> -->
        <v-btn color="#D77113" @click="handleLoginClicked"> LOGIN </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async handleLoginClicked() {
      try {
        const response = await this.$auth.loginWith("local", {
          data: { username: this.username, password: this.password }
        });
        // console.log(response);
        if (response.data.success) {
          this.$store.dispatch({ text: " Login Completed " });
          this.$router.replace({ name: "inventory" });
        }
      } catch (err) {
        // console.log(this.username,this.password)
        console.log(err);
      }
    }
  },
  head() {
    return {
      title: "Login",
      meta: [
        { hid: "description", name: "description", content: "Inventory System" }
      ]
    };
  }
};
</script>

<style>
.flex-container {
  flex: 100 0 25em;
  padding-top: 1%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

img {
  padding-top: 40%;
  width: 250px;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

a {
  color: #000;
}

form {
  width: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-top: 3%;   
}

.box {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: justify;
  width: 700px;
  height: 12rem;
  overflow: hidden;
  background: #ffa959;
  border-radius: 50px;
}

.page-enter-active {
  animation: acrossIn 0.5s ease-out both;
}

.page-leave-active {
  animation: acrossOut 0.5s ease-in both;
}

.entry {
  height: 30px;
  width: 80%;
  justify-content: center;
  align-items: center;
}

.infoEntry  {
  color: white;
  font-weight: 700;
  padding-top: 0.25%;
  padding-bottom: 2%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: left;
}

.entryName {
  color: #fff;
  float: left;
  width: 20%;
}

.inputEntry {
  float: left;
  width: 50%;
  margin-top: 3px;
}

v-btn {
  padding-top: 1rem;
}

input[type=username], select, textarea{
  width: 150%;
  padding: 10px;
  border: 1px solid #ccc;
  background: #fbeed4;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}
input[type=password], select, textarea{
  width: 150%;
  padding: 10px;
  border: 1px solid #ccc;
  background: #fbeed4;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

@keyframes acrossIn {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes acrossOut {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
