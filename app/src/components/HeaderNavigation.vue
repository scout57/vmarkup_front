<template>
  <v-tabs fixed-tabs>
    <v-tab prepend-icon="mdi-text-search" to="/video/create">Список</v-tab>
    <v-tab prepend-icon="mdi-video-plus" to="/video/create">Создание</v-tab>
    <v-tab prepend-icon="mdi-file-video-outline" to="/video/create">Карточка</v-tab>
  </v-tabs>
</template>
<script>
export default {
  data: () => ({
    tab: null,
  }),
}
</script>
