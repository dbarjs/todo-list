<template>
  <div>{{ todos }}</div>
</template>

<script>
export default {
  props: {
    todos: {
      required: true,
      default: () => [],
      type: Array,
    },
  },
}
</script>
