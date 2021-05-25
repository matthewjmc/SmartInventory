<template>
  <div class="withdraw2">
    <nuxt-link :to="'administrator/itemQuery/'+itemID">
      <v-btn color="#853500"
        ><img src="~assets/itemIcon.png"
      /></v-btn>
    </nuxt-link>

    <nuxt-link :to="'administrator/userQuery/'+userID">
      <v-btn color="#853500"
        ><img src="~assets/userIcon.png"
      /></v-btn>
    </nuxt-link>

    <div class="idHeader_WithdrawQuery">{{ userID }}</div>
    <div class="nameHeader">{{ Fullname}}</div>
    <div class="itemHeader">{{ item_name }}</div>
    <div class="dateHeader">{{ date_borrowed }}</div>
    <div class="dateHeader">{{ expected_return_date }}</div>
  </div>
</template>

<script>
export default {
  name: "withdrawalOverdueTable",
  props: [
    "userID",
    "itemID",
    "Fullname",
    "item_name",
    "date_borrowed",
    "expected_return_date"
  ]
};
</script>

<style>
.withdraw2 {
  font-size: 26px;
  color: #000;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #853500;
  color: #fff;
  padding-top: 2px;
  padding-bottom: 1px;
  justify-content: left;
  text-align: left;
}

.idHeader_WithdrawQuery {
  width: 11%;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 0.5rem;
  padding-top: 5px;
  padding-bottom: 5px;
}


/* 
.idDisp {
  width: 12%;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1rem;
  padding-top: 5px;
  padding-bottom: 5px;
}
.dateDisp {
  width: 24%;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
  padding-right: 30px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.nameDisp {
  width: 27%;
  font-weight: 500px;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 2.25rem;
  padding-top: 5px;
  padding-bottom: 5px;
}

.itemDisp {
  width: 20%;
  font-weight: 500px;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 5px;
  padding-bottom: 5px;
} */

img {
  width: 2rem;
}
button {
  padding-left: 0.8rem;
  padding-right: 0.8rem;
}
</style>
