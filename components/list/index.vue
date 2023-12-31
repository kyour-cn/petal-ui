<template>
    <scroll-view
        class="pui-list"
        scroll-y
        :refresher-enabled="props.pullRefresh"
        :refresher-default-style="puiStore.dark ? 'white': 'black'"
        :lower-threshold="props.offset"
        :refresher-triggered="loading"
        :refresher-background="puiStore.theme['bg-page']"
        @scrolltoupper="scrollToUpper"
        @scrolltolower="scrollToLower"
        @refresherrefresh="onRefresh"
    >
        <template v-for="(item, key) in list" :key="key">
            <slot name="item" :item="item"/>
        </template>
        <view v-if="props.beforeLoad && loading" :style="{color: puiStore.theme['title']}" class="loading">加载中...</view>
        <view v-if="props.finished" :style="{color: puiStore.theme['title']}" class="finished">没有更多了</view>
    </scroll-view>
</template>

<script setup>
import {computed} from 'vue'
import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

const props = defineProps({
    // 列表数据
    list: {
        type: Array,
        default: () => []
    },
    // 是否开启触底加载
    beforeLoad: {
        type: Boolean,
        default: true
    },
    // 是否正在加载中
    loading: {
        type: Boolean,
        default: false
    },
    // 是否加载完成
    finished: {
        type: Boolean,
        default: false
    },
    // 触发加载更多的距离
    offset: {
        type: Number,
        default: 300
    },
    // 是否开启下拉刷新
    pullRefresh: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits([
    'update:loading',
    'load', // 加载更多
    'scrollToUpper', // 滚动到顶部
    'scrollToLower', // 滚动到底部
    'refresh' // 刷新
])

const loading = computed({
    get: () => props.loading,
    set: (value) => emits('update:loading', value)
})

const scrollToLower = () => {
    if (props.beforeLoad && !props.finished && !props.loading) {
        loading.value = true
        emits('load')
    }
    emits('scrollToLower')
}

const scrollToUpper = () => {
    emits('scrollToUpper')
}

const onRefresh = () => {
    if (props.loading) return;
    emits('refresh')
    loading.value = true
}

</script>

<style scoped>

.pui-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
}

.loading, .finished {
    text-align: center;
}
</style>