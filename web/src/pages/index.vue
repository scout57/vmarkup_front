<template>
  <v-container class="px-0" max-width="600">
    <v-form class="d-flex py-4 mb-4" max-width="600">
      <v-text-field
        v-model="search"
        class="mr-4"
        label="Запрос"
        variant="solo"
      ></v-text-field>

      <v-btn
        :loading="loading"
        color="success"
        size="large"
        type="button"
        variant="elevated"
        icon="mdi-magnify"
      ></v-btn>
    </v-form>
  </v-container>

  <v-card class="mx-auto px-4 py-4" max-width="600" title="Результат поиска"
          subtitle="Список видео подходящих под условия">

    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="name"
      @update:options="loadItems"
    ></v-data-table-server>
  </v-card>
</template>
<script>
import {http} from '@/shared'

export default {
  data: () => ({
    itemsPerPage: 5,
    headers: [
      {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id',
      },
      {
        title: 'Название',
        align: 'start',
        sortable: false,
        key: 'name',
      },
    ],
    search: '',
    serverItems: [],
    loading: true,
    totalItems: 0,
  }),
  methods: {
    async loadItems({page, itemsPerPage}) {
      this.loading = true
      const result = await http.request('/api/v1/video', {}, {
        limit: itemsPerPage,
        offset: page * itemsPerPage,
      }, {}, 'GET')

      this.serverItems = result.data.items;
      this.totalItems = result.data.meta.total;
      this.loading = false;

      // http.FakeAPI.fetch({page, itemsPerPage, sortBy}).then(({items, total}) => {
      //   this.serverItems = items
      //   this.totalItems = total
      //   this.loading = false
      // })
    },
  },
}
</script>
