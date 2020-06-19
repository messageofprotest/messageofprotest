<template>
  <div id="app" variant="dark">
    <div class="header">
      <b-container class="header-container">
        <!-- Headers -->
        <h1>Every voice can help prevent police violence in America</h1>
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
          <b-col cols="12" sm="10" md="8" lg="6" class="rep-container" v-b-modal.contact-modal @click="clickedContact(rep)" tabindex="false">
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
        <a href="https://developers.google.com/civic-information" target="_blank">Google Civic Information API.</a>
        <br />Header image sourced from
        <a href="https://unsplash.com/@koshuuu" target="_blank">Koshu Kunii via Unsplash.</a>
        <br />Email details sourced from
        <a href="https://www.joincampaignzero.org" target="_blank">Campaign Zero.</a>
      </h5>
      <b-button
        href="https://www.joincampaignzero.org/"
        target="_blank"
        variant="light"
        class="button-main"
        @click="C0ButtonClicked"
        size="lg"
      >Support Campaign Zero</b-button>
    </div>
    <div class="top-border section">
      <p class="footer-text">Black Lives Matter.</p>
      <p class="footer-text">Made in Washington, D.C. by
        <a href="https://jprathipati.com" target="_blank">Jayanth Prathipati</a>,
        <a href="https://www.dominic-napoleon.com" target="_blank">Dominic Napoleon</a>, and
        <a href="https://github.com/smitto" target="_blank">Nathan Smith</a>
      </p>
      <p class="footer-text">
        <a href="https://github.com/messageofprotest/messageofprotest" target="_blank"><v-icon name="brands/github" scale="1.5"/></a>
      </p>
    </div>

    <!-- Contact Modal -->
    <b-modal id="contact-modal" scrollable size="lg" centered>
      <template v-slot:modal-title>
        Contact {{ selectedRepresentative.name }}
      </template>
      <template v-slot:default>
        <div id="email-tip">
          <span class="icon"><v-icon name="regular/lightbulb" scale="1.2"/></span> Tip: Customize this template email to increase visibility from your representative
        </div>
        <div id="email-body">
          To whom it may concern, <br> <br>
          I am a concerned representative in your district writing today to voice my support and encouragement for the continued improvement of policing in our jurisdiction. I was shocked to see the brutal murder of George Floyd, and want to prevent such tragedies from occurring in the future. Over 1000 people are killed by police violence each year in America, and we can effectively reduce this violence by implementing research-based policy solutions.
          <br> <br> 
          These policies include: <br> 
          - Increasing (or introducing) de-escalation training for police officers <br>
          Currently, police officers only spend 8 hours on conflict de-escalation training, and this has been shown to reduce use of force. After introducing de-escalation training, the Dallas Police Department saw an 18% drop in use of force. <br> <br> 
          - Increasing the use of Body Worn Cameras (BWCs) <br>
          Introducing BWC’s also helps reduce force and helps increase accountability. Nearly every case where a police officer was charged with a crime for killing a civilian in 2015 relied on video evidence showing the officer's actions. <br> <br> 
          - Reduce the size of the police force  <br>
          Reducing the size of the police department and reinvesting that budget can help increase budgets for additional support systems for communities such as social workers, emergency medical technicians, conflict resolution specialists, restorative justice teams, and other community-based professionals. <br> <br> 
          - Limiting the use of force used by police officers <br> 
          Adding policies around the restricting the use of force by police officers has been shown to significantly reduce killings in those departments. Introducing these policies has been shown to reduce killings by up to 72%. <br> <br> 
          As a taxpayer, I whole-heartedly support strengthening or introducing these policies in our jurisdiction. It’s clear that in the near future these sorts of training, as well as the use of BWCs, will be the standard for all jurisdictions in our country. I hope our jurisdiction can lead in determining best practices and policies for the safety of all in our community.
          <br> <br> 
          Thank you for your time and consideration! <br> <br> <br> 
          Sources: <br>
          - <a href="http://fivethirtyeight.com/features/a-chicago-cop-is-the-latest-to-be-charged-using-video-evidence/">http://fivethirtyeight.com/features/a-chicago-cop-is-the-latest-to-be-charged-using-video-evidence/</a> <br>
          - <a href="https://www.joincampaignzero.org ">Campaign Zero </a> <br>
          - <a href="http://govred.com/blog/deescalation-training-state-requirements/">http://govred.com/blog/deescalation-training-state-requirements/</a>
        </div>
      </template>
      <template v-slot:modal-footer>
        <div class="button-list">
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
            v-bind:href="'tel:+1' + selectedRepresentative.phones"
            v-if="selectedRepresentative.phones"
            @click="firePhoneGAEvent"
            class="modal-button"
          >
          <b-icon icon="phone"></b-icon>
            Call
          </b-button>

          <b-popover ref="copy-paste-popover" target="copy-email-text-button" triggers="click blur" placement="top">
            Email content copied!
          </b-popover>

          <b-button id="copy-email-text-button" class="modal-button" @click="copyToClipboard">
            <content-copy-icon></content-copy-icon>
          </b-button>

          <b-button class="modal-button" :href="repTweetURL" v-if="repTweetURL" @click="tweetClicked" target="_blank">
            <v-icon name="brands/twitter" scale="1.2"/>
          </b-button>
        </div>
      </template>
    </b-modal>

    <!-- Thank You Modal -->
    <b-modal id="thank-you-modal" content-class="modal-content" size="lg" hide-footer>
      <template v-slot:modal-header="{ }">
        <div>Thank you for joining this movement.</div>
        <close-icon></close-icon>
      </template>

      <div id="thank-you-body">
        <p>Together, with sustained pressure, we can make real change in policing.</p>
        <p>Please spread the word using the links below. It will maximize the impact of this messaging campaign.</p>
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
import { extractSocialIdFromRep, makeTwitterLink } from './utils';

