<template>
  <div>
    <span class="count">{{ count }}</span>
    <button @click="count++">Add</button>
    <!-- Fragment -->
    <template>Fragment</template>
    <Transition>
      <button v-if="count > 0" @click="count--">Subtract</button>
      <button v-else>Add</button>
    </Transition>
    <!-- Nesting -->
    <div>
      <div>
        <div>Hello World!</div>
      </div>
    </div>
    <component is="div">
      TESTING
    </component>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
</script>

<script lang="ts">
export default {
  name: "Example",
};
</script>

<style scoped>
.count {
  color: green;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>