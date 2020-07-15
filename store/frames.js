import store from 'store2'

export const state = () => ({
  frames: [],
})

export const mutations = {
  setFrames: (state, frames) => {
    state.frames = frames
    store('@TodoList:frames', frames)
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
  async createFrame({ commit }, frameData) {
    const frame = await this.$axios.$post('frame', {
      title: frameData.title,
      order: 0,
    })
  },
}
