<template>
  <v-breadcrumbs :items="items"></v-breadcrumbs>

  <v-card class="px-4 py-4 mb-4" max-height="500px" title="Сцены" subtitle="Здесь можно посмотреть каждую сцену подробно">
    <v-tabs
      v-model="tab"
      color="primary"
      direction="horizontal"
      class="overflow-x-auto"
      show-arrows
    >
      <v-tab v-for="i in 100" :text="'#'+i" :value="'tab-'+i"></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="i in 100" :value="'tab-'+i">
        <v-card flat>
          <v-card-text>
            <p>
              Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non
              metus. Sed a libero.
            </p>

            <p>
              Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed,
              posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit
              hendrerit rutrum.
            </p>

            <p class="mb-0">
              Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et,
              tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
            </p>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>

  <v-card class="px-4 py-4" title="Карточка видео" subtitle="Общая сводка по целому файлу">
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
    tab: null,
    items: [{
      title: 'Главная',
      disabled: false,
      to: '/'
    }, {
      title: `Карточка видео`,
    }],
    form: false,
    file: undefined,
    loading: false,
  }),
}
</script>
