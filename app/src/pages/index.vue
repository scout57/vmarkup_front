<template>
  <v-card class="mx-auto px-4 py-4" max-width="600" title="Результат поиска" subtitle="Список видео подходящих под условия">

    <v-table
      fixed-header
    >
      <thead>
      <tr>
        <th class="text-left">
          ID
        </th>
        <th class="text-left">
          Описание
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in desserts"
        :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },
}
</script>
