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
          <a class="unselectedButton" href="/administrator">OVERALL</a>
          <a
            class="unselectedButton"
            href="/statistics/login_history"
            v-if="$auth.user.role == 'admin'"
            >STATISTICS</a
          >
        </div>
      </div>
    </div>

    <div class="items-container2">

      <div class="queryResultBar">
        <a class="backButton" href="/administrator">
          BACK
        </a>
        <div class="searchUserNotify">
          Search By Item ID : {{ $route.params.id }}
        </div>
      </div>
    </div>
    
    <div class="items-container2">
      <div class="middlePart">ONGOING TRANSACTION FOR THIS USER</div>
      <div class="queryHeader3">
        <div class="itemIdHeader3">Item ID</div>
        <div class="nameHeader3">Withdrawn Item</div>
        <div class="userIdHeader3">Student ID</div>
        <div class="nameHeader3">Full Name</div>
        <div class="dateHeader3">Withdrawn Date</div>
        <div class="dateHeader3">Expected Return</div>
      </div>
      <itemWithdrawalTable
        v-for="record in itemQuery"
        :key="record.item_name"
        :userID="record.userID"
        :itemID="record.itemID"
        :firstname="record.firstname"
        :lastname="record.lastname"
        :item_name="record.item_name"
        :date_borrowed="record.DateBorrowed"
        :expected_return_date="record.ExpectedReturn"
      />
    </div>
    
    <div class="overdue-container2" v-if="this.itemOverdueQuery.length != 0">
      <div class="middlePart">OVERDUE TRANSACTION FOR THIS USER</div>
      <div class="queryHeader3">
        <div class="itemIdHeader3">Item ID</div>
        <div class="nameHeader3">Withdrawn Item</div>
        <div class="userIdHeader3">Student ID</div>
        <div class="nameHeader3">Full Name</div>
        <div class="dateHeader3">Withdrawn Date</div>
        <div class="dateHeader3">Expected Return</div>
      </div>
      <itemOverdueWithdrawalTable
        v-for="record in itemOverdueQuery"
        :key="record.item_name"
        :userID="record.userID"
        :itemID="record.itemID"
        :Fullname="record.Fullname"
        :item_name="record.item_name"
        :date_borrowed="record.date_borrowed"
        :expected_return_date="record.expected_return_date"
      />
    </div>
  </div>
  
</template>

<script>
import axios from "axios";
import itemWithdrawalTable from "../../../components/SearchByItem.vue";
import itemOverdueWithdrawalTable from "../../../components/SearchOverdueByItem.vue";
import LoginHeader from "../../../components/LoginHeader.vue";

export default {
  middleware: "auth-admin",
  data() {
    return {
      itemQuery: [],
      itemOverdueQuery: []
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
        `https://api.balemoh.tech/api/withdraw?command=itemID&value=${this.$route.params.id}`,
        config
      );
      const temp2 = await axios.get(
        `https://api.balemoh.tech/api/overdue?command=itemid&value=${this.$route.params.id}`,
        config
      );
      console.log(temp2.data)
      this.itemQuery = temp.data;
      this.itemOverdueQuery = temp2.data;
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    itemWithdrawalTable,
    itemOverdueWithdrawalTable,
    LoginHeader
  },
  head() {
    return {
      title: "Item Query",
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

.items-container3 {
  background-color: #ff8d24;
  width: 90%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 10px;
}
.items-container3 {
  background-color: #cc5500;
  width: 90%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 10px;
}
.queryHeader3 {
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

.itemIdHeader3 {
  width: 6%;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1rem;
  padding-top: 5px;
  padding-bottom: 5px;
}
.userIdHeader3 {
  width: 10%;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1rem;
  padding-top: 5px;
  padding-bottom: 5px;
}
.dateHeader3 {
  width: 24%;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2rem;
  padding-left: 10px;
  padding-right: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.nameHeader3 {
  width: 15%;
  font-weight: 500px;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1rem;
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
