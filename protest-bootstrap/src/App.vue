<template>
  <div id="app" variant="dark">
    <div class="header">
      <b-container class="header-container" >
        <h1>Frustrated with the status quo on police brutality?</h1>
        <p
          class="subtitle"
        >Contact your representatives and demand evidence-based change for police reform*</p>

        <!-- Input and Button -->
        <b-form class="form" @submit.prevent="populateRepresentatives">
          <b-container>
            <b-row class="justify-content-center">
              <b-col cols="12" sm="6">
                <b-form-group label-for="input-1">
                  <b-form-input
                    id="input-1"
                    ref="zipcode"
                    aria-describedby="Enter zipcode."
                    class="zipcode-input"
                    v-model="zipcode"
                    type="text"
                    required
                    placeholder="Enter zipcode"
                    variant="dark"
                    autocomplete="postal-code"
                  ></b-form-input>
                  <b-button 
                    variant="light"
                    class="button-main"
                    size="lg"
                    type="submit"
                  >Find Your Representatives</b-button>
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </b-container>
    </div>

    <!-- Where reps pulled from google civics api will show -->
    <b-container v-if="!_.isEmpty(this.representatives)">
      <div
        v-for="rep in representatives"
        :key="rep.name"
      >
        <b-row align-h="center">
          <b-col cols="12" sm="10" md="8" lg="6" class="rep-container">
              <b-row align-v="center">
                <b-col cols="12" sm="6" class="rep-text">
                    <h4 class="rep-name">{{ rep.name }}</h4>
                    <h5>{{ rep.officeName }}</h5>
                    <h6>{{ rep.emails ? rep.emails[0] : null }}</h6>
                </b-col>
                <b-col cols="0" sm="1"></b-col>
                <b-col cols="12" sm="5" class="rep-contact">
                    <b-button class="contact-button" v-b-modal.contact-modal variant="light" @click="clickedContact(rep)">
                    Contact
                    </b-button>
                </b-col>
              </b-row>
          </b-col>
        </b-row>
      </div>
    </b-container>

    <!-- Footer -->
    <b-container class="section">
      <h1 class="section-header">Data & Attributions</h1>
      <h4>Representative contact information comes from the <a href="https://developers.google.com/civic-information">Google Civic Information API. </a> Sources 
      for the data in the email come from <a href="https://www.joincampaignzero.org"> Campaign Zero.</a> </h4>
      <b-button
        href="https://www.joincampaignzero.org/"
        variant="light"
        class="button-main"
        size="lg"
      >Support Campaign Zero</b-button>
    </b-container>
    <div class="top-border section footer-section">
      <p class="footer-text">Black Lives Matter.</p>
      <p class="footer-text">Made in Washington, D.C. by @jayprat95, @slurpee123abc, and @smitto</p>
    </div>

    <!-- Contact Modal -->
    <b-modal id="contact-modal" v-bind:title="'Contact ' + selectedRepresentative.name" hide-footer>
      <div id="email-body">{{ emailBody }}</div>
      <div class="m-footer">
        <b-button v-bind:href="'mailto:' + selectedRepresentative.emails[0] + '?subject=' + emailSubject + '&body=' + emailBody" v-if="selectedRepresentative.emails" type="submit" class="modal-button"><b-icon icon="envelope"></b-icon></b-button>
        <b-button class="modal-button" @click="copyToClipboard"><b-icon icon="paperclip"></b-icon></b-button>
        <b-button v-if="selectedRepresentative.phones" class="modal-button"><b-icon icon="phone"></b-icon> {{ selectedRepresentative.phones[0] }}</b-button>
      </div>
    </b-modal>
  </div>
</template>


<script>
import { getRepresentatives } from "./endpoints";

