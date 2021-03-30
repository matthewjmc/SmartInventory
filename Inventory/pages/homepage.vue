

<template>
    <div>
        <LoginHeader class="container"/>
        <div class='outer-container'>
            <div> 
              <img class="img" src='~assets/CIElogo.png'> 
            </div>
            <div class='buttonGroup'>
              <div class="square">
                  <button>Inventory</button>
                  <button>Withdraw</button>
                  <button>Deposit</button>
                  <button>Rental</button>
              </div>
            </div>
        </div>
    </div>  
</template>


<script>
import LoginHeader from '../components/LoginHeader.vue';
    export default {
        components:{
            LoginHeader
          },
        head(){
            return{
            title: 'Tracking',
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
.outer-container  {
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
.icon {
  width: 15%;
  z-index: 1;
  align-items: center;
  justify-content: center;
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

.buttonGroup .square button {
  width: 25%;
  max-width: 800px;
  margin: 1rem;
  overflow: hidden;
  padding: 1rem 2rem;
  background: #ff8d24;
  font-size: 125%;
  font-weight: 550%;
  color: #fff;
}


</style>


