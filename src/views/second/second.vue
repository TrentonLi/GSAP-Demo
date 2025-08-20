<script setup lang="ts">
import gsap from "gsap";
import {onMounted} from "vue";

onMounted(() =>{
  // target the element with a class of "green" - rotate and move TO 100px to the left over the course of 1 second.
  gsap.to(".green", {rotation: 360, x: 200, duration: 1});

// target the element with a class of "purple" - rotate and move FROM 100px to the left over the course of 1 second.
  gsap.from(".purple", {rotation: -360, x: -100, duration: 1});

// target the element with a class of "blue" - rotate and move FROM 100px to the left, TO 100px to the right over the course of 1 second.
  gsap.fromTo(".blue", {x: -100},{rotation: 360, x: 300, duration: 1});
})
</script>

<template>
  <div>
    <div class="box green"></div>
    <div class="box purple"></div>
    <div class="box blue"></div>
  </div>
</template>
<style scoped>

/* 通用盒子 */
.box {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}
/* 给每个盒子加“噪点纹理” */
.box::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(currentColor 1px, transparent 1px);
  background-size: 3px 3px;
  opacity: 0.4; /* 控制噪点透明度 */
  pointer-events: none;
}

/* 绿色渐变 */
.green {
  background: linear-gradient(135deg, #00ff66, #009944);
  color: black; /* 伪元素用 currentColor 取噪点色 */
}

/* 紫粉渐变 */
.purple {
  background: linear-gradient(135deg, #d98cff, #6f64ff);
  color: black;
}

/* 蓝色渐变 */
.blue {
  background: radial-gradient(circle at top left, #66e0ff, #0099cc);
  color: black;
}
</style>