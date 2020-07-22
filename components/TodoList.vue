<template>
  <v-list two-line class="px-2 pt-0">
    <draggable
      :list="todoList"
      class="list-group"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
      @change="onChange"
    >
      <todo v-for="todo in todoList" :key="todo.id" :todo="todo"></todo>
    </draggable>
  </v-list>
</template>

<script>
import draggable from 'vuedraggable'
import Todo from '~/components/Todo.vue'

export default {
  components: {
    Todo,
    draggable,
  },
  props: {
    frameId: {
      required: true,
      default: '',
      type: String,
    },
  },
  data() {
    return {
      todoList: [],
      dragging: false,
    }
  },
  computed: {
    todos() {
      return this.$store.getters['frames/getTodosByFrameId'](this.frameId)
    },
  },
  watch: {
    todos: {
      immediate: true,
      handler(todos) {
        const todoList = [...todos]
        todoList.sort((a, b) => (a.order > b.order ? 1 : -1))
        this.todoList = todoList
      },
    },
  },
  methods: {
    onChange({ moved }) {
      const maxTodoIndex = Math.max(moved.oldIndex, moved.newIndex)
      const todosToUpdate = this.todoList.filter(
        (todo, index) => maxTodoIndex >= index,
      )
      this.updateOrderOfTodos(todosToUpdate)
    },
    updateOrderOfTodos(todos) {
      todos.forEach((todo, index) => {
        this.$store.dispatch('frames/updateTodo', {
          ...todo,
          order: index,
        })
      })
    },
  },
}
</script>

<style>
.ghost {
  opacity: 0.4;
}
</style>
