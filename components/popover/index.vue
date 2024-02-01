<script setup>
import {ref, watchEffect} from 'vue';

// TODO: 组件开发中，待完善

const props = defineProps({
    direction: {
        type: String,
        default: 'top',
        validator: (val) => ['top', 'bottom', 'left', 'right'].includes(val),
    },
    show: {
        type: Boolean,
        default: false,
    },
});

const show = ref(props.show);

const toggleShow = () => {
    show.value = !show.value
};

watchEffect(() => {
    if (!['top', 'bottom', 'left', 'right'].includes(props.direction)) {
        throw new Error(`Invalid direction prop: ${props.direction}`);
    }
});
</script>

<template>
    <div class="popover">
        <view @click="toggleShow">
            <slot></slot>
        </view>
        <div
            v-if="show"
            :class="{
                'popover-content': true,
                [`popover-${direction}`]: true
            }"
        >
            <slot name="reference"></slot>
        </div>
    </div>
</template>

<style scoped>
.popover {
    position: relative;
    display: inline-block;
}

.popover-content {
    position: absolute;
    background-color: #fff;
    padding: 10px;
    z-index: 10;
}

.popover-top {
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, 10px);
}

.popover-bottom {
    top: 100%;
    left: 50%;
    transform: translate(-50%, -10px);
}

.popover-left {
    right: 100%;
    top: 50%;
    transform: translate(-20rpx, -50%);
}

.popover-right {
    left: 100%;
    top: 50%;
    transform: translate(20rpx, -50%);
}

.popover-left::before {
    content: '';
    position: absolute;
    top: 50%;
    right: -30rpx; /* 根据需要调整位置 */
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent transparent white; /* 根据需要调整颜色 */
    transform: translateY(-50%);
}

.popover-right::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -30rpx; /* 根据需要调整位置 */
    border-width: 8px;
    border-style: solid;
    border-color: transparent white transparent transparent; /* 根据需要调整颜色 */
}

</style>
