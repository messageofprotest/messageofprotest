<template>
  <div id="app" variant="dark">
    <div class="header">
      <b-container class="header-container">
        <!-- Headers -->
        <h1>Every voice can help oppose police violence in America</h1>
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
      <div v-for="officeLevel in Object.keys(representatives)" :key="officeLevel">
        <div v-if="!_.isEmpty(representatives[officeLevel])">
          <h2 class="rep-header">{{ officeLevel }} Representatives</h2>
          <div v-for="rep of representatives[officeLevel]" :key="rep.name">
            <b-row align-h="center">
              <b-col cols="12" sm="10" md="8" lg="6" class="rep-container" v-b-modal.contact-modal
                    @click="clickedContact(rep)" tabindex="false">
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
        </div>
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
        <a href="https://www.joincampaignzero.org" target="_blank">Campaign Zero.</a> <br> 
        For feedback or questions, contact <a href="mailto:messageofprotest@gmail.com?subject=feedback">this email. </a>
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
    <contact-modal :selectedRepresentative="selectedRepresentative"></contact-modal>

    <!-- Thank You Modal -->
    <thank-you-modal></thank-you-modal>

  </div>
</template>


<script>
import { getRepresentatives } from "./endpoints";
import { emailSubject, emailBody } from './assets/email_template';
import VueScrollTo from "vue-scrollto";
import ContactModal from './components/ContactModal.vue';
import ThankYouModal from './components/ThankYouModal.vue';

export default {
  name: "App",
  components: {
    'contact-modal': ContactModal ,
    'thank-you-modal': ThankYouModal
  },
  created() {
    this.handleGoogleAnalyticsStartup();
    if(window.location.pathname === '/staging/') {
      this.$bvToast.toast(`Google Analytics is disabled on staging.`, { title: `On STAGING Site` });
    }
  },
  mounted() {
    // focus input on page load, helpful for usability and screenreaders
    this.$refs.zipcode.$el.focus();
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
          VueScrollTo.scrollTo(".rep-header");
        });
      } catch {
        this.representatives = {};
        this.zipcodeHasError = true;
      }
      this.loading = false;
    },
    clickedContact: function(rep) {
      this.$ga.event("select", "click", "selected a representative from the list");
      this.selectedRepresentative = rep;
    },
    /// TODO: most of this logic should be moved into the utils.js
    handleGoogleAnalyticsStartup: function() {
      const enable = this.$route.query.enable_google_analytics;
      const basePath = `${window.location.origin}/#/?enable_google_analytics`;
      if(enable === 'true') {
        this.$bvToast.toast(`To disable, go to ${basePath}=false`, { title: `Google Analytics Enabled` });
        // add 1 second delay, weird bugs, enabling gets overrided by vue-analytics instantiation
        setTimeout(() => this.$ga.enable(), 1000);
        console.log("set the disabler to false");
        this.$cookies.set('enable_google_analytics', 'true', Infinity);
      }
      else if(enable === 'false') {
        // add 1 second delay, weird bugs, enabling gets overrided by vue-analytics instantiation
        setTimeout(() => this.$ga.disable(), 1000);
        console.log("set the disabler to true");
        this.$cookies.set('enable_google_analytics', 'false', Infinity);
      }
      if(this.$cookies.get('enable_google_analytics') == 'false') {
        this.$bvToast.toast(`To re-enable, go to ${basePath}=true`, { title: `Google Analytics Disabled` });
      }
    },
    C0ButtonClicked: function() {
      this.$ga.event("C0", "click", "user clicked Campaign Zero link");
    },
  },
  data: () => ({
    zipcode: "",
    zipcodeHasError: false,
    representatives: {},
    selectedRepresentative: { name: "Placeholder", emails: [], phones: [] },
    loading: false
  })
};
</script>


<style lang="scss">
@import 'styles.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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

.footer-text {
  text-align: left !important;
  margin-bottom: 5px;
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

@include media-breakpoint-down(xs) {
  .modal-dialog,
  .modal-content {
    /* 85% of window height */
    height: 100%;
  }

  .modal-body {
    /* 100% = dialog height, 120px = header + footer */
    max-height: calc(100% - 120px);
    overflow-y: scroll;
  }
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

.rep-header {
  margin: 20px 0px;
}

.rep-name {
  font-weight: 600;
}

.rep-section div:last-child > div.row > div.rep-container {
  border-bottom: none;
}

.section {
  padding: 15px 15px;
}

.section-header {
  margin-top: 20px;
  margin-bottom: 10px;
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
</style>
