<template>
  <div id="Navbar">
    <b-container fluid>
      <b-row>
        <b-navbar
          id="menuNavBar"
          v-b-scrollspy:scrollspy-nested
          class="flex-row center"
          style="font-family: 'Nunito', sans-serif;"
        >
          <b-nav id="menuNav" pills class="flex-row">
            <b-nav-item id="menuNavItem" class="active" href="#home">INÍCIO</b-nav-item>

            <b-nav-item id="menuNavItem" href="#meteo">METEOROLOGIA</b-nav-item>

            <b-nav-item id="menuNavItem" href="#" v-on:click="config()">DEFINIÇÕES
              
            </b-nav-item>
          </b-nav>
        </b-navbar>

        <div id="scrollspy-nested" style="position:absolute;height:85%;width:100%;overflow-y:auto;">
          <!-- PAGINA INICIAL -->
          <div>
            <p>
              <home id="home"></home>
            </p>
          </div>
          <!-- PAGINA DE METEOROLOGIA -->
          <div>
            <p>
              <meteo id="meteo"></meteo>
            </p>
          </div>

          <!-- FOOTER -->
          <div class="footer">
            
              <foot id="foot"></foot>
            
          </div>
        </div>
      </b-row>
    </b-container>
  </div>
</template>
 
<script>
import home from "@/components/home.vue";
import meteo from "@/components/meteo.vue";
import foot from "@/components/footer.vue";
import configUser from "@/components/configUser.vue";

export default {
  
  name: "login",

  data() {
    return {
      home: home,
      meteo: meteo,
      foot: foot,
      defUser: configUser
    };
  },
  components: {
    home: home,
    meteo: meteo,
    foot: foot,
    defUser: configUser
  },
  methods: {
    config() {
      console.log(window.admin);
      if (window.admin == true) {
        this.$router.replace({ name: "configAdmin" });
      } else {
        this.$router.replace({ name: "configUser" });
      }
    }
  }
};
</script>



<style scoped>
@media screen and (max-width: 450px) {
  .footer {
    position: relative;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 15%;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    color: white;
    text-align: center;
  }
  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    color: white;
    background-color: transparent;
    font-weight: 700;
  }

  .flex-row {
    justify-content: center;
  }

  li > a {
    position: relative;
    float: none;
    text-align: center;
    color: white;
    font-size: 13px;
  }
  li > a:hover {
    color: #e5e7e8;
  }
  a {
    color: white;
  }
  #home {
    margin-bottom: 10%;
  }

  #meteo {
    margin-top: 15%;
    margin-bottom: 7%;
  }

  #footer {
    background-color: antiquewhite;
  }
  #scrollspy-nested {
    margin-top: 7%;
    justify-content: center;
  }

  .flex-row {
    position: relative;
    margin: auto;
    margin-top: -2%;
  }
  #b-drop {
    color: green;
    background-color: transparent;
    text-decoration: none;
  }

  h3 {
    margin: 40px 0 0;
  }
  #menuBar {
    text-decoration: none;
    color: red;
  }

  .navbar {
    padding: 0rem 1rem 4rem;
  }
}

@media screen and (min-width: 450px) {
  #scrollspy-nested::-webkit-scrollbar {
    width: 1em;
  }

  #scrollspy-nested::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.3);
  }

  #scrollspy-nested::-webkit-scrollbar-thumb {
    background-color: white;
    outline: 1px solid slategrey;
  }
  .footer {
    position: relative;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
  
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    color: white;
    text-align: center;
  }
  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    color: white;
    background-color: transparent;
    font-weight: 800;
  }

  .flex-row {
    justify-content: center;
  }

  li > a {
    color: white;
    font-size: 24px;
    margin-right: 80px;
  }
  li > a:hover {
    color: #e5e7e8;
  }
  a {
    color: white;
  }

  #home {
    margin-top: 4%;
  }

  #meteo {
    margin-top: 13%;
    margin-bottom: -3rem;

  }

  #scrollspy-nested {
    margin-top: 2%;
  }
  .flex-row {
    position: relative;
    margin: auto;
    margin-top: -2%;
  }

  #b-drop {
    color: green;
    background-color: transparent;
    text-decoration: none;
  }

  h3 {
    margin: 40px 0 0;
  }
  
}
</style>
