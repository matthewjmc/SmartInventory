<---https://api.iot2.mcmullin.org/auth/google--->

<template>
<div>
    <AppHeader class="container"/>
        <div class="flex-container">
          <div> 
            <img class="img" src='~assets/CIElogo.png' > 
          </div>

          <div class="box"> 
              <header class="dispTitle"> 
                CIE INVENTORY SYSTEM
              </header>

              <h1>
                <p>
                This system is a tracking systems for items in CIE storage room
                which is a part of Internet of Things and Smart Systems project.
                </p>
            
              </h1>
            <a class='loginButton' href="https://api.iot2.mcmullin.org/auth/google">LOGIN WITH KMITL ACCOUNT</a>
          </div>  

        </div>
</div>    
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
    export default {
      components:{
        AppHeader
      },
        head(){
            return{
            title: 'Homepage',
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
  text-align: justify;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center; 
}

.img {
  padding-top: 40%;
  width: 250px;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.box {
  text-align: center;
  justify-content: center;
  width: 700px;
  height: 200px;
  margin: -1.5rem;
  overflow: hidden;
  background: #ffa959;
  border-radius: 50px;
}

.box > .dispTitle {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  text-justify: center;
  justify-content: center;
  padding-top: 30px;
  font-size: 26px;
  color: #FFF;
}

.box h1 > p {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  text-align: center;
  justify-content: center;
  padding: 20px;
  padding-left: 25px;
  padding-right: 25px;
  font-size: 21px;
  color: #FFF;
}

.loginButton {
  text-align: center;
  justify-content: center;
  display: inline-block;
  background: #D77113;
  font-weight: 600;
  color: #fff;
  padding-top: 17px;
  padding: 0.6rem 6rem;
  border-radius: 20px;
  border-width: 100px;
  font-size: 22px;    
}

</style>


