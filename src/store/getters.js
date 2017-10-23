export const threads = state => state.threads

export const currentThread = state => {
    return state.currentThreadID ? state.threads[state.currentThreadID] : {};
}

export const currentMessages = state => {
    const threads = currentThread(state) 
    return threads.messages ? threads.messages.map(id => state.messages[id]) : [];
}