
<template>
    
       
    
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
.flex-container  {
  flex: 0 0 25em;
  padding-top: 1%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
}

.page-enter-active {
      animation: acrossIn .50s ease-out both;
    } 
    .page-leave-active {
      animation: acrossOut .50s ease-in both;
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