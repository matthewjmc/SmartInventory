
<template>

    <div class="flex-container">

      <div> 
        <img src='~assets/CIElogo.png' > 
      </div>

      <div class="box"> 
          <header class="dispTitle"> 
            CIE INVENTORY SYSTEM
          </header>
          <h1>
            <pre>
            This system is a tracking systems for items in CIE storage room
            which is a part of Internet of Things and Smart Systems project.
            </pre>
          </h1>
          <nuxt-link class='loginButton' to='/login'> Login
          </nuxt-link> 
      </div>  
      
    </div>  

</template>

<script>
    export default {
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

.flex-container  {
  padding-top: 1%;
  text-align: center;
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

.box > .dispTitle {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  text-justify: center;
  justify-content: center;
  padding-top: 30px;
  font-size: 26px;
  color: #FFF;
}

.box h1 > pre {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  text-align: justify;
  justify-content: center;
  padding-top: 12px;
  font-size: 20px;
  color: #FFF;
}

.box {
  text-align: center;
  justify-content: center;
  width: 700px;
  height: 200px;
  margin: -1.5rem;
  overflow: hidden;
  background: #ffa959;
  z-index: -1;
  border-radius: 50px;
}

.loginButton {
        text-align: center;
        justify-content: center;
        display: inline-block;
        background: #D77113;
        color: #fff;
        padding: 0.6rem 6rem;
        border-radius: 20px;
        border-width: 100px;
        font-size: 30px;    
}

</style>