<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1
          class="display-2 font-weight-bold mb-3"
        >Frustrated with the status quo on police brutality?</h1>

        <p
          class="subheading font-weight-regular"
        >Contact your representatives and demand evidence-based change for police reform*</p>

        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="location"
            label="Zipcode"
            autocomplete="postal-code"
            single-line
            outlined
            required
          ></v-text-field>
          <v-btn
            class="mr-4 submit-button black--text"
            large
            color="white"
            @click="getRepresentatives"
          >Find Your Representatives</v-btn>
        </v-form>

        <v-card
          class="mx-auto rep-card"
          max-width="344"
          v-for="rep in representatives"
          :key="rep.name"
          outlined
        >
          <v-card-text>
            <p>{{ rep.name }}</p>

            <p>{{ rep.officeName }}</p>

            <p>{{ rep.emails ? rep.emails[0] : '' }}</p>

            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  outlined 
                  color="#ffffffc8"
                  dark
                  v-on="on"
                >
                  Contact
                </v-btn>
              </template>

              <v-card>
                <v-card-title
                  class="headline"
                  primary-title
                >
                  Privacy Policy
                </v-card-title>

                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                  >
                    I accept
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>           
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const axios = require("axios");

export default {
  name: "HelloWorld",
  methods: {
    getRepresentatives: async function() {
      if(this.location == "") {
        return; 
      }

      let apiUrl =
        "https://www.googleapis.com/civicinfo/v2/" +
        "representatives" +
        "?key=" +
        this.apiKey +
        "&address=" +
        this.location;

      let res = await axios.get(apiUrl);

      let officials = res.data.officials;
      let offices = res.data.offices;

      for (const office of offices) {
        for (const index of office.officialIndices) {
          officials[index].officeName = office.name;
        }
      }

      let withEmail = officials.filter(e => e.emails);
      let withoutEmail = officials.filter(e => !e.emails);
      this.representatives = withEmail.concat(withoutEmail);
    }
  },
  data: () => ({
    location: "",
    apiKey: "",
    representatives: {},
    dialog: false
  })
};
</script>

<style scoped lang="scss">
.rep-card {
  margin-bottom: 25px;
}

.submit-button {
  margin-bottom: 25px;
}

.v-card__text {
  border: 1px solid #ffffffc8;
}
</style>