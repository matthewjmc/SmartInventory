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
            <a class="currentButton">STATISTICS</a>
          </div>
        </div>

          <div class="buttonGroup2">
            <div class="square">
              <a class="unselectedButton" href="/statistics/login_history">USER LOGIN HISTORY</a>
              <a class="currentButton">WITHDRAWN ITEM HISTORY</a>
            </div>
          </div>
          </div>
    </div>

    <div class="items-container">
      <div class="queryHeader">
        <div class="itemStat_itemId">Item ID</div>
        <div class="itemStat_itemName">Item Name</div>
        <div class="itemStat_amount">
          Number of Withdrawns
        </div>
      </div>

      <popularItems
        v-for="item in popular_items"
        :key="item.item_name"
        :item_name="item.item_name"
        :description="item.description"
        :amount="item.amount"
        :availability="item.availability"
      />

    </div>
  </div>
</template>

<script>
import axios from "axios";
import popularItems from "../../../components/mostWithdrawnItem.vue";
import LoginHeader from "../../../components/LoginHeader.vue";

export default {
  middleware: "auth-admin",
  data() {
    return {
      popular_items: []
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
      console.log(res.data);
      this.popular_items = res.data;
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    popularItems,
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

.itemStat_itemId {
  width: 20%;
  font-weight: 600px;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 1rem;
  padding-bottom: 5px;
}

.itemStat_amount {
  width: 40%;
  font-weight: 600px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 5px;
}

.itemStat_itemName {
  width: 60%;
  justify-content: center;
  font-weight: 600px;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
}
.centralGrid {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
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
