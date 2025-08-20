<script setup lang="ts">
import {onMounted, ref} from "vue";
import gsap from "gsap";

const boxRef = ref<HTMLElement | null>(null)

onMounted(() => {})

interface moveObj {
  x?:number,
  y?:number,
  xPercent?:number,
  yPercent?:number,
  scale?:number,
  transformOrigin?:string
}
const sentryFun = (obj:moveObj) => {
  gsap.to(boxRef.value, obj)
}
const click2move = () => {
  sentryFun(
      {
        x: 1000,
        y: 0,
        scale:2
      }
  )
}
const click2recover = () => {
  sentryFun(
      {
        x:0,
        y:0,
        scale:1,
        xPercent:0,
        yPercent:0,
        transformOrigin:'0'
      }
  )
}
</script>

<template>
  <button @click="click2move">移动放大</button>
  <button @click="click2recover">复原</button>
  <div ref="boxRef" class="box green"></div>
</template>
<style scoped>
.box {
  display: block;
}

.green {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: green;
}
</style>