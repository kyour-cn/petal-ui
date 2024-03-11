<script setup>
const props = defineProps({
    steps: {
        type: Array,
        default: () => []
    },
    current: {
        type: Number,
        default: 0
    },
    lineColor: {
        type: String,
        default: '#007aff'
    },
    circleColor: {
        type: String,
        default: '#007aff'
    }
})
</script>

<template>
    <view class="petal-steps">
        <view class="petal-steps__item" v-for="(item, index) in props.steps" :key="index">
            <view class="marks">
                <view
                    class="step-line"
                    :style="{
                    background: index === 0 ? 'transparent' : props.lineColor
                }"/>
                <view
                    class="step-circle"
                    :style="{
                    background: props.circleColor
                }"/>
                <view
                    class="step-line"
                    :style="{
                    background: index === props.steps.length - 1 ? 'transparent' : props.lineColor
                }"/>
            </view>
            <view class="step-text">
                {{ item.label }}
            </view>
        </view>
    </view>

</template>

<style scoped lang="scss">

.petal-steps {
    display: flex;
    align-items: center;

    &__item {
        flex: 1;

        .marks {
            flex: 1;
            display: flex;
            align-items: center;
            margin: 10rpx 0;
        }

        .step-line {
            flex: 1;
            height: 2rpx;
        }

        .step-circle {
            width: 20rpx;
            height: 20rpx;
            border-radius: 50%;
            margin: 0 10rpx;
        }

        .step-text {
            text-align: center;
        }
    }
}

</style>