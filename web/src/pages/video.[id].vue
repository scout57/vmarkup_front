<template>
  <v-card class="mx-auto px-4 py-4" max-width="600" title="Карточка видео" subtitle="Вся информация о видео">
    <v-form
      v-model="form"
      @submit.prevent="onSubmit"
    >

    </v-form>
  </v-card>
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
