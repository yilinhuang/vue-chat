<template>
    <div class="thread-section">
        <div class="thread-count">
            <span v-show="unreadCount">
                Unread threads: {{ unreadCount }}
            </span>
        </div>
        <ul class="thread-list">
            <thread 
                v-for="(thread,index) in threads" :key="index"
                :thread="thread" :active="thread.id === currentThread.id"
                @switch-thread="switchThread">
            </thread>
        </ul>
    </div>
</template>

<script>
import Thread from './Thread.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'ThreadSection',
    components: {
        Thread
    },
    computed: {
        ...mapGetters([
            'threads',
            'currentThread'
        ]),
        unreadCount() {
            const threads = this.threads;
            // console.log(threads)
            // console.log(Object.keys(threads))
            // Object.keys 返回一个所有元素为字符串的数组，
            // 其元素来自于从给定的对象上面可直接枚举的属性。
            // reduce() 累加器
            return Object.keys(threads).reduce((count,id)=> {
                return threads[id].lastMessage.isRead?count:count + 1
            },0)
        }  
    },
    methods: {
            switchThread (id) {
                this.$store.dispatch('switchThread', { id })
            }
        }
}
</script>

<style>

</style>
