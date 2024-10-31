<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <div>
    <span class="count">{{ count }}</span>
    <button @click="count++">Add</button>
    <!-- Fragment -->
    <template>Fragment</template>
    <Transition>
      <button v-if="count > 0" @click="count--">Subtract</button>
    </Transition>
  </div>
</template>

<style scoped>
.count {
  color: green;
}
</style>
