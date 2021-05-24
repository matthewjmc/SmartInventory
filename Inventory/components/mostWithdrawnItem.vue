<template>
  <div class="inv">
    <div class="itemStat_itemName">{{ Name }}</div>
    <div class="itemStat_amount">{{ Amount }}</div>
    <!-- this will be the amount -->
  </div>
</template>

<script>
export default {
  name: "popularItems",
  props: ["Name","Amount"]
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
