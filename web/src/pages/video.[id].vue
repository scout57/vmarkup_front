<template>
  <v-breadcrumbs  :items="items"></v-breadcrumbs>
  <v-card class="mx-auto px-4 py-4" title="Карточка видео" subtitle="Вся информация о видео">
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
    items: [{
      title: 'Главная',
      disabled: false,
      to: '/'
    },{
      title: `Карточка видео`,
    }],
    form: false,
    file: undefined,
    loading: false,
  }),
}
</script>
