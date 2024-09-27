<template>

  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >

      <v-row>
        <v-col cols="6">
          <v-card
            class="py-4"
            color="surface-variant"
            image="https://cdn.vuetifyjs.com/docs/images/one/create/feature.png"
            prepend-icon="mdi-rocket-launch-outline"
            rounded="lg"
            variant="outlined"
          >
            <template #image>
              <v-img position="top right" />
            </template>

            <template #title>
              <h2 class="text-h5 font-weight-bold">Get started</h2>
            </template>

            <template #subtitle>
              <div class="text-subtitle-1">
                Replace this page by removing <v-kbd>{{ `<HelloWorld />` }}</v-kbd> in <v-kbd>pages/index.vue</v-kbd>.
              </div>
            </template>

            <v-overlay
              opacity=".12"
              scrim="primary"
              contained
              model-value
              persistent
            />
          </v-card>
        </v-col>
      </v-row>

    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
//
</script>
