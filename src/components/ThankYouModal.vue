<template>
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
</template>

<script>
export default {
  name: 'ThankYouModal'
}
</script>

<style lang="scss" scoped>
.social-icons-row > * {
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
