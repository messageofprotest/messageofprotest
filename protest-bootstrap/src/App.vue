<template>
  <div id="app">
    <b-container variant="dark">
      <h1>Frustrated with the status quo on police brutality?</h1>
      <p
        class="subtitle"
      >Contact your representatives and demand evidence-based change for police reform*</p>

      <b-form class="form" @submit="onSubmit">
        <b-container>
          <b-row class="justify-content-center">
            <b-col cols="6">
              <b-form-group label-for="input-1">
                <b-form-input
                  id="input-1"
                  aria-describedby="Enter zipcode."
                  class="zipcode-input"
                  v-model="zipcode"
                  type="text"
                  required
                  placeholder="Enter zipcode"
                  variant="dark"
                ></b-form-input>
                <b-button variant="light">Get Representatives to Contact</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
    </b-container>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App"
  //   components: {
  //     HelloWorld
  //   }
};
</script>

<style lang="scss">
body {
  background-color: #121212;
  color: white;
}

h1 {
  font-size: 3rem;
}

.subtitle {
  font-size: 23px;
  margin-top: 25px;
  color: #fdfdfd;
}

.zipcode-input,
.zipcode-input:focus {
  background-color: transparent;
  caret-color: #d0d0d0;
  color: white;
  height: 50px;
  font-size: 24px;
  margin-top: 20px;
}

.zipcode-input::placeholder {
  color: #969696;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
