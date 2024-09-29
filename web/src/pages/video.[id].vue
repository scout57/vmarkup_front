<template>
  <v-breadcrumbs :items="items"></v-breadcrumbs>

  <v-card v-if="file" class="px-4 py-4 mb-4" max-height="500px" title="Сцены"
          subtitle="Здесь можно посмотреть каждую сцену подробно" :loading="loading">
    <v-tabs
      v-model="tab"
      color="primary"
      direction="horizontal"
      class="overflow-x-auto"
      show-arrows
    >
      <v-tab v-for="scene in file.scenes" :text="'#'+scene.id" :value="'tab-'+scene.id"></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="scene in file.scenes" :value="'tab-'+scene.id">

        <v-container>
          <v-row no-gutters>
            <v-col cols="12" sm="4">
              <v-card-subtitle>Объекты</v-card-subtitle>
              <v-card-text class="py-0" v-for="item in scene.detections">
                {{ item.avg }}% - {{ item.class }}
              </v-card-text>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card-subtitle>События</v-card-subtitle>
              <v-card-text class="py-0" v-for="item in scene.events">
                {{ item.probability }}% - {{ item.name }}
              </v-card-text>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card-subtitle>Эмоции</v-card-subtitle>
              <v-card-text class="py-0" v-for="item in scene.faces">
                {{ item.emotion_probability }}% - {{ item.emotion_label }}
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>


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
import {http} from "@/shared";
import {fi} from "vuetify/locale";

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
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      try {
        const result = await http.request(`/api/v1/video/${this.$route.params.id}`, {}, {}, {}, 'GET')
        this.file = result.data;
        console.log(result)
      } finally {
        this.loading = false;
      }
    },
    formatDetection(scene) {
      return scene.detections.map(s => {
        return s.class + ` (${s.avg})`
      }).join(',');
    }
  },
}
</script>
