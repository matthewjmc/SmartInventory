<template>
  <div>
    <LoginHeader class="container" />

    <div class="outer-container">
      <div>
        <img class="icon" src="~assets/CIElogo.png" />
      </div>
      <div class="centralGrid">
        <div class="buttonGroup">
          <div class="square">
            <a class="unselectedButton" href="/inventory">INVENTORY</a>
            <a class="unselectedButton" href="/history">HISTORY</a>
            <a
              class="unselectedButton"
              href="/administrator"
              v-if="$auth.user.role == 'admin'"
              >PENDING</a
            >
            <a class="unselectedButton"  href="/statistics/login_history">STATISTICS</a>
          </div>
        </div>

        <div class="buttonGroup2">
          <div class="square">
            <a class="currentButton" href="/statistics/login_history"
              >USER LOGIN HISTORY</a
            >
            <a class="unselectedButton" href="/statistics/item_stat"
              >ITEM WITHDRAWN HISTORY</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="items-container">
      <div class="queryResultBar2">
        <a class="backButton2" href="/statistics/login_history">
          BACK
        </a>
        <div class="searchUserNotify2">
          Search By Student ID : {{ $route.params.id }}
        </div>
      </div>
      <div class="queryHeader">
        <div class="loginHist_userId">User ID</div>
        <div class="loginHist_userFullname">
          Full Name
        </div>
        <div class="loginHist_loggedInTime">
          Recent Logged-in time
        </div>
      </div>

      <loginHist
        v-for="record in loginHistory"
        :key="record.userID"
        :userID="record.userID"
        :FullName="record.FullName"
        :TimeLogin="record.TimeLogin"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import loginHist from "../../../components/loginHistory_user.vue";
import LoginHeader from "../../../components/LoginHeader.vue";

export default {
  middleware: "auth-admin",
  data() {
    return {
      loginHistory: []
    };
  },
  async created() {
    const config = {
      headers: {
        authorization: this.$auth.$storage._state["_token.local"],
        Accept: "application/json"
      }
    };
    try {
      const res = await axios.get(
        `https://api.balemoh.tech/api//loginstat?userid=${this.$route.params.id}`,
        config
      );
      // console.log(res.data);
      this.loginHistory = res.data;
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    loginHist,
    LoginHeader
  },
  head() {
    return {
      title: "Statistics",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Inventory System"
        }
      ]
    };
  }
};
</script>

<style>
.outer-container {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttonGroup {
  display: flex;
  width: 60%;
  height: 40%;
  border-radius: 15%;
  flex-direction: row;
  margin-top: 1%;
  align-items: center;
  justify-content: center;
}
.buttonGroup2 {
  display: flex;
  width: 70%;
  height: 20%;
  border-radius: 15%;
  flex-direction: row;
  margin-top: 1%;
  align-items: center;
  justify-content: center;
}
.buttonGroup2 .square {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 75%;
  height: 60px;
  border-radius: 25px;
  background-color: #ff8d24;
}

.icon {
  padding-top: 10%;
  width: 250px;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.buttonGroup .square {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 150%;
  height: 70px;
  border-radius: 25px;
  background-color: #ff8d24;
}
.unselectedButton {
  text-align: center;
  justify-content: center;
  display: inline-block;
  background: #d77113;
  font-weight: 600;
  color: #fff;
  padding-top: 17px;
  padding: 0.6rem 6rem;
  border-radius: 20px;
  border-width: 100px;
  font-size: 22px;
  margin: 0 10px;
}
.currentButton {
  text-align: center;
  justify-content: center;
  display: inline-block;
  background: #fff;
  font-weight: 600;
  color: #d77113;
  padding-top: 17px;
  padding: 0.6rem 6rem;
  border-radius: 20px;
  border-width: 100px;
  font-size: 22px;
  margin: 0 10px;
}

.items-container {
  background-color: #ff8d24;
  width: 50%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 10px;
}

.queryHeader {
  font-size: 26px;
  font-weight: bold;
  color: #000;
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #fff;
  justify-content: left;
  text-align: justify;
  padding-bottom: 2px;
  padding-bottom: 3px;
}

.centralGrid {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.queryResultBar2 {
  font-size: 26px;
  font-weight: 600;
  color: #000;
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #fff;
  justify-content: left;
  text-align: justify;
  padding-top: 0.1rem;
  padding-bottom: 0.75rem;
}

.backButton2 {
  text-align: center;
  justify-content: center;
  display: center;
  background: #fff;
  font-weight: 600;
  color: #d77113;
  padding-top: 0.6rem;
  border-radius: 20px;
  border-width: 100px;
  font-size: 22px;
  margin: 0 10px;
  width: 10%;
}
.searchUserNotify2 {
  text-align: center;
  justify-content: center;
  display: center;
  background: #fff;
  font-weight: 600;
  color: #d77113;
  padding-top: 17px;
  padding: 0.6rem 6rem;
  border-radius: 20px;
  border-width: 100px;
  font-size: 22px;
  margin: 0 10px;
  width: 90%;
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
