<template>
  <div class="withdraw">
    <div class="nameHeader2">{{ firstname }} {{ lastname }}</div>
    <div class="nameHeader2">{{ item_name }}</div>
    <div class="dateHeader2">{{ date_borrowed }}</div>
    <div class="dateHeader2">{{ expected_return_date }}</div>
  </div>
</template>

<script>
export default {
  name: "userWithdrawalTable",
  props: [
    "userID",
    "firstname",
    "lastname",
    "item_name",
    "date_borrowed",
    "expected_return_date"
  ]
};
</script>

<style>
.withdraw {
  font-size: 26px;
  color: #000;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #d77113;
  color: #fff;
  padding-top: 2px;
  padding-bottom: 1px;
  justify-content: left;
  text-align: left;
}
/* 
.idDisp_sbu {
        width: 10%;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 1rem;
        padding-top: 5px;
        padding-bottom: 5px;
    }
.dateDisp_sbu {
        width: 23%;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 5rem;
        padding-left: 10px;
        padding-right: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
.nameDisp_sbu {
        width: 18%;
        font-weight: 500px;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 1.5rem;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .itemDisp_sbu {
        width: 15%;
        font-weight: 500px;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 1.5rem;
        padding-top: 5px;
        padding-bottom: 5px;
    } */
</style>
