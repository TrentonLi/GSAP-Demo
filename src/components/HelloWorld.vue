<script setup lang="ts">
import { ref } from "vue";
import Demo from "../views/demo/demo.vue";
import First from "../views/first/first.vue";
import Second from "../views/second/second.vue";

defineProps<{ msg: string }>()

// 定义一个类型，用来约束动态组件类型
type ContentType = typeof Demo | typeof First;

// 映射菜单（tag 的 key 和对应的组件）
const menuMap = {
  DEMO: Demo,
  FIRST: First,
  SECOND:Second
};

// 当前选中的菜单 key
const currentKey = ref<keyof typeof menuMap>('SECOND');

// 当前显示的组件
const compContent = ref<ContentType>(menuMap[currentKey.value]);

// 切换方法
function switchMenu(key: keyof typeof menuMap) {
  currentKey.value = key;
  compContent.value = menuMap[key];
}
</script>

<template>
  <h2 style="text-align: left">{{msg}}</h2>

  <!-- 菜单栏 -->
  <div style="display: flex">
    <div
        v-for="(comp, key) in menuMap"
        :key="key"
        class="tag"
        :class="{ active: currentKey === key }"
        @click="switchMenu(key)"
    >
      {{ key }}
    </div>
  </div>

  <!-- 动态组件 -->
  <component :is="compContent" />
</template>

<style scoped>
.tag {
  min-width: 60px;
  text-align: center;
  margin: 0 5px;
  border: 1px solid #1a1a1a;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px 10px;
  user-select: none;
  transition: all 0.3s;
}
.tag:hover {
  background-color: #1a1a1a;
  color: white;
  transition: all 0.3s;
}
.tag.active {
  background-color: #1a1a1a;
  color: white;
}
</style>