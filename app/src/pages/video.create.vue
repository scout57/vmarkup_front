<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="pr-4"  title="GPT Enjoyers" >

        <v-spacer></v-spacer>
        <header-navigation/>

        <v-spacer></v-spacer>
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          :text="theme === 'light' ? 'Светлая' : 'Темная'"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-card class="mx-auto px-6 py-6" max-width="600" title="Новое видео">
            <v-form
              v-model="form"
              @submit.prevent="onSubmit"
            >

              <v-file-input
                class="py-6"
                label="Файл"
                show-size
                v-model="file"
                variant="outlined"
              ></v-file-input>

              <v-btn
                :disabled="!form"
                :loading="loading"
                color="success"
                size="large"
                type="submit"
                variant="elevated"
                block
              >
                Загрузить
              </v-btn>
            </v-form>
          </v-card>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>


<script setup>
const onSubmit = () => {
  console.log('sent')
}

import { ref } from 'vue'

const theme = ref('light')

function onClick () {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<script>
export default {
  data: () => ({
    form: false,
    file: undefined,
    loading: false,
  }),
}
</script>
