<template>
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
        Thank you for your time and consideration. <br> <br> <br> 
        Sources: <br>
        - <a href="http://fivethirtyeight.com/features/a-chicago-cop-is-the-latest-to-be-charged-using-video-evidence/">http://fivethirtyeight.com/features/a-chicago-cop-is-the-latest-to-be-charged-using-video-evidence/</a> <br>
        - <a href="https://www.joincampaignzero.org ">Campaign Zero </a> <br>
        - <a href="http://govred.com/blog/deescalation-training-state-requirements/">http://govred.com/blog/deescalation-training-state-requirements/</a>
      </div>
    </template>
    <template v-slot:modal-footer>
      <div class="button-list">
        <b-button
          v-bind:href="'mailto:' + selectedRepresentative.emails[0] + '?subject=' + emailSubject + '&body=' + processedEmailBody"
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
</template>

<script>
import { emailSubject, emailBody } from '../assets/email_template';
import { extractSocialIdFromRep, makeTwitterLink, isAndroid, isSamsung } from '../utils';

export default {
  name: 'ContactModal',
  props: {
    selectedRepresentative: Object
  },
  data: () => ({
    emailSubject: encodeURIComponent(emailSubject),
    copyBody: emailSubject,
  }),
  computed: {
    repTweetURL: function() {
      const id = extractSocialIdFromRep(this.selectedRepresentative, 'twitter');
      if(!id) return null;
      const text = `@${id} Please consider implementing policies outlined by: joincampaignzero.org (via: messageofprotest.com)`;
      return makeTwitterLink(text, 'BlackLivesMatter');
    },
    processedEmailBody: function() {
      let encoded = encodeURIComponent(emailBody);
      // on all android devices except Samsung, default email client is Gmail, which uses '<br>' in
      // mailto links for newlines instead of the standard '%0A'.  
      if(isAndroid && !isSamsung) return encoded.replace(/%0A/g, '<br>');
      return encoded;
    },
  },
  methods: {
    fireEmailGAEvent: function() {
      this.$ga.event("email", "click", "user emailed representative");
    },
    firePhoneGAEvent: function() {
      this.$ga.event("phone", "click", "user phoned representative");
    },
    tweetClicked: function() {
      this.$ga.event("tweet", "click", "user tweeted representative");
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
  }
}
</script>

<style lang="scss" scoped>
#contact-modal {
  color: black;
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

  .button-list {
    display: flex;
  }
}
</style>