export default {
  name: "App",
  mounted() {
    // focus input on page load, helpful for usability and screenreaders
    this.$refs.zipcode.$el.focus();
  },
  methods: {
    populateRepresentatives: async function() {
      this.representatives = await getRepresentatives(this.zipcode);
    },
    clickedContact: function(rep) {
      this.selectedRepresentative = rep;
    },
    copyToClipboard: function() {
      var range = document.createRange();
      range.selectNode(document.getElementById("email-body"));
      window.getSelection().removeAllRanges(); // clear current selection
      window.getSelection().addRange(range); // to select text
      document.execCommand("copy");
      window.getSelection().removeAllRanges(); // to deselect
    }
  },
  data: () => ({
    zipcode: "",
    representatives: {},
    selectedRepresentative: { name: 'Placeholder', emails: [], phones: [] },
    emailSubject: "Hey what's up",
    emailBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac orci phasellus egestas tellus. Commodo odio aenean sed adipiscing diam donec adipiscing. Egestas maecenas pharetra convallis posuere morbi leo urna molestie. Turpis nunc eget lorem dolor. Massa tincidunt nunc pulvinar sapien et. Massa enim nec dui nunc. Turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet. Scelerisque eu ultrices vitae auctor eu augue ut. Duis convallis convallis tellus id interdum velit. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Posuere ac ut consequat semper viverra nam. Eget est lorem ipsum dolor sit amet consectetur adipiscing elit. Sed euismod nisi porta lorem mollis aliquam ut. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Tellus rutrum tellus pellentesque eu tincidunt. Mollis nunc sed id semper risus in. Consequat id porta nibh venenatis cras sed felis eget velit."
  })
};
</script>


<style lang="scss">
@import 'bootstrap';
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Source+Sans+Pro:wght@300&display=swap');

* {
  font-family: 'Source Sans Pro', sans-serif;
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
  margin: 30px 0px;
  font-weight: 600;
}

.contact-button {
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: 600;
}

#contact-modal {
  color: black;
}

// alternate .button-main styling
// .button-main {
//     outline: 2px solid white;
//     background-color: black;
//     color: WHITE;
//     margin-top: 35px;
// }

.footer-section {
  padding: 0 20px;
}

.footer-text {
  text-align: left !important;
  margin-bottom: 5px;
}

h1 {
  font-size: 3rem;
  font-family: 'Montserrat', sans-serif;
}

.header {
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: auto;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  border-bottom: 2px solid white;
}

// insert the background image as a pseudoelement, we can
// no control its opacity separately from the other contect
// inside the .header div
.header::after {
  content: "";
  background-image: url("../public/background.jpg");
  background-position: center center;
  background-size: cover;
  opacity: 0.20;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;   
}

.header-container {
  margin: 100px auto 50px auto;
}

// make spacing at top of page smaller on mobile
@include media-breakpoint-down(sm) {
    .header-container {
        margin-top: 30px;
    }
}

.rep-name {
    font-weight: 600;
}

hr {
  height: 2px;
  background-color: white;
  margin-top: 20px;
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
  top: 25
}


// .rep-contact {
//   text-align: left;
//   display: flex;
//   align-items: center;
// }

.rep-container {
    padding-bottom: 20px;
    padding-top: 25px;
    border-bottom: 1px solid #ffffff94
}

// .rep-text {
//   text-align: right !important;
//   padding-right: 20px;
// }

.section {
  margin-bottom: 15px;
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

// old input style
// .zipcode-input,
// .zipcode-input:focus {
//   background-color: white;
//   caret-color: #d0d0d0;
//   color: black;
//   height: 50px;
//   font-size: 24px;
//   margin-top: 20px;
//   border: 0;
// }

.zipcode-input,
.zipcode-input:focus {
    caret-color: #d0d0d0;
    height: 50px;
    font-size: 24px;
    font-weight: 600;
    margin-top: 20px;
    border: 0;
    color: white;
    background-color: #00000030;
    outline: 2px solid white;
}

.zipcode-input::placeholder {
  color: #d2d2d2;
}

// old input placeholder color
// .zipcode-input::placeholder {
//   color: #969696;
// }

</style>
