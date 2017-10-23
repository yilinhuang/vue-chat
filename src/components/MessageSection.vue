<template>
    <div class="message-section">
        <h3 class="message-thread-heading">{{ thread.name }}</h3>
        <ul class="message-list" ref="list">
            <message v-for="message in sortedMessages" :key="message.id" :message="message">
            </message>
        </ul>
        <textarea class="message-composer" @keyup.enter="sendMessage"></textarea>
    </div>
</template>

<script>
import Message from './Message.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'MessagesSection',
    components : {
        Message
    },
    computed: {
        ...mapGetters({
            thread: 'currentThread',
            messages: 'currentMessages'
        }),
        sortedMessages () {
            // console.log(this.messages)
            return this.messages.slice().sort((a,b) => a.timestamp - b.timestamp)
        }
    },
    watch: {
        'thread.lastMessage' : function () {
            this.$nextTick(()=>{
                const ul = this.$refs.list
                ul.scrollTop = ul.scrollHeight
            })
        }
    },
    methods: {
        sendMessage (e) {
            const text = e.target.value
            console.log(text)
            if (text.trim()) {
                this.$store.dispatch('sendMessage', {
                    text,
                    thread: this.thread
                })
                e.target.value = ''
            }
        }
    }
}
</script>

<style>

</style>
