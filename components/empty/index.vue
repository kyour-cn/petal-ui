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
        default: 'https://developer.harmonyos.com/cn/docs/assets/images/ic_no_result.png'
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
        margin: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>