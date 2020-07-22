import store from 'store2'

export const state = () => ({
  frames: [],
})

export const getters = {
  getFrames: (state) => state.frames,
  getFrameById: (state) => (id) =>
    state.frames.find((frame) => frame.id === id),
  getTodosByFrameId: (state) => (id) => {
    const frame = state.frames.find((frame) => frame.id === id)
    return frame ? frame.todos : []
  },
}

export const mutations = {
  setFrames: (state, frames) => {
    state.frames = frames
    store('@TodoList:frames', frames)
  },
  addFrame: (state, frame) => {
    state.frames = [...state.frames, frame]
    store('@TodoList:frames', state.frames)
  },
  updateFrame: (state, frame) => {
    const frameIndex = state.frames.findIndex(({ id }) => frame.id === id)
    if (frameIndex > -1) {
      const newFrames = [...state.frames]
      newFrames[frameIndex] = Object.assign(newFrames[frameIndex], frame)
      state.frames = newFrames
      store('@TodoList:frames', state.frames)
    }
  },
  removeFrame: (state, frame) => {
    const frameIndex = state.frames.findIndex(({ id }) => frame.id === id)
    if (frameIndex > -1) {
      const newFrames = [...state.frames]
      newFrames.splice(frameIndex, 1)
      state.frames = newFrames
      store('@TodoList:frames', state.frames)
    }
  },
  addTodo: (state, { frame, todo }) => {
    const frameIndex = state.frames.findIndex(({ id }) => frame.id === id)
    if (frameIndex > -1) {
      const newFrames = [...state.frames]
      newFrames[frameIndex].todos.push(todo)
      state.frames = newFrames
      store('@TodoList:frames', state.frames)
    }
  },
  updateTodo: (state, todo) => {
    const frameIndex = state.frames.findIndex(({ id }) => todo.frame_id === id)
    const todoIndex = state.frames[frameIndex]?.todos.findIndex(
      ({ id }) => todo.id === id,
    )
    if (todoIndex > -1) {
      const newFrames = [...state.frames]
      newFrames[frameIndex].todos[todoIndex] = todo
      console.log(newFrames[frameIndex].todos[todoIndex])
      state.frames = newFrames
      store('@TodoList:frames', state.frames)
    }
  },
  removeTodo: (state, todo) => {
    const frameIndex = state.frames.findIndex(({ id }) => todo.frame_id === id)
    const todoIndex = state.frames[frameIndex]?.todos.findIndex(
      ({ id }) => todo.id === id,
    )
    if (todoIndex > -1) {
      const newFrames = [...state.frames]
      newFrames[frameIndex].todos.splice(todoIndex, 1)
      state.frames = newFrames
      store('@TodoList:frames', state.frames)
    }
  },
}

export const actions = {
  async fetchFrames({ commit }) {
    const storagedFrames = store('@TodoList:frames')
    if (storagedFrames) {
      commit('setFrames', storagedFrames)
    }
    const { data } = await this.$axios.$get('frames')
    commit('setFrames', data)
  },

  async createFrame({ commit, state }, title) {
    const order = state.frames.length
    const { data: frame } = await this.$axios.$post('frame', {
      title,
      order,
    })
    commit('addFrame', frame)
    return frame
  },

  async updateFrame({ commit }, frame) {
    const { data } = await this.$axios.$put('frame', frame)
    commit('updateFrame', data)
    return data
  },

  async removeFrame({ commit }, frame) {
    const response = await this.$axios.$delete(`frame/${frame.id}`)
    commit('removeFrame', frame)
    return response
  },

  async createTodo({ commit }, { frame, title }) {
    const order = frame.todos.length
    const { data: todo } = await this.$axios.$post('todo', {
      title,
      description: '',
      frame_id: frame.id,
      open: true,
      order,
    })
    commit('addTodo', {
      frame,
      todo,
    })
    return todo
  },

  async updateTodo({ commit }, todo) {
    const { data } = await this.$axios.$put('todo', todo)
    commit('updateTodo', data)
    return data
  },

  async removeTodo({ commit }, todo) {
    const response = await this.$axios.$delete(`todo/${todo.id}`)
    commit('removeTodo', todo)
    return response
  },
}
