<template>
  <div>
    <AppHeader class="container" />
    <div class="flex-container">
      <div>
        <img src="~assets/CIElogo.png" />
      </div>
      <div class="box">
        <!-- <form>
          <div class="infoEntry">
            <div class="entryName">
              <label>Student ID</label>
            </div>
            <div class="inputEntry">
              <input
                v-model="username"
                type="text"
                id="username"
                name="username"
              />
            </div>
          </div>

          <div class="infoEntry">
            <div class="entryName">
              <label>Password</label>
            </div>
            <div class="inputEntry">
              <input
                v-model="password"
                type="password"
                id="password"
                name="password"
              />
            </div>
          </div>

          <div class="submitButton">
            <input @click="handleLoginClicked" type="submit" value="LOGIN" />
          </div>
        </form> -->
        <v-text-field v-model="username" label="username"></v-text-field>
        <v-text-field v-model="password" label="password" type="password"></v-text-field>
        <v-btn @click="handleLoginClicked"> LOGIN </v-btn>
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
  data(){
    return {
      username: '',
      password: ''
    }
  },
  methods:{
    async handleLoginClicked(){
      try {
        const response = await this.$auth.loginWith('local', { 
          data: { username: this.username, password: this.password }
        })
        console.log(response)
        if(response.data.success){
          this.$store.dispatch({text: ' Login Completed '})
          this.$router.replace({name:'inventory'})
        }
      } catch (err) {
        console.log(err)
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
  },

};
</script>

<style>
.center {
  align-items: center;
  margin: auto;
  width: 50%;
  padding: 10px;
}

.flex-container {
  flex: 100 0 25em;
  padding-top: 1%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.infoEntry {
  color: white;
  font-weight: 700;
  flex: auto;
  padding-top: 0.25%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: left;
}

img {
  padding-top: 40%;
  width: 250px;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.box {
  text-align: center;
  justify-content: center;
  width: 700px;
  height: 200px;
  margin: -1.5rem;
  overflow: hidden;
  background: #ffa959;
  border-radius: 50px;
}

.submitButton {
  font-weight: 600;
  text-align: center;
  justify-content: center;
  display: inline-block;
  background: #d77113;
  color: #fff;
  padding: 0.5rem 5rem;
  margin-top: 12px;
  border-radius: 20px;
  border-width: 50px;
  font-size: 25px;
}

form {
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-top: 2rem;
}

.page-enter-active {
  animation: acrossIn 0.5s ease-out both;
}

.page-leave-active {
  animation: acrossOut 0.5s ease-in both;
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

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
  color: #d77113;
}

input[type="password"],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
  color: #d77113;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input[type="submit"] {
  color: white;
  padding-top: 10px;
  padding: 1px 3px;
  border: none;
  border-radius: 4px;
}

.entryName {
  color: #fff;
  float: left;
  width: 20%;
  margin-top: 6px;
}
.inputEntry {
  background: #fff;
  float: left;
  width: 75%;
  margin-top: 3px;
}
.row {
  padding-left: 5%;
  display: table;
  clear: both;
}
@media screen and (max-width: 800px) {
  .entryName,
  .inputEntry,
  input[type="submit"] {
    width: 100%;
    margin-top: 0;
  }
}
</style>
