
<template>
    <div class="flex-container">
      <div> <img src='~assets/CIElogo.png' > </div>
      <div class="box"> <header class="dispTitle"> CIE Inventory is a system to keep track of items in the stock</header> </div>     
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

.image {
  align-items: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 12%;
  max-width: 50%;
  position: absolute;
  }

.center {
  align-items: center;
  margin: auto;
  width: 50%;
  padding: 10px;
}


p {
  align-items: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  width: 10%;
  position: absolute;
  padding-top: 18%;
}

.flex-container  {
  padding-top: 1%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

img {
  padding-top: 40%;
  width: 250px;
  align-items: center;
  justify-content: center;
}

div .dispTitle {
  padding-top: 100;
  font-size: 1.1rem;
  
}


.box {
  max-width: 2600px;
  margin: -1rem;
  overflow: hidden;
  padding: 1rem 2rem;
  background: #ff8d24;
  z-index: -1;
}


</style>