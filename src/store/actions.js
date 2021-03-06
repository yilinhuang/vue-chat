// 通过commit调用mutation
import * as api from '../api'
import * as types from './mutation-types'

export const sendMessage = ({ commit }, payload) =>{
  api.createMessage(payload, message => {
    commit(types.RECEIVE_MESSAGE, {
      message
    })
  })
}

export const getAllMessages = ({ commit }) => {
    api.getAllMessages(messages => {
      commit(types.RECEIVE_ALL, {
        messages
      })
    })
  }

export const switchThread = ({ commit }, payload) => {
    commit(types.SWITCH_THREAD,payload)
}