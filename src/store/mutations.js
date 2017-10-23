// mutations里面装着一些改变数据方法的集合 
// Vuex中store数据改变的唯一方法就是mutation 
import Vue from 'vue'
import * as types from './mutation-types'

export default {
    [types.RECEIVE_MESSAGE] (state , {message}) {
        addMessage( state, message)
    },
    [types.RECEIVE_ALL] (state, {messages}) {
        let latestMessage
        messages.forEach(message => {
            if (!state.threads[message.threadID]) {
                createThread(state, message.threadID, message.threadName)
            }
            if (!latestMessage || message.timestamp > latestMessage.timestamp) {
                latestMessage = message
            }
            addMessage(state, message)
        });
        setCurrentThread(state, latestMessage.threadID)
    },
    [types.SWITCH_THREAD](state, { id }) {
        setCurrentThread(state, id)
    }
}

const createThread = (state,id, name) => {
    Vue.set(state.threads, id, {
        id,
        name,
        messages:[],
        lastMessage: null
    })
}

const addMessage = (state, message) => {
    // console.log(state)
    // console.log(message.threadID)
    // console.log(state.currentThreadID)
    message.isRead = message.threadID === state.currentThreadID    
    // console.log(message.isRead)
    const thread = state.threads[message.threadID]
    if (!thread.messages.some(id => id === message.id)) {
        thread.messages.push(message.id)
        thread.lastMessage = message
    }
    Vue.set(state.messages, message.id, message)
}

const setCurrentThread = (state, id)  => {
    state.currentThreadID =id
    if (!state.threads[id]) {
        debugger
    }
    state.threads[id].lastMessage.isRead = true
}