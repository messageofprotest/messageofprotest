<template>
  <div id="app" variant="dark">
    <div class="header">
      <b-container class="header-text">
        <h1>Frustrated with the status quo on police brutality?</h1>
        <p
          class="subtitle"
        >Contact your representatives and demand evidence-based change for police reform*</p>

        <b-form class="form">
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
                  <b-button 
                    variant="light"
                    class="button-main"
                    size="lg"
                    @click="populateRepresentatives"
                  >Find Your Representatives</b-button>
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </b-container>
    </div>
    <b-container v-if="this.representatives && Object.keys(this.representatives).length > 0">
      <hr class="top-hr">
      <div
        v-for="rep in representatives"
        :key="rep.name"
      >
        <b-row class="rep-row">
          <b-col cols="7" class="rep-text">
            <h4>{{ rep.name }}</h4>
            <h5>{{ rep.officeName }}</h5>
          </b-col>
          <b-col cols="5" class="rep-contact">
            <b-button variant="light">
              Contact
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <b-container>
      <hr class="top-hr">
      <h1 class="section-header">Data & Attributions</h1>
      <h4>Data for this website comes from Campaign Zero.</h4>
      <b-button
        variant="light"
        class="button-main"
        size="lg"
      >Support Campaign Zero</b-button>
    </b-container>
    <b-container>
      <hr>
      <p class="footer">Black Lives Matter.</p>
      <p class="footer">Made in Washington, D.C. by @jayprat95, @slurpee123abc, and @smitto</p>
    </b-container>
  </div>
</template>

<script>
import { getRepresentatives } from "./endpoints";

export default {
  name: "App",
  methods: {
    populateRepresentatives: async function() {
      this.representatives = await getRepresentatives(this.zipcode);
    }
  },
  data: () => ({
    zipcode: "",
    representatives: {}
  })
};
</script>

<style lang="scss">
* {
  border-radius: 0 !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  background-color: #121212;
  color: white;
}

.button-main {
  margin: 20px 0px;
}

.footer {
  text-align: left !important;
  margin-bottom: 5px;
}

h1 {
  font-size: 3rem;
}

.header {
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: auto;
  background-image: url("../public/background.jpg");
  background-position: center -100px;
  background-size: 100% 
}

.header-text {
  margin: 100px auto 50px auto;
}

hr {
  height: 2px;
  background-color: white;
  margin-top: 20px;
  margin-left: -50vw;
  width: 150vw;
}

.rep-contact {
  text-align: left;
  display: flex;
  align-items: center;
}

.rep-row {
  margin: 25px auto;
}

.rep-text {
  text-align: right !important;
  padding-right: 20px;
}

.section-header {
  margin-top: 20px;
}

.subtitle {
  font-size: 23px;
  margin-top: 25px;
  color: #fdfdfd;
}

.top-hr {
  margin-top: 0px !important;
}

.zipcode-input,
.zipcode-input:focus {
  background-color: white;
  caret-color: #d0d0d0;
  color: black;
  height: 50px;
  font-size: 24px;
  margin-top: 20px;
  border: 0;
}

.zipcode-input::placeholder {
  color: #969696;
}
</style>
