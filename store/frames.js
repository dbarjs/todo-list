import store from 'store2'

export const state = () => ({
  frames: [],
})

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
      newFrames[frameIndex] = frame
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
}

export const getters = {
  getFrames: (state) => state.frames,
  getFrameById: (state) => (id) =>
    state.frames.filter((frame) => frame.id === id)[0],
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
  async updateFrame({ commit, state }, frame) {
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
    const { data: todo } = await this.$axios.$post('frame', {
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
}
