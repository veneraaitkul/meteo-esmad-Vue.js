<template>
  <div id="definitionUser">
    <div class="container">
      <p id="title">DEFINIÇÕES</p>

      <div class="form-group">
        <p id="options">Opções de aviso:</p>
        <label for="#horaAviso">Hora:</label>
        <input class="form-control" type="time" id="horaAviso" name="appt" value="00:00" required>
      </div>
      <br>
      <br>
      <div class="form-group">
        <label for="#tipoAviso">Tipo:</label>
        <select id="tipoAviso" class="form-control">
          <option value="push_notification">Notificação Push</option>
          <option value="email">Aviso por e-mail</option>
        </select>
      </div>
      <br>
      <br>
      <br>
      <div class="form-group">
        <label style="font-size:20px">
          <b>Quero receber aviso quando:</b>
        </label>
        <br>
        <br>
        <label for="#tempMinAviso">Temperatura abaixo de (ºC):</label>
        <input class="form-control" type="number" id="tempMinAviso">
      </div>
      <br>
      <br>
      <div class="form-group">
        <label for="tempMaxAviso">Temperatura acima de (ºC):</label>
        <input class="form-control" type="number" id="tempMaxAviso">
      </div>
      <br>
      <br>

      <div class="form-group">
        <label for="seChuvaAviso">Se estiver a chover:</label>
        <select id="seChuvaAviso" class="form-control">
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
      <br>
      <br>

      <button id="save" type="submit" v-on:click="definicoes()">
        <b>GUARDAR</b>
      </button>
      <br>
      <router-link :to="{path:'/navigation'}">
        <u>Voltar à página inicial.</u>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    definicoes() {
      let horaAviso = document.getElementById("horaAviso").value;
      let hours = horaAviso.split(":")[0];
      let minutes = horaAviso.split(":")[1];

      let tipoAviso = document.getElementById("tipoAviso").value;
      let tempMinAviso = document.getElementById("tempMinAviso").value;
      let tempMaxAviso = document.getElementById("tempMaxAviso").value;
      let seChuvaAviso = document.getElementById("seChuvaAviso").value;
      let user_id = window.user_id;
      let seAtivo = true;

      console.log("collecting data...");
      let data = {
        user_id: user_id,
        tipo:tipoAviso,
        hour: hours,
        minute: minutes,
        active: seAtivo,
        temp_higher_than: tempMinAviso,
        temp_lower_than: tempMaxAviso,
        if_rain: seChuvaAviso
      };

      console.log("fetching...");

      fetch("http://eb2-threequartersjohn.c9users.io/warnings", {
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
          console.log(document.getElementById("tipoAviso").value);
        })
        .catch(error => {
          console.log(error);
          alert("Definições foram gravadas com sucesso!");
        }
        );
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
  .container {
    line-height: 140%;
  }
  input[type="checkbox"] {
    height: 25px;
    width: 25px;
    float: right;
  }
  #save {
    margin-top: 3%;
  }
  #back {
    margin-top: 15%;
  }
  input[type="number"],
  input[type="time"] {
    float: right;
    width: 15%;
    box-sizing: border-box;
    background-color: white;
    vertical-align: middle;
  }
  select {
    float: right;
    width: 60%;
    box-sizing: border-box;
    background-color: white;
    vertical-align: middle;
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
    margin-top: 5%;
    width: 95%;
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
  button:active {
    color: rgb(180, 180, 180);
  }
  button:hover {
    opacity: 0.7;
  }
  #title {
    font-size: 16pt;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  button {
    font-size: 9pt;
  }

  ::placeholder {
    font-size: 10px;
  }
}

@media screen and (min-width: 450px) {
  input[type="checkbox"] {
    height: 25px;
    width: 25px;
    float: right;
  }
  select {
    float: right;
    width: 35%;
    box-sizing: border-box;
    background-color: white;
    vertical-align: middle;
    height: 33px;
  }
  #definitionUser {
    line-height: 130%;
  }

  option {
    font-size: 14px;
  }
  input[type="time"] {
    float: right;
    width: 18%;
    box-sizing: border-box;
    background-color: white;
    vertical-align: middle;
    height: 33px;
  }
  input[type="number"] {
    float: right;
    width: 12%;
    box-sizing: border-box;
    background-color: white;
    vertical-align: middle;
    height: 33px;
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
    display: inline-block;
    cursor: pointer;
    width: 35%;
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
