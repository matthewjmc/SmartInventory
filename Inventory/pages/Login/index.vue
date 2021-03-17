
<template>
    <div>
        <img src='~/assets/CIElogo.svg'>
    </div>
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
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 10%;
}
</style>