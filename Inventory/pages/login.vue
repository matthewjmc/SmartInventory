
<template>
    
    <header class="header">
        <img src='~assets/CIElogo.png' >
    </header>    
    
</template>

<script>
    export default {
        head(){
            return{
            title: 'Login Page',
            meta: [
                { hid: 'description',
                name: 'description',   
                content: 'Inventory System'
                }
            ]
            }
        }
    }
</script>

<style>
.text {
  align-items: center;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 10%;
}

.header img {
  align-items: center;
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  width: 12%;
  max-width: 100%;
  position: absolute;
  top: 1200%;
  bottom: 30%;
  left: 44%;
  }

</style>