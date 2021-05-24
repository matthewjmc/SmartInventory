
<template>
  <div class="inv">
    <div class="loginHist_userId">{{ userID }}</div>
    <div class="loginHist_userFullname">{{ FullName }}</div>
    <div class="loginHist_loggedInTime">{{ TimeLogin }}</div>
  </div>
</template>

<script>
export default {
  name: "loginHist",
  props: ["FullName","userID", "TimeLogin"]
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
.loginHist_userId {
  width: 20%;
  font-weight: 600px;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 1rem;
  padding-top: 5px;
  padding-bottom: 5px;
}

img {
  width: 2rem;
}
button {
  padding-left: 0.8rem;
  padding-right: 0.8rem;
}
</style>
