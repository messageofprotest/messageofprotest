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
    <b-container class="top-border" v-if="this.representatives && Object.keys(this.representatives).length > 0">
      <div
        v-for="rep in representatives"
        :key="rep.name"
      >
        <b-row class="rep-row">
          <b-col cols="7" class="rep-text">
            <h4>{{ rep.name }}</h4>
            <h5>{{ rep.officeName }}</h5>
            <h6>{{ rep.emails ? rep.emails[0] : null }}</h6>
          </b-col>
          <b-col cols="5" class="rep-contact">
            <b-button v-b-modal.contact-modal variant="light" @click="clickedContact(rep)">
              Contact
            </b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <b-container class="top-border footer-section">
      <h1 class="section-header">Data & Attributions</h1>
      <h4>Data for this website comes from Campaign Zero.</h4>
      <b-button
        variant="light"
        class="button-main"
        size="lg"
      >Support Campaign Zero</b-button>
    </b-container>
    <b-container class="top-border footer-section">
      <p class="footer-text">Black Lives Matter.</p>
      <p class="footer-text">Made in Washington, D.C. by @jayprat95, @slurpee123abc, and @smitto</p>
    </b-container>

    <b-modal id="contact-modal" v-bind:title="'Contact ' + selectedRepresentative.name" hide-footer>
      <form v-if="selectedRepresentative.emails" v-bind:action="'mailto:' + selectedRepresentative.emails ? selectedRepresentative.emails[0] : null" method="GET">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac orci phasellus egestas tellus. Commodo odio aenean sed adipiscing diam donec adipiscing. Egestas maecenas pharetra convallis posuere morbi leo urna molestie. Turpis nunc eget lorem dolor. Massa tincidunt nunc pulvinar sapien et. Massa enim nec dui nunc. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Scelerisque eu ultrices vitae auctor eu augue ut. Duis convallis convallis tellus id interdum velit. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Posuere ac ut consequat semper viverra nam. Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. Sed euismod nisi porta lorem mollis aliquam ut. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Tellus rutrum tellus pellentesque eu tincidunt. Mollis nunc sed id semper risus in. Consequat id porta nibh venenatis cras sed felis eget velit.
        <div class="m-footer">
          <b-button type="submit" class="modal-button"><b-icon icon="envelope"></b-icon></b-button>
          <b-button v-if="selectedRepresentative.phones" class="modal-button"><b-icon icon="phone"></b-icon> {{ selectedRepresentative.phones ? selectedRepresentative.phones[0] : "" }}</b-button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { getRepresentatives } from "./endpoints";

export default {
  name: "App",
  methods: {
    populateRepresentatives: async function() {
      this.representatives = await getRepresentatives(this.zipcode);
    },
    clickedContact: function(rep) {
      this.selectedRepresentative = rep;
    }
  },
  data: () => ({
    zipcode: "",
    representatives: {},
    selectedRepresentative: { name: 'Placeholder', emails: [], phones: [] }
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

.footer-section {
  margin-bottom: 15px;
}

.footer-text {
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
  background-position: center center;
  background-size: cover;
}

.header-text {
  margin: 100px auto 50px auto;
}

hr {
  height: 2px;
  background-color: white;
  margin-top: 20px;
}

#contact-modal {
  color: black;
}

.m-footer {
  text-align: left;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
}

.modal-button {
  float: left;
  margin-right: 10px;
}

.modal-dialog {
  position: relative;
  top: 25%;
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

.top-border {
  border-top: 2px solid white;
  padding-top: 15px;
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
