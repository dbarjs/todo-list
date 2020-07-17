<template>
  <v-card v-if="frame" class="mb-3 mr-3" min-width="300" width="320">
    <v-container class="d-flex align-center">
      <v-card-title v-show="!isEditing" class="py-2" @click="isEditing = true">
        {{ frame.title }}
      </v-card-title>
      <v-text-field
        v-show="isEditing"
        ref="titleTextField"
        v-model="title"
        solo
        hide-details
        solo-inverted
        :loading="isLoading"
        @keydown.esc="isEditing = false"
        @keydown.enter="updateTitle"
        @blur="updateTitle"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="warning" icon @click="remove">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-container>
    <todo-list :todos="frame.todos"></todo-list>
    <v-card-actions>
      <empty-todo :frame="frame"></empty-todo>
    </v-card-actions>
  </v-card>
</template>

<script>
import TodoList from '~/components/TodoList.vue'
import EmptyTodo from '~/components/EmptyTodo.vue'
export default {
  components: {
    EmptyTodo,
    TodoList,
  },
  props: {
    frame: {
      default: null,
      type: [Object, null],
    },
  },
  data() {
    return {
      title: '',
      isEditing: false,
      isLoading: false,
    }
  },
  watch: {
    'frame.title': {
      immediate: true,
      deep: true,
      handler(title) {
        this.title = title
      },
    },
    isEditing: {
      immediate: true,
      handler(state) {
        if (state) {
          setTimeout(() => {
            this.$refs.titleTextField.focus()
          }, 50)
        }
      },
    },
  },
  methods: {
    remove() {
      this.$store.dispatch('frames/removeFrame', this.frame)
    },
    async updateTitle() {
      if (this.title !== this.frame.title) {
        console.log('oiii')
        this.isLoading = true
        await this.$store.dispatch('frames/updateFrame', {
          ...this.frame,
          title: this.title,
        })
        this.isLoading = false
      }
      this.isEditing = false
    },
  },
}
</script>
