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
          <a class="unselectedButton" href="/history">HISTORY</a>
          <a class="currentButton">OVERALL</a>
          <a class="unselectedButton" href="/statistics/login_history"
            >STATISTICS</a
          >
        </div>
      </div>
    </div>
    <div class="items-container" v-if="this.withdrawn.length != 0">
      <div class="middlePart">ONGOING TRANSACTION</div>
      <div class="queryHeader">
        <div class="idHeader">Student ID</div>
        <div class="nameHeader">Full Name</div>
        <div class="itemHeader">Withdrawn Item</div>
        <div class="dateHeader">Withdrawn Date</div>
        <div class="dateHeader">Expected Return</div>
      </div>
      <withdrawalTable
        v-for="record in withdrawn"
        :key="record.item_name"
        :itemID="record.itemID"
        :userID="record.userID"
        :firstname="record.firstname"
        :lastname="record.lastname"
        :item_name="record.item_name"
        :date_borrowed="record.DateBorrowed"
        :expected_return_date="record.ExpectedReturn"
      />
    </div>
    <div class="text-container" v-else-if="this.withdrawn.length == 0 && this.overdueWithdrawn.length == 0">
      <div class="no_transaction">THERE ARE NO TRANSACTIONS</div>
    </div>
    <div class="overdue-container" v-if="this.overdueWithdrawn.length != 0">
      <div class="middlePart">OVERDUE TRANSACTION</div>
      <div class="queryHeader">
        <div class="idHeader">Student ID</div>
        <div class="nameHeader">Full Name</div>
        <div class="itemHeader">Withdrawn Item</div>
        <div class="dateHeader">Withdrawn Date</div>
        <div class="dateHeader">Expected Return</div>
      </div>
      <withdrawalOverdueTable
        v-for="record in overdueWithdrawn"
        :key="record.item_name"
        :itemID="record.itemID"
        :userID="record.userID"
        :fullname="record.Fullname"
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
import withdrawalTable from "../../components/WithdrawQuery";
import withdrawalOverdueTable from "../../components/withdrawOverdueQuery";
import LoginHeader from "../../components/LoginHeader.vue";

export default {
  middleware: "auth-admin",
  data() {
    return {
      withdrawn: [],
      overdueWithdrawn: []
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
        "https://api.balemoh.tech/api/withdraw?command=all",
        config
      );
      const res2 = await axios.get(
        "https://api.balemoh.tech/api/overdue?command=userid&value=all",    // change this URL to be overdue
        config
      );
      this.withdrawn = res.data;
      this.overdueWithdrawn = res2.data;
      console.log(res)
      console.log(res2)
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    withdrawalTable,
    withdrawalOverdueTable,
    LoginHeader
  },
  head() {
    return {
      title: "Tracking",
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

.no_transaction {
  font-size: 26px;
  font-weight: 600;
  color: #000;
  width: 100%;
  color: #fff;
  justify-content: center;
  text-align: center;
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
  width: 90%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 10px;
}
.text-container {
  background-color: #ff8d24;
  width: 50%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 10px;
}
.overdue-container {
  background-color: #cc5500;
  width: 90%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 10px;
}
.queryHeader {
  font-size: 26px;
  font-weight: 600;
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
.idHeader {
  width: 11%;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8.25rem;
  padding-top: 5px;
  padding-bottom: 5px;
}
.dateHeader {
  width: 28%;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.nameHeader {
  width: 24%;
  font-weight: 500px;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 5px;
  padding-bottom: 5px;
}
.itemHeader {
  width: 18%;
  font-weight: 500px;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 5px;
  padding-bottom: 5px;
}
.middlePart {
  font-size: 26px;
  font-weight: 600;
  color: #000;
  width: 100%;
  color: #fff;
  justify-content: center;
  text-align: center;
  padding-bottom: 0.5rem;
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
