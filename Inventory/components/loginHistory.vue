
<template>
  <div class="inv">
    <div class="loginHist_userId">{{ item_name }}</div>
    <div class="loginHist_userFullname">{{ description }}</div>
    <div class="loginHist_loggedInTime">Amt</div>
  </div>
</template>

<script>
export default {
  name: "loginHist",
  props: ["item_name", "description", "amount", "availability"]
};
</script>

<style>
.inv {
  font-size: 25px;
  color: #000;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #d77113;
  color: #fff;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  justify-content: left;
  text-align: left;
}

</style>
