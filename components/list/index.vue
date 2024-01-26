<script setup>
import PuiLoading from '../loading'
import PuiEmpty from '../empty'
import {computed, ref, watch} from 'vue'
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

const onRefresh = () => {
    if (props.loading) return;
    emits('refresh')
    loading.value = true
}

const pullingTopX = ref(0)
const onPulling = (e) => {
    pullingTopX.value = Math.floor(e.detail.deltaY)
}
watch(loading, (val) => {
    if (!val) {
        // pullingTopX.value = 0
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
        :refresher-triggered="loading"
        refresher-default-style="none"
        :refresher-enabled="props.pullRefresh"
        :lower-threshold="props.offset"
        :refresher-background="puiStore.theme['bg-page']"
        @scrolltoupper="scrollToUpper"
        @scrolltolower="scrollToLower"
        @refresherpulling="onPulling"
        @refresherabort="pullingTopX = 0"
        @refresherrestore="pullingTopX = 0"
        @refresherrefresh="onRefresh"
    >
        <template v-for="(item, key) in list" :key="key">
            <slot name="item" :item="item"/>
        </template>

        <view class="pull-loading" style="" v-if="pullingTopX > 0">
            <PuiLoading :size="pullingIconSize"/>
        </view>

        <view v-if="props.finished && !loading && list.length === 0">
            <slot name="empty">
                <PuiEmpty />
            </slot>
        </view>
        <view v-if="loading" :style="{color: puiStore.theme['title']}" class="loading">
            <PuiLoading v-if="pullingTopX === 0"/>
            <view>加载中...</view>
        </view>
        <view v-else-if="props.finished" :style="{color: puiStore.theme['title']}" class="finished">没有更多了</view>
    </scroll-view>
</template>

<style scoped>

.petal-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
    position: relative;
}

.pull-loading {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
}

.loading, .finished {
    text-align: center;
}
</style>