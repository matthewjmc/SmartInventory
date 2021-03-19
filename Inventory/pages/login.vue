
<template>

    <div class="flex-container">

      <div> 
        <img src='~assets/CIElogo.png' > 
      </div>

      <div class="box"> 

          <form>
                <div class="infoEntry">
                    <div class="entryName">
                        <label>Student ID</label>
                    </div>
                    <div class="inputEntry">
                        <input type="text" id="studentID" name="studentID">
                    </div>
                </div>

                <div class="infoEntry">
                    <div class="entryName">
                        <label>Password</label>
                    </div>
                    <div class="inputEntry">
                        <input type="password" id="password" name="password">
                    </div>
                </div>

                <div class="submitButton">
                        <input type="submit" value="SUBMIT">
                </div>
          </form>
        
      
      </div>

    </div> 
    
</template>

<script>
    export default {
        head(){
            return{
            title: 'Login',
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


.center {
  align-items: center;
  margin: auto;
  width: 50%;
  padding: 10px;
}

.flex-container  {
  flex: 100 0 25em;
  padding-top: 1%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.infoEntry  {
  color: white;
  font-weight: 700;
  flex: auto;
  padding-top: 0.25%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: left;
}

img {
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

.submitButton {
  font-weight: 600;
  text-align: center;
  justify-content: center;
  display: inline-block;
  background: #D77113;
  color: #fff;
  padding: 0.6rem 6rem;
  border-radius: 20px;
  border-width: 50px;
  font-size: 30px;    
}

form {
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-top: 5%;   
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

     /* Style inputs, select elements and textareas */
input[type=text], select, textarea{
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

input[type=password], select, textarea{
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

/* Style the label to display next to the inputs */
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

/* Style the submit button */
input[type=submit] {
  color: white;
  padding-top: 10px;
  padding: 1px 3px;
  border: none;
  border-radius: 4px;
}

/* Style the container */

/* Floating column for labels: 25% width */
.entryName {
  font-color: #fff;
  float: left;
  width: 20%;
  margin-top: 6px;
}

/* Floating column for inputs: 75% width */
.inputEntry {
  float: left;
  width: 70%;
  margin-top: 3px;
}

/* Clear floats after the columns */
.row {
  padding-left: 5%;
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
  .entryName, .inputEntry, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
} 

</style>


