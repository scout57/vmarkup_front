<template>
  <v-sheet class="bg-deep-purple pa-12 h-screen" rounded>
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
  </v-sheet>
</template>


<script setup>
const onSubmit = () => {
  console.log('sent')
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
