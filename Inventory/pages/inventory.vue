<template>
  <div>
    <LoginHeader class="container" />

    <div class="outer-container">
      <div>
        <img class="icon" src="~assets/CIElogo.png" />
      </div>
      <div class="buttonGroup">
        <div class="square">
          <a class="currentButton">INVENTORY</a>
          <a class="unselectedButton" href="/history"
            >HISTORY</a
          >
          <a class="unselectedButton" href="/administrator" v-if="$auth.user.role=='admin'"
            >OVERALL</a
          >
          <a class="unselectedButton" href="/statistics/login_history" v-if="$auth.user.role=='admin'"
            >STATISTICS</a
          >
        </div>
      </div>
    </div>

    <div class="items-container" v-if="this.currInv.length!=0">
      <div class="queryHeader">
        <div class="itemHeader">Item Names</div>
        <div class="descHeader">Description</div>
        <div class="numberHeader">Total</div>
        <div class="numberHeader">In-Stock</div>
      </div>
      <currentInv
        v-for="item in currInv"
        :key="item.item_name"
        :item_name="item.item_name"
        :description="item.description"
        :amount="item.amount"
        :availability="item.availability"
      />
    </div>
    <!-- <div class="text-container" v-else>
      <div class="no_transaction">THERE ARE NO ITEMS IN YOUR INVENTORY SYSTEM</div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import currentInv from "../components/InventoryQuery";
import LoginHeader from "../components/LoginHeader.vue";

export default {
  middleware: "auth",
  data() {
    return {
      currInv: []
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
        "https://api.balemoh.tech/api/inventory",
        config
      );
      // console.log(res.data);
      this.currInv = res.data;
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    currentInv,
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
  align-content: center;
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

.no_transaction {
  font-size: 26px;
  font-weight: 600;
  color: #000;
  width: 100%;
  color: #fff;
  justify-content: center;
  align-content: center;
  text-align: center;
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
  width: 70%;
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
.numberHeader {
  width: 25%;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1rem;
  padding-top: 5px;
  padding-bottom: 5px;
}
.descHeader {
  width: 70%;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1rem;
  padding-right: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.itemHeader {
  width: 35%;
  font-weight: 600px;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1rem;
  padding-top: 5px;
  padding-bottom: 5px;
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
