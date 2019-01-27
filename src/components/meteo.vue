<template>
  <div>
    <!-- METEOROLOGIA SEMANAL VILA DO CONDE -->
    <p id="title">
      Previsão semanal para
      <b>Vila do Conde</b>
    </p>
    <b-card-group id="card">
      <!-- EU METI AQUI ":", não funciona se meter ':', por isso vai continuar com erro -->
      <b-card v-for="forecast in forecasts" id="meteoCard">
        <b-card-body>
          <!-- ICON -->
          <img
            v-bind:src="'https://developer.accuweather.com/sites/default/files/' + (forecast.Day.Icon<=9? '0'+forecast.Day.Icon: forecast.Day.Icon) +'-s.png'"
            style="width:100px;height:60px; margin-bottom:20px"
            alt="image"
            id="meteoIcon"
          >

          <!-- DATA -->
          <p
            class="card-text"
            id="tempo"
          >{{(forecast.Date.split("-")[2]).split("T")[0] +"/"+(forecast.Date.split("-")[1])}}</p>

          <!-- TEMPERATURA MINIMA E MAXIMA -->
          <p class="card-text">
            {{forecast.Temperature.Minimum.Value}}ºC - {{forecast.Temperature.Maximum.Value}}ºC
            <i
              class="far fa-sun"
            ></i>
          </p>

          <!-- PROBABILIDADE DE CHUVA -->
          <p class="card-text">
            {{forecast.Day.RainProbability}}%
            <i class="fas fa-tint"></i>
          </p>

          <!-- VELOCIDADE DO VENTO -->
          <p class="card-text">
            {{forecast.Day.Wind.Speed.Value}} m/s
            <i class="fas fa-wind"></i>
          </p>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
export default {
  name: "meteo",
  components: {},
  data() {
    return {
      date: [],
      iconJson: [],
      minTemp: [],
      maxTemp: [],
      rain: [],
      wind: [],
      forecasts: [],
      icons: [],
      timeDia: [],
      time: []
    };
  },
  created() {
    this.$http
      .get(
        "http://dataservice.accuweather.com/forecasts/v1/daily/5day/275270?apikey=Sd0Fu8I0As4RHPbFZkfqYtBERsKjuhHe&details=true&metric=true"
      )
      .then(response => {
        //   ARRAY COM NUMERO DE ICONS
        for (let i = 0; i < response.data.DailyForecasts.length; i++) {
          this.icons.push(response.data.DailyForecasts[i].Day.Icon);
          
        }

        // ARRAY COM URL DE ICONS SEPARADOS
        for (let i = 0; i < this.icons.length; i++) {
          this.iconJson.push(
            "https://developer.accuweather.com/sites/default/files/" +
              this.icons[i] +
              "-s.png"
          );
          
        }

        // ARRAY COM TODOS OS DADOS
        for (let i = 0; i < response.data.DailyForecasts.length; i++) {
          this.forecasts.push(response.data.DailyForecasts[i]);
        }
        setTimeout(() => {
          for (let i = 0; i < this.forecasts.length; i++) {
            this.date.push(this.forecasts[i].Date);
            this.minTemp.push(this.forecasts[i].Temperature.Minimum.Value);
            this.maxTemp.push(this.forecasts[i].Temperature.Maximum.Value);
            this.rain.push(this.forecasts[i].Day.RainProbability);
            this.wind.push(this.forecasts[i].Day.Wind.Speed.Value);
            this.icons.push(response.data.DailyForecasts[i].Day.Icon);

            window.wind = this.wind[0]; 

            window.rain = this.rain[0]; //GRAVA A PROB DA CHUVA DO DIA DE HOJE PARA USAR NA PÁGINA INICIAL
          }
        }, 1000);

        
      })
      .catch(error => {
        console.log(error);
      });

    // =============================================================
  }  
};
</script>
<style scoped>
@media screen and (min-width: 450px) {
  #card {
    width: 70%;
    margin: auto;
    margin-bottom: 10%;
  }
  p {
    font-size: 15px;
    text-align: center;
  }
  p #tempo {
    font-size: 15px;
    font-weight: 600;
  }
  p #title {
    font-size: 20px;
    color: white;
  }
  .card-group > .card:first-child > .card-body {
    background-color: rgb(255, 255, 255);
    box-shadow: -8px -1px 40px 15px rgba(255, 255, 255, 0.5);
  }
  .card-group > .card:nth-child(2),
  .card:nth-child(3),
  .card:nth-child(4),
  .card:nth-child(5),
  .card:nth-child(6) > .card-body {
    background-color: rgba(255, 255, 255, 0.445);
  }
}

@media screen and (max-width: 450px) {
  #card {
    margin: 0 auto; /* Added */
    float: none;
    width: 80%;
  }
  p {
    font-size: 14px;
    text-align: center;
  }
  p #tempo {
    font-size: 15px;
    font-weight: 600;
  }
  p #title {
    font-size: 20px;
    color: white;
  }
  .card-group > .card:first-child > .card-body {
    background-color: rgb(255, 255, 255);
    box-shadow: -8px -1px 40px 15px rgba(255, 255, 255, 0.5);
  }
  .card-group > .card:nth-child(2),
  .card:nth-child(3),
  .card:nth-child(4),
  .card:nth-child(5),
  .card:nth-child(6) > .card-body {
    background-color: rgba(255, 255, 255, 0.445);
  }
}

</style>
