<template>
  <div>
    <div id="main">
      <!-- ICON DO DIA -->
      <div >
        
        <img alt="icon" id="iconSunny" style="display:none" src="../assets/sunny.png">
        <img alt="icon" id="iconHot" style="display:none" src="../assets/hot.png">
        <img alt="icon" id="iconCloudy" style="display:none" src="../assets/cloudy.png">
        <img alt="icon" id="iconRainy" style="display:none" src="../assets/rainy.png">
        <img alt="icon" id="iconMoon" style="display:none" src="../assets/moon.png">
      </div>

      <div id="text">
        <!-- TITULO -->
        <p id="title">
          <i
            class="fas fa-map-marker-alt"
            style="color:white; font-size: 16pt; margin-right:2%; vertical-align: baseline"
          ></i>
          <b>ESMAD</b>
        </p>

        <!-- HORAS  -->
        <p id="horas">
          {{ new Date().toLocaleTimeString('en-GB', { hour: "numeric",minute: "numeric"})}}
          h
        </p>

        <!-- TEMPERATURA DO DIA DE HOJE -->
        <p id="temperatura"></p>

        <!-- HUMIDADE -->
        <p id="humidade"></p>

        <!-- VELOCIDADE DO VENTO -->
        <p id="vento"></p>
      </div>
    </div>
    <!-- MENSAGEM DO DIA -->
    <div>
      <p id="message"></p>
    </div>
  </div>
</template>

<script>
import app from "@/App";
export default {
  name: "home",
  components: {
    app: app
  },
  data() {
    return {};
  },

  created() {
    this.$http
      .get("http://eb2-threequartersjohn.c9users.io/readings/recent")
      .then(response => {
        console.log(response);

        document.getElementById("temperatura").innerHTML =
          response.data.temperature + "ºC";
        document.getElementById("humidade").innerHTML =
          response.data.humidity + "% humidade";
        document.getElementById("vento").innerHTML =
          window.wind + " m/s vento";

        window.humidity = response.data.humidity;
        window.temperature = response.data.temperature;

        // variação de temperatura máxima
        var tempHot = response.data.temperature >= 23;
        var tempSunny =
          response.data.temperature <= 23 && response.data.temperature >= 12;

        // variação de probabilidade de chuva
        var seRainy = response.data.humidity >= 51;
        var seCloudy =
          response.data.humidity <= 50 && response.data.humidity >= 15;
        var seSunnyHot = response.data.humidity <= 15;

        //TIPO DO TEMPO
        var tipoTempo = "";
        
         //hmm acho que é assim
        let date = new Date();
        let hours = parseInt(date.getHours());
        let minutes =parseInt( date.getMinutes());
      
      
      // A PARTIR DAS 20.00H DE NOITE ATE AS 5.30H DE MANHA LIGA-SE O MODO NOITE, COM LUA
        if((hours>= 20 && minutes>= 0) || (hours<= 5 && minutes<= 30)){ 
           document.getElementById("iconMoon").style.display = "inline-block";
           document.body.style.background="#1D344E";
           document.getElementById("message").innerHTML="Boa noite e Bons sonos!";
        } else  if (seRainy) {
          document.getElementById("iconRainy").style.display = "inline-block";
          tipoTempo = "rain";
          document.body.style.background = "#7393A7";
        } else if (seCloudy) {
          document.getElementById("iconCloudy").style.display = "inline-block";
          tipoTempo = "cold";
          document.body.style.background = "#BEB0C1";
        } else if (tempHot && seSunnyHot) {
          document.getElementById("iconHot").style.display = "inline-block";
          tipoTempo = "hot";
          document.body.style.background = "#F9C5C5";
        } else if (tempSunny && seSunnyHot) {
          document.getElementById("iconSunny").style.display = "inline-block";
          tipoTempo = "sun";
          document.body.style.background = "#80DDDD";
        } 
     

        console.log("entered show random messages ");

        fetch(
          "https://eb2-threequartersjohn.c9users.io/messages/random/weather/" +
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
            document.getElementById("message").innerHTML = response.message;
            console.log(response);
          })
          .catch(error => console.log(error));

        // Se a prob. chuva é maior que 51% é rainy
        // Se a prob. chuva é menor que 50% e maior que 15% é cloudy
        // Se a temp. maxima é maior que 25º e a prob.chuva é menor que 15% é hot
        // Se a temp. maxima é menor que 25º e maior que 15º e a prob. chuva é menor que 15% é sunny

        console.log(window.wind);
        console.log(window.rain);
        console.log(response.data);
        console.log(tipoTempo);
        console.log(document.body.style.background);
      })
      .then(response => {
       
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
@media screen and (min-width: 450px) {
  div #text {
    text-align: left;
  }
  p #title {
    margin-top: 4rem;
    font-size: 25pt;
  }
  p {
    margin-left: 2rem;
    font-size: 18pt;
    color: white;
  }
  p #message {
    text-align: center;
    font-size: 35px;
    font-weight: 700;
    margin-top: 3rem;
  }

  #main {
    justify-content: center;
    border: none;
    display: -webkit-flex; /* Safari */
    -webkit-flex-direction: row; /* Safari 6.1+ */
    display: flex;
    flex-direction: row;
  }

  #main img {
    width: 400px;
  }
}

@media screen and (max-width: 450px) {
  p #title {
    margin-top: 0.5rem;
    font-size: 20pt;
  }
  p {
    color: white;
    font-size: 14pt;
  }
  p #message {
    font-size: 20px;
    font-weight: 700;
  }
  #message {
    margin-top: 0.5rem;
  }
  #main {
    justify-content: center;
    border: none;
    display: -webkit-flex; /* Safari */
    -webkit-flex-direction: column; /* Safari 6.1+ */
    display: flex;
    flex-direction: column;
  }

  #main img {
    width: 50%;
    margin-top: 7%;
    
  }
}
</style>

