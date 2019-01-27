<template>
<div id="definitionAdmin">
  <div class="container">
    <p id="title">DEFINIÇÕES</p>
  
    <p id="label">Adiciona frases do dia:</p>
    <br>
    <br>
    <div class="form-group">
      <p id="label">Seleciona o tipo:</p>
      <select class="form-control" id="tipoTempo" @change="showMessages()">
            <option value="hot" selected>Hot</option>
            <option value="sun">Sun</option>
            <option value="cold">Cold</option>
            <option value="rain">Rain</option>
          </select>
    </div>
    <textarea class="form-control" rows="5" id="frasesTempo"></textarea>
  
    <button type="submit" v-on:click="saveMessages()">
        <b>Guardar</b>
      </button>
<br>
<br>
<br>

<label for="frases">Frases:</label>
<textarea class="form-control" rows="5" id="frases"></textarea>

<button type="submit" id="apagarFrase">
          <b>Apagar</b>
        </button>
<br>
<br>
<br>

<form>
  <div class="form-group">
    <label for="leituras">Últimas leituras:</label>
    <textarea class="form-control" rows="5" id="leituras"></textarea>
  </div>
</form>

<br>

<router-link :to="{path:'/navigation'}">
  <u id="fim">Voltar à página inicial.</u>
</router-link>

<br>
<br>
<br>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      messages: []
    };
  },
  created() {
    console.log("entered show messagess");

    fetch("https://eb2-threequartersjohn.c9users.io/readings/upto/15", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        var html = "";
        for (let i = 0; i < response.length; i++) {
          html +=
            [i + 1] +
            " - Temperatura: " +
            response[i].temperature +
            "ºC" +
            ",  " +
            "Chuva: " +
            response[i].rain +
            ",  " +
            "Humidade: " +
            response[i].humidity +
            "%" +
            "&#13;";
        }
        document.getElementById("leituras").innerHTML = html;
        console.log(response);
      })
      .catch(error => console.log(error));
  },
  methods: {
    saveMessages() {
      let frasesTempo = document.getElementById("frasesTempo").value;
      let tipoTempo = document.getElementById("tipoTempo").value;

      //verificar condições de erro
      if (
        frasesTempo == "" || //...
        tipoTempo == ""
      ) {
        //...
        alert("Erro!!!");
        return;
      }
      console.log("collecting data 'defAdmin' ...");
      let data = {
        message: frasesTempo,
        weather: tipoTempo
      };

      console.log("fetching 'defAdmin'...");
      fetch("https://eb2-threequartersjohn.c9users.io/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          return response.json();
        })
        .then(response =>{
          console.log(response);
          
         
        } )
        .catch(error => {
          console.log(error);
           document.getElementById("frasesTempo").value="";
          alert("Mensagem gravada com sucesso!");
        }
        );
    },

    showMessages() {
      console.log("entered show messagess");

      let tipoTempo = document.getElementById("tipoTempo").value;

      fetch(
        "https://eb2-threequartersjohn.c9users.io/messages/weather/" +
          tipoTempo,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => {
          return response.json();
        })
        .then(response => {
          var html = "";
          for (let i = 0; i < response.length; i++) {
            html += [i + 1] + " - " + response[i].message + "&#13;";
          }
          document.getElementById("frases").innerHTML = html;
          console.log(response);
        })
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
  input[type="checkbox"] {
    height: 25px;
    width: 25px;
    float: right;
  }

  input[type="number"],
  input[type="time"] {
    float: right;
    width: 15%;
    border: 1px solid rgba(83, 83, 83, 0.925);
    box-sizing: border-box;
    background-color: white;
    vertical-align: middle;
  }
  select {
    float: right;
    width: 50%;
    box-sizing: border-box;
    background-color: white;
    vertical-align: middle;
    font-size: 10pt;
  }

  option {
    font-size: 10pt;
  }
  #label {
    float: left;
    color: white;
    font-size: 12pt;
  }

  label {
    float: left;
    color: white;
    font-size: 12pt;
  }

  a {
    font-size: 9pt;
  }
  .container {
    float: center;
    margin-top: 7%;
    width: 95%;
  }

  button {
    background-color: transparent;
    border: 2px solid white;
    color: white;
    padding: 14px 20px;
    margin-top: 8px;
    margin-bottom: 5%;
    cursor: pointer;
    width: 35%;
    font-size: 9pt;
    float: right;
  }
  button:hover {
    opacity: 0.7;
  }
  p #title {
    font-size: 18pt;
    margin-bottom: 2rem;
  }
  ::placeholder {
    font-size: 10px;
  }
  #title {
    font-weight: bold;
  }
}

@media screen and (min-width: 450px) {
  input[type="checkbox"] {
    height: 25px;
    width: 25px;
    float: right;
  }

  u#fim {
    margin-bottom: 5%;
  }

  select {
    float: right;
    width: 35%;
    box-sizing: border-box;
    background-color: white;
    vertical-align: middle;
  }

  option {
    font-size: 14px;
  }
  #label {
    float: left;
    color: white;
    font-size: 20px;
  }

  label {
    float: left;
    color: white;
    font-size: 20px;
  }
  .container {
    float: center;
    margin-top: 5%;
    width: 40%;
  }

  button {
    background-color: transparent;
    border: 2px solid white;
    color: white;
    padding: 14px 20px;
    margin-top: 8px;
    margin-bottom: 40px;
    /* display: inherit; */
    cursor: pointer;
    width: 25%;
    float: right;
  }
  button:hover {
    opacity: 0.7;
  }
  p#title {
    font-size: 22pt;
    margin-bottom: 1.5rem;
  }
  p#options {
    font-size: 15pt;
  }
}
</style>
