<template>
  <div id="foot">
    <footer class="footer">
      <div id="escola">
        <p>Escola Superior de Media Artes e Design do Politécnico do Porto</p>
        <p>Aplicação meteorológica desenvolvida pelo grupo <b>EB2</b> </p>
        <p>Vila do Conde 2018/2019</p>
      </div>

      <div id="creditos">
        <p>
          <b>Venera Aitkul
            <br>João Silva
            <br>Ana Mafalda Santos
            <br>Alexandre Costa
            <br>Eduardo Silva
          </b>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@media screen and (min-width: 450px) {
  #escola {
    padding-top: 30px;
    font-size: 16px;
    line-height: 100%;
    text-align: left;
    float: left;
    margin-left: 10%;
  }
   #creditos{
    padding-top: 30px;
    font-size: 16px;
    text-align: right;
    float: right;
    margin-right: 10%;
  }
}

@media screen and (max-width: 450px) {

  #escola {
   padding-top: 15px;
    font-size: 10px;
    line-height: 30%;
  }
   #creditos{
    padding-top: 15px;
    font-size: 12px;
  }
}
</style>
