<template>
    <view class="pui-app" :style="style">
        <slot name="default"></slot>
    </view>
</template>

<script setup>


import {usePetalUiStore} from "../../stores/petal-ui";
import {computed} from "vue";

const puiStore = usePetalUiStore()

const style = computed(() => {
    return {
        background: puiStore.theme['bg-page'],
    }
})

</script>

<style scoped>
.pui-app {
    min-height: 100%;
}
</style>
