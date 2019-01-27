<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import login from "@/components/login";

export default {
  name: "app",
  components: {
    // 'app-navbar':navigation,
    "app-login": login
  },
  data() {
    return {
      
    };
  },
  
};
</script>

<style>
body {
  background-color: #BEB0C1  ;
  /*#1D344E night*/
  /* #7393A7 rainy */
  /* #BEB0C1 cloudy */
  /* #F9C5C5 hot */
  /* #80DDDD sunny */
}
@media screen and (min-width: 450px) {
  #app {
    justify-content: center;
    font-family: "Nunito", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
}

@media screen and (max-width: 450px) {
  #app {
    justify-content: center;
    font-family: "Nunito", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
  }
}
</style>
