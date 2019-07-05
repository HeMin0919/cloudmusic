<template>
  <div class="artists" :style="{color: fontcolor}">
    <span v-for="(artist, index) in artists" :key="index">
      {{artist.name}}
      <span v-if="index < (artists.length - 1)">/</span>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      artists: {
        type: Array,
        required: true
      },
      fontcolor: {
        default: '#666'
      }
    }
  }
</script>

<style lang="scss">
.artists span{
  font-size: 12px;
}
</style>
