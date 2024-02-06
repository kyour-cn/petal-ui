<script setup>
import PuiLoading from '../loading'
import PuiEmpty from '../empty'
import {computed, ref, toRefs, watch} from 'vue'
import {usePetalUiStore} from "../../stores/petal-ui"

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
    },
    // 加载中提示文字
    loadingText: {
        type: String,
        default: '加载中...'
    },
    // 空数据提示文字
    emptyText: {
        type: String,
        default: '暂无数据'
    },
    // 加载完成提示文字
    finishedText: {
        type: String,
        default: '没有更多了'
    },
})

// 判断是否是小程序
const isMp =
    // #ifdef MP
    true
// #else
false
// #endif

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

let timerToLower = null
const scrollToLower = () => {
    if (timerToLower == null && props.beforeLoad && !props.finished && !props.loading) {

        // 避免多次触发
        timerToLower = setTimeout(() => {
            timerToLower = null
        }, 100)

        loading.value = true
        emits('load')
    }
    emits('scrollToLower')
}

// 下拉刷新
const onRefresh = () => {
    if (props.loading) return;
    emits('refresh')
    pullLoading.value = true
    loading.value = true
}

const pullLoading = ref(false)
const pullingTopX = ref(0)
const onPulling = (e) => {
    pullingTopX.value = Math.floor(e.detail?.deltaY ? e.detail.deltaY : e.detail.dy)
}

const {pullRefresh} = toRefs(props);
watch(pullRefresh, (val) => {
    if (!val) {
        pullingTopX.value = 0
    }
})

// 监听loading变化，更新下拉刷新状态
watch(loading, (val) => {
    if (!val) {
        pullLoading.value = false
    }
})

const pullingIconSize = computed(() => {
    return pullingTopX.value > 100 ? 100 : pullingTopX.value
})

const scrollToUpper = () => {
    emits('scrollToUpper')
}

</script>

<template>
    <scroll-view
        class="petal-list"
        :scroll-y="true"
        refresher-default-style="none"
        :refresher-triggered="pullLoading"
        :refresher-enabled="pullRefresh"
        :lower-threshold="props.offset"
        :refresher-background="puiStore.theme['bg-page']"
        @scrolltoupper="scrollToUpper"
        @scrolltolower="scrollToLower"
        @refresherpulling="onPulling"
        @refresherabort="pullingTopX = 0"
        @refresherrestore="pullingTopX = 0"
        @refresherrefresh="onRefresh"
    >
        <!-- 顶部下拉刷新提示 -->
        <view
            v-if="pullingTopX > 0"
            class="pull-loading"
            :style="{
                color: puiStore.theme['subtitle'],
                marginTop: isMp ? '-50rpx' : '0'
            }"
        >
            <PuiLoading :size="pullingIconSize"/>
            <view v-if="loading">{{props.loadingText}}</view>
        </view>

        <!-- 列表显示内容 -->
        <slot name="default">
            <template v-for="(item, key) in list" :key="key">
                <slot name="item" :item="item"/>
            </template>
        </slot>

        <!-- 空数据提示 -->
        <view v-if="props.finished && !loading && list.length === 0">
            <slot name="empty">
                <PuiEmpty :description="props.emptyText"/>
            </slot>
        </view>

        <!-- 加载完成提示 -->
        <view
            v-else-if="props.finished && list.length > 0"
            :style="{color: puiStore.theme['title']}"
            class="finished"
        >{{props.finishedText}}</view>

        <!-- 底部加载提示 -->
        <view
            v-if="!props.finished && pullingTopX === 0"
            :style="{color: puiStore.theme['subtitle']}"
            class="loading"
        >
            <PuiLoading/>
            <view>{{props.loadingText}}</view>
        </view>
    </scroll-view>
</template>

<style scoped lang="scss">

.petal-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;

    .pull-loading {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }

    .loading, .finished {
        text-align: center;
    }
}

</style>