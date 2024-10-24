<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <span class="count">{{ count }}</span>
  <button @click="count++">Add</button>
</template>

<style scoped>
.count {
  color: green;
}
</style>
