<template>
  <div id="registo">
    <div class="container">
      <p id="title">REGISTAR-ME</p>
      <input type="text" placeholder="O teu e-mail..." id="email" name required>
      <br>
      <input type="password" placeholder="A tua palavra-passe..." id="pass" name required>
      <br>

      <input
        type="password"
        placeholder="Repete aqui a tua palavra passse..."
        id="pass2"
        name
        required
      >
      <br>
      <button type="submit" v-on:click="registar()">
        <b>REGISTAR</b>
      </button>
      <br>
      <router-link :to="{path:'/'}">
        <a>
          <u>Voltar à página inicial.</u>
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
 
  methods: {
    registar() {
      let email = document.getElementById("email").value;
      let pass = document.getElementById("pass").value;
      let pass2 = document.getElementById("pass2").value;

      //verificar condições de erro
      if (
        pass !== pass2 || //se passwords forem diferentes...
        email == "" || //se email estiver vazio...
        pass == "" || //se pass estiver vazio...
        pass2 == ""
      ) {
        //se pass2 estiver vazio...
        alert("Erro!!!");
        return;
      }

      console.log("collecting data...");
      let data = {
        email: email,
        password: pass
      };

      console.log("fetching...");

      
      fetch("http://eb2-threequartersjohn.c9users.io/users", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json' 
          },
        body: JSON.stringify(data),
      })
        .then(response => {
          return response.json();
          alert("O utilizador foi gravado com sucesso!");
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
p,
a {
  color: white;
}

@media screen and (max-width: 450px) {
  input[type="text"],
  input[type="password"] {
    width: 65%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .container {
    float: center;
    margin-top: 30%;
    
  }
  .fa {
    float: left;
    
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
    width: 65%;
  }

  button:hover {
    opacity: 0.7;
  }
  p #title {
    font-size: 18pt;
    margin-bottom: 2rem;
  }
  a,
  button {
    font-size: 9pt;
  }

  ::placeholder {
    font-size: 10px;
  }
}

@media screen and (min-width: 450px) {
  input[type="text"],
  input[type="password"] {
    width: 35%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .container {
    float: center;
    margin-top: 10%;
    
  }
  .fa {
    float: left;
    
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
    width: 35%;
  }

  button:hover {
    opacity: 0.7;
  }
  p {
    font-size: 22pt;
    margin-bottom: 2rem;
  }
}
</style>
