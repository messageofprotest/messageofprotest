<template>
  <div id="app" variant="dark">
    <div class="header">
      <b-container class="header-container">
        <!-- Headers -->
        <h1>Together we can end police violence in America</h1>
        <p
          class="subtitle"
        >Contact your representatives and demand evidence-based change for police reform</p>

        <!-- Input and Button -->
        <b-form class="form" @submit.prevent="handleFindRepresentatives">
          <b-container>
            <b-row class="justify-content-center">
              <b-col cols="12" sm="6">
                <b-form-group label-for="input-1">
                  <div class="zipcode-input-container">
                    <b-form-input
                      id="input-1"
                      ref="zipcode"
                      class="zipcode-input"
                      :class="{'zipcode-input-error': zipcodeHasError}"
                      v-model="zipcode"
                      type="number"
                      required
                      placeholder="Enter zipcode"
                      variant="dark"
                      autocomplete="postal-code"
                    ></b-form-input>
                    <b-spinner class="zipcode-spinner" v-if="loading" label="Loading..."></b-spinner>
                  </div>

                  <div
                    class="zipcode-error"
                    v-if="zipcodeHasError"
                  >This zipcode does not exist. Try reentering your zipcode.</div>

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
    <b-container class="section rep-section" v-if="!_.isEmpty(this.representatives)">
      <h2 class="section-header" id="reps-header">Representatives</h2>
      <div v-for="rep in representatives" :key="rep.name">
        <b-row align-h="center">
          <b-col cols="12" sm="10" md="8" lg="6" class="rep-container">
            <b-row align-v="center">
              <b-col cols="12" sm="6">
                <h4 class="rep-name">{{ rep.name }}</h4>
                <h5>{{ rep.officeName }}</h5>
                <h6>{{ rep.emails ? rep.emails[0] : null }}</h6>
              </b-col>
              <b-col cols="0" sm="1"></b-col>
              <b-col cols="12" sm="5">
                <b-button
                  class="contact-button"
                  v-b-modal.contact-modal
                  variant="light"
                  @click="clickedContact(rep)"
                >Contact</b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </b-container>

    <!-- Footer -->
    <div v-bind:class="{ 'top-border': !_.isEmpty(this.representatives) }" class="section">
      <h2 class="section-header" id="attributions-header">Data & Attributions</h2>
      <h5>
        Representative contact information sourced from the
        <a href="https://developers.google.com/civic-information">Google Civic Information API.</a>
        <br />Header image sourced from
        <a href="https://unsplash.com/@koshuuu">Koshu Kunii via Unsplash.</a>
        <br />Email details sourced from
        <a href="https://www.joincampaignzero.org">Campaign Zero.</a>
      </h5>
      <b-button
        href="https://www.joincampaignzero.org/"
        variant="light"
        class="button-main"
        size="lg"
      >Support Campaign Zero</b-button>
    </div>
    <div class="top-border section">
      <p class="footer-text">Black Lives Matter.</p>
      <p class="footer-text">Made in Washington, D.C. by <a href="https://jprathipati.com">Jayanth Prathipati</a>, <a href="https://www.dominic-napoleon.com">Dominic Napoleon</a>, and Nathan Smith</p>
    </div>

    <!-- Contact Modal -->
    <b-modal id="contact-modal" v-bind:title="'Contact ' + selectedRepresentative.name" hide-footer>
      <div id="email-body">
        To whom it may concern, <br> <br>
        I am a concerned representative in your district writing today to voice my support and encouragement for the continued improvement of policing in our jurisdiction. Over 1000 people are killed by police violence each year in America and we can effectively reduce this violence by implementing research-based policy solutions. 
        <br> <br> 
        These policies include: <br> 
        - Increasing the use of Body Worn Cameras (BWCs) <br>
        - Increasing (or introducing) de-escalation training for police officers <br>
        - Ending broken windows & for profit policing <br>
        - Limiting the use of force used by police officers <br> <br> 
        Campaign Zero maintains an agenda of recommended policy based on research found here: (<a href="https://tinyurl.com/C0-Agenda">https://tinyurl.com/C0-Agenda</a>) <br> <br> 
        As a taxpayer, I whole-heartedly support strengthening or introducing these policies in our jurisdiction. It’s clear that in the near future these sorts of training, as well as the use of BWCs will be the standard for all jurisdictions in our country. I hope our jurisdiction can lead out in determining best practices and policies for the safety of all in our community. 
        <br> <br> 
        Thank you in advance for your time and have a good day!


      </div>
      <div class="m-footer">
        <b-button
          v-bind:href="'mailto:' + selectedRepresentative.emails[0] + '?subject=' + emailSubject + '&body=' + emailBody"
          v-if="selectedRepresentative.emails"
          type="submit"
          @click="fireEmailGAEvent"
          class="modal-button"
        >
          <b-icon icon="envelope"></b-icon> Email
        </b-button>
        <b-button
          v-bind:href="'tel:+' + selectedRepresentative.phones"
          v-if="selectedRepresentative.phones"
          @click="firePhoneGAEvent"
          class="modal-button"
        >
          <b-icon icon="phone"></b-icon>
          {{ selectedRepresentative.phones[0] }}
        </b-button>
        <b-button class="modal-button" @click="copyToClipboard">
          <b-icon icon="paperclip"></b-icon>
        </b-button>
      </div>
    </b-modal>

    <!-- Thank You Modal -->
    <b-modal id="thank-you-modal" content-class="modal-content" size="lg" hide-footer>
      <template v-slot:modal-header="{ }">
        <div>Thank you for joining this movement.</div>
        <close-icon></close-icon>
      </template>

      <div id="thank-you-body">
        <p>Together, with sustained pressure, we can make real change in policing.</p>
        <p>Please spread the word using the buttons below.  It will maximize the impact of this messaging campaign.</p>
        <b-row class="social-icons-row" align-h="center">
          <v-icon name="brands/facebook-square" scale="2.5" style="color: rgb(43, 43, 43)"/>
          <v-icon name="brands/twitter" scale="2.5" style="color: rgb(43, 43, 43)"/>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>


<script>
import { getRepresentatives } from "./endpoints";
import emailTemplate from "./assets/email_template.json";
import VueScrollTo from "vue-scrollto";

export default {
  name: "App",
  mounted() {
    // focus input on page load, helpful for usability and screenreaders
    this.$refs.zipcode.$el.focus();
  },
  methods: {
    handleFindRepresentatives: async function() {
      // unfocus zipcode input after submission.  This will cause the software keyboard
      // on mobile devices to collapse after clicking "Go".
      this.$refs.zipcode.$el.blur();
      this.$ga.event("contact", "click", "clicked find representatives");

      try {
        this.loading = true;
        this.representatives = await getRepresentatives(this.zipcode);
        this.zipcodeHasError = false;
        // once reps render (on next DOM cycle) scroll user to them
        this.$nextTick(function() {
          VueScrollTo.scrollTo("#reps-header");
        });
      } catch {
        this.representatives = {};
        this.zipcodeHasError = true;
      }
      this.loading = false;
    },
    clickedContact: function(rep) {
      this.selectedRepresentative = rep;
    },
    copyToClipboard: function() {
      this.$ga.event("copy", "click", "user copied message text");
      var range = document.createRange();
      range.selectNode(document.getElementById("email-body"));
      window.getSelection().removeAllRanges(); // clear current selection
      window.getSelection().addRange(range); // to select text
      document.execCommand("copy");
      window.getSelection().removeAllRanges(); // to deselect
    },
    fireEmailGAEvent: function() {
      this.$ga.event("email", "click", "user emailed representative");
    }, 
    firePhoneGAEvent: function() {
      this.$ga.event("phone", "click", "user phoned representative");
    }

  },
  data: () => ({
    zipcode: "",
    zipcodeHasError: false,
    representatives: {},
    selectedRepresentative: { name: "Placeholder", emails: [], phones: [] },
    emailSubject: emailTemplate.subject,
    emailBody: emailTemplate.content,
    copyBody: decodeURIComponent(emailTemplate.content),
    loading: false
  })
};
</script>


<style lang="scss">
@import "bootstrap";
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Source+Sans+Pro:wght@300&display=swap");

* {
  font-family: "Source Sans Pro", sans-serif;
}

button,
div,
a {
  border-radius: 0 !important;
}

a {
  text-decoration: underline;
  color: inherit;
  transition-duration: 0.4s;
}

a:hover { 
  color: #fce21b; 
}


.btn {
  text-decoration: none;
  transition-duration: 0.4s;
}

.btn:hover {
  background-color: #fce21b;
  border-color: #fce21b;
  
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

.footer-text {
  text-align: left !important;
  margin-bottom: 5px;
}

h1 {
  font-size: 3rem;
  font-family: "Montserrat", sans-serif;
}

h2 {
  font-size: 2.5rem;
  font-family: "Montserrat", sans-serif;
}

@include media-breakpoint-down(xs) {
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
  }
}

.header {
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: auto;
  font-family: "Montserrat", sans-serif;
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
  opacity: 0.2;
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

// make header spacing smaller on mobile
@include media-breakpoint-down(sm) {
  .header-container {
    margin-top: 30px;
    margin-bottom: 15px;
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

// make buttons smaller on mobile to fit on one line
@include media-breakpoint-down(xs) {
  .modal-button {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
  }
}

.modal-content {
  color: black;

  .modal-body {
    font-size: 20px;
  }

  .modal-header {
    justify-content: center;
    font-size: 24px;
    margin-right: 20px;
    text-align: center;

    div {
      font-family: "Montserrat", sans-serif;
    }

    .close-icon {
      position: absolute;
      right: 20px;
    }
  }
}

.social-icons-row > * {
  margin-left: 1rem;
  margin-right: 1rem;
}

.rep-container {
  padding-bottom: 20px;
  padding-top: 25px;
  border-bottom: 1px solid #ffffff94;
}

.rep-section div:last-child > div.row > div.rep-container {
  border-bottom: none;
}

.section {
  padding: 15px 15px;
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
  caret-color: #d0d0d0;
  height: 50px;
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;
  border: 0;
  color: white;
  background-color: #00000030 !important;
  outline: 2px solid white;

  padding-right: 60px !important;
}

.zipcode-input::placeholder {
  color: #d2d2d2;
}

.zipcode-input-error {
  outline: 2px solid #ffbebe;
}

.zipcode-input-container {
  position: relative;
}

.zipcode-error {
  margin-top: 10px;
  color: #ffbebe;
}

.zipcode-spinner {
  top: 9px;
  right: 15px;
  position: absolute;
  border-width: 0.2rem;
}

// hide up/down arrows on numbered inputs
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Change Autocomplete styles in Chrome*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: white;
  -webkit-box-shadow: 0 0 0px 1000px #000 inset;
}
</style>
