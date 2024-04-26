<script setup>

import PuiIcon from "../icon"
import PuiText from "../text"

const props = defineProps({
    size: {
        type: [Number, String],
        default: 300
    },
    description: {
        type: String,
        default: 'No data'
    },
    src: {
        type: String,
        default: '//qiniu.kyour.cn/petal-ui/empty-01.svg'
    }
})

</script>

<template>
    <view class="petal-empty">
        <PuiIcon :name="props.src" :size="props.size" />

        <view>
            <PuiText :text="props.description" color="subtitle" />
        </view>
    </view>
</template>

<style scoped>
    .petal-empty {
        padding: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>