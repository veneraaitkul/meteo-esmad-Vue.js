<template>
  <div id="login">
    <form>
      <div class="imgcontainer">
        <img
          src="../assets/logo.png"
          style="width:150px;margin-bottom:30px"
        >
      </div>
      <div class="header">
        <p class="title">Olá-olá! Estas de volta aqui?</p>
      </div>
      <div class="container">
        <input type="text" placeholder="O teu e-mail..." name="uname" id="uname" required>

        <br> 
        
        <input type="password" placeholder="A tua palavra-passe..." name="psw" id="psw" required>
        
        <br>

        <button v-on:click="login()">
          <b>ENTRAR</b>
        </button>

        <br>

        <router-link :to="{path:'/registo'}">
             <u>Quero registar-me!</u>
        </router-link>
        

        <br>
        <br>
        
        <span>Esqueci-me da minha <a v-b-modal.myModal ><u> palavra-passe</u></a>.</span>
        
        <!------------------------------------------------------------------------------------------------------->
        
         <b-modal centered id="myModal" tabindex="-1"  role="dialog" hide-footer  hide-header>           
         <p id="txtModal">Introduz aqui o seu e-mail para repor a sua palavra-passe:</p>    
         <input type="text" style="width:100%;" placeholder="O teu e-mail..." name="username" id="username" required>
         <br>
          <button  id="btnModal" v-on:click="reporPass()">
            <b>ENVIAR</b>
          </button>
          
          <br> 
           <a v-b-modal.myModal1 style="float:left;color:gray"><u>Já tenho a chave.</u></a>
          </b-modal>
          
        <br>
        
        <!------------------------------------------------------------------------------------------------------->
        
<b-modal centered id="myModal1" tabindex="-1" role="dialog" hide-footer hide-header>
  <div id="divNewPass">
    <form>

      <label id="lbl" for="newKey">A chave:</label>

      <input type="text" placeholder="A chave" id="newKey" required>
      
      <br><br>
      <label for="newPass">A nova palavra-passe:</label>
      <input type="password" placeholder="A nova palavra-passe" id="newPass" required>

      <br>

      <button v-b-modal.myModal id="repor" v-on:click="novaPass()">
          <b>REPOR</b>
        </button>

    </form>
  </div>
</b-modal>
         
        
        <a href id="error"></a>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "login",

    data() {
      return {

      };
    },
    methods: {
      login() {
        let email = document.getElementById("uname").value;
        let pass = document.getElementById("psw").value;
        let error = document.getElementById("error").value;

        //verificar condições de erro
        if (
          pass == "" || //se password for vazio...
          email == "" //se pass estiver vazio...
        ) {
          //se estiver vazio...
          document.getElementById("error").innerHTML = "Preencha os seus dados!";
          return;
        }

        console.log("collecting data...");
        let data = {
          email: email,
          password: pass
        };

        console.log("fetching...");

        fetch("http://eb2-threequartersjohn.c9users.io/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then(response => {
            console.log(response);

            if (response.status == 200) {
              console.log(response.headers);
              this.$router.replace({ name: "navigation" });
            }
            else {
              document.getElementById("error").innerHTML =
                "E-mail ou palavra-passe estão errados!";
            }
            return response.json();
          })
          .then(response => {
            console.log(response);
            window.admin = response.admin;
            window.user_id = response.id;
          })
          .catch(error => console.log(error));
      },              
      reporPass() {
        let repEmail = document.getElementById("username").value;
        console.log("collecting data...");
        let data = {
          email: repEmail
        };

        console.log("fetching...");

        fetch("http://eb2-threequartersjohn.c9users.io/password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then(response => {
            return response.json();
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      },
      novaPass(){
        let key = document.getElementById("newKey").value;
        let newPass = document.getElementById("newPass").value;
        console.log("collecting data...");
        let data = {
          password:newPass //só a password aqui
          
        };

        console.log("fetching...");

        fetch("http://eb2-threequartersjohn.c9users.io/password/" + key, { 
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then(response => {
            return response.json();
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };
</script>
<style scoped>
  @media screen and (max-width: 450px) {
 
#divNewPass{
            margin-left:5%;
            margin-right:5%;
        }
     label, #txtModal {
            float: left;
            color: gray;
           
        }
        #lbl {
            margin-top: 25%;
        }
        #newPass {
            max-width: 500px;
            margin: auto;
        }
        
        #newPass,#newKey {

            /*float:left;*/
            width: 100%;
            padding: 12px 20px;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }

        #repor, #btnModal {
            background-color: transparent;
            border: 2px solid #7393A7;
            color: gray;
            padding: 14px 20px;
            margin-top: 8px;
            margin-bottom: 40px;
            display: inline-block;
            cursor: pointer;
            width: 30%;
            float: right;
        }
    span,
    p,
    a {
      color: white;
    }
    input[type="text"],
    input[type="password"] {
      width: 75%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }

    button {
      background-color: transparent;
      border: 2px solid white;
      color: white;
      padding: 14px 20px;
      margin-top: 8px;
      margin-bottom: 40px;
      display: inline-block;
      cursor: pointer;
      width: 75%;
    }

    .title {
      font-size: 20px;
    }
    a,
    span,
    button {
      font-size: 14px;
    }

    ::placeholder {
      font-size: 12px;
    }
  }

  @media screen and (min-width: 450px) {
     label {
            float: left;
            color: gray;
           
        }
        #lbl {
            margin-top: 7%;
        }
        #divNewPass
        {
            max-width: 500px;
            margin: auto;
            /*padding: 10px;*/
        }
        #newPass, #newKey {

            /*float:left;*/
            width: 100%;
            padding: 12px 20px;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }

        #repor {
            background-color: transparent;
            border: 2px solid #7393A7;
            color: gray;
            padding: 10px 15px;
            margin-top: 8px;
            display: inline-block;
            cursor: pointer;
            width: 30%;
            float: right;
        }

    #txtModal {
      margin-top: 10%;
      float: left;
      color: gray;
    }
    #btnModal {
      float: right;
      background-color: transparent;
      border: 2px solid #7393A7;
      color: gray;
      padding: 10px 15px;
      margin-top: 8px;
      margin-bottom: 40px;
      display: inline-block;
      cursor: pointer;
      width: 28%;
    }
    span,
    p,
    a {
      color: white;
    }
    input[type="text"],
    input[type="password"] {
      width: 33%;
      padding: 12px 20px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }

    button {
      background-color: transparent;
      border: 2px solid white;
      color: white;
      padding: 14px 20px;
      margin-top: 8px;
      margin-bottom: 40px;
      display: inline-block;
      cursor: pointer;
      width: 33%;
    }

    .title {
      font-size: 25px;
    }
    button:hover {
      opacity: 0.7;
    }

    .imgcontainer {
      text-align: center;
      margin: 24px 0 12px 0;
    }

    ::placeholder {
      font-size: 14px;
    }
  }
</style>
