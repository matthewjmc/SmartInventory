<template>
  <div class='container'>
      <AppHeader/>
        <nuxt />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';

export default {
  components:{
    AppHeader
  }
}

</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
 font-family: Arial, Helvetica, sans-serif;
 font-size: 1rem;
 line-height: 1.5;
 background: #fbeed4;
}
a {
  color: #666;
  text-decoration: none;
}
ul{
  list-style: none;
}

</style>