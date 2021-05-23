<template>
  <div>
    <LoginHeader class="container" />

    <div class="outer-container">
      <div>
        <img class="icon" src="~assets/CIElogo.png" />
      </div>
      <div class="buttonGroup">
        <div class="square">
          <a class="unselectedButton" href="/inventory">INVENTORY</a>
          <a class="currentButton" href="/history">HISTORY</a>
          <a class="unselectedButton" href="/administrator" v-if="$auth.user.role=='admin'"
            >PENDING</a
          >
          <a class="unselectedButton" href="/statistics/login_history" v-if="$auth.user.role=='admin'"
            >STATISTICS</a
          >
        </div>
      </div>
    </div>
    <div class="items-container2">
      <div class="queryHeader2">
        <div class="idHeader2">Student ID</div>
        <div class="nameHeader2">Full Name</div>
        <div class="nameHeader2">Withdrawn Item</div>
        <div class="dateHeader2">Withdrawn Date</div>
        <div class="dateHeader2">Expected Return</div>
      </div>
      <UserHistory
        v-for="record in userQuery"
        :key="record.item_name"
        :userID="record.userID"
        :firstname="record.firstname"
        :lastname="record.lastname"
        :item_name="record.item_name"
        :date_borrowed="record.date_borrowed"
        :expected_return_date="record.expected_return_date"
      />
    </div>
    <!-- props: ['userID','firstname','lastname','item_name','date_borrowed','expected_return_date'] -->
  </div>
</template>

<script>
import axios from "axios";
import userHistory from "../components/userHistory.vue";
import LoginHeader from "../components/LoginHeader.vue";

export default {
  middleware: "auth",
  data() {
    return {
      userQuery: []
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
      console.log(this.$route.params.id);
      const temp = await axios.get(
          `https://api.balemoh.tech/api/withdraw?command=userID&value=${this.$auth.user.uid}`,
        // `https://api.iotdev.mcmullin.org/api/withdraw?command=userID&value=${this.$route.params.id}`,
        config
      );
      console.log(temp.data);
      this.userQuery = temp.data;
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    userHistory,
    LoginHeader
  },
  head() {
    return {
      title: "Your History",
      meta: [
        { hid: "description", name: "description", content: "Inventory System" }
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

.queryResultBar {
  font-size: 26px;
  font-weight: 600;
  color: #000;
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #fff;
  justify-content: left;
  text-align: justify;
  padding-top: 0.2rem;
  padding-bottom: 2px;
}

.backButton {
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

.items-container2 {
  background-color: #ff8d24;
  width: 90%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 10px;
}

.queryHeader2 {
  font-size: 26px;
  font-weight: 600;
  color: #000;
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #fff;
  justify-content: left;
  text-align: justify;
  padding-top: 0.5rem;
  padding-bottom: 2px;
}

.dateHeader2 {
  width: 24%;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1.5rem;
  padding-left: 20px;
  padding-right: 35px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.nameHeader2 {
  width: 18%;
  font-weight: 500px;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1.5rem;
  padding-top: 5px;
  padding-bottom: 5px;
}
.idHeader2 {
  width: 13.5%;
  font-weight: 500px;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 0.5rem;
  padding-top: 5px;
  padding-bottom: 5px;
}
.searchUserNotify {
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