export default {
  name: "App",
  mounted() {
    // focus input on page load, helpful for usability and screenreaders
    this.$refs.zipcode.$el.focus();
  },
  computed: {
    repTweetURL: function() {
      const id = extractSocialIdFromRep(this.selectedRepresentative, 'twitter');
      if(!id) return null;
      const text = `@${id} Please consider implementing policies outlined by: joincampaignzero.org (via: messageofprotest.com)`;
      return makeTwitterLink(text, 'BlackLivesMatter');
    },
  },
  methods: {
    autosubmitZip: async function() {
      if(String(this.zipcode).length == 5) {
        this.handleFindRepresentatives();
      }
    },
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

      // once the "text has been copied" notification is shown, hide it after a few seconds
      setTimeout(() => this.$refs['copy-paste-popover'].$emit('close'), 5000);

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
    },
    C0ButtonClicked: function() {
      this.$ga.event("C0", "click", "user clicked Campaign Zero link");
    },
    tweetClicked: function() {
      this.$ga.event("tweet", "click", "user tweeted representative");
    },
    makeToast: function() {
      this.$bvToast.toast('Email text copied to clipboard.', {
        variant: 'success',
        'no-close-button': true,
        solid: true,
      })
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
@include media-breakpoint-down(xs) {
  .header-container {
    margin-top: 30px;
    margin-bottom: 15px;
  }
}

.icon {
  position: relative;
  bottom: 2px;
  padding-right: 4px;
}

@include media-breakpoint-down(xs) {
  .modal-dialog,
  .modal-content {
    /* 85% of window height */
    height: 85%;
  }

  .modal-body {
    /* 100% = dialog height, 120px = header + footer */
    max-height: calc(100% - 120px);
    overflow-y: scroll;
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

.modal-button {
  float: left;
  margin-right: 10px;

  &:hover {
    color: black;
  }
}

// make buttons smaller on mobile to fit on one line
@media (max-width: 350px) {
  .modal-button {
    padding: 0.25rem 0.5rem;
    font-size: 0.9rem;
  }
}

.modal-content {
  color: black;
  border: none;

  .modal-body {
    font-size: 20px;
    margin: 0;
    padding: 0;
  }

  #email-tip {
    font-size: 16px !important;
    background-color: #6c757d;
    color: white;
    padding: 10px 16px;
  }

  #email-body {
    font-size: 20px;
    padding: 16px;
  }

  .modal-header {
    justify-content: center;
    font-size: 24px;
    padding-right: 20px;
    text-align: center;

    div {
      font-family: "Montserrat", sans-serif;
    }

    .close-icon {
      position: absolute;
      right: 20px;
    }
  }

  .modal-title {
    font-family: "Montserrat", sans-serif;
  }

  .modal-footer {
    justify-content: left;
  }

  .button-list {
    display: flex;
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

  &:hover {
    cursor: pointer;
    border-radius: 3px !important;
    box-shadow: 0px 0px 0px 1px #ffffff;
  }
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

.toast-header {
  display: none;
}

.toast-body, .popover-body {
  color: white !important;
  background-color: #6c757d;
  font-size: 20px;
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
