<script setup>
import { reactive, watch } from 'vue'
import ResumeForm from './components/ResumeForm.vue'
import ResumePreview from './components/ResumePreview.vue'

const STORAGE_KEY = 'one-page-resume'

// 空白简历模板：清空时恢复到这个状态
function blankResume() {
  return {
    name: '',
    phone: '',
    email: '',
    city: '',
    intention: '',
    summary: '',
    skills: '',
    education: [{ school: '', major: '', degree: '', start: '', end: '', desc: '' }],
    experience: [{ org: '', role: '', start: '', end: '', desc: '' }],
  }
}

// 示例数据：第一次打开时让预览区不是空的，方便理解每个字段对应哪里
function sampleResume() {
  return {
    name: '张小明',
    phone: '138-0000-0000',
    email: 'xiaoming@example.com',
    city: '北京',
    intention: '前端开发工程师',
    summary: '两年前端开发经验，熟悉 Vue 全家桶，参与过日活十万级产品的迭代，注重代码质量与用户体验。',
    skills: 'JavaScript / TypeScript、Vue 3、Vite、Node.js、Git',
    education: [
      {
        school: '某某大学',
        major: '计算机科学与技术',
        degree: '本科',
        start: '2018-09',
        end: '2022-06',
        desc: '主修数据结构、操作系统、Web 开发等课程，GPA 3.6/4.0。',
      },
    ],
    experience: [
      {
        org: '某某科技有限公司',
        role: '前端开发实习生',
        start: '2021-07',
        end: '2021-12',
        desc: '负责公司官网重构，页面加载速度提升 40%；封装通用表单组件，减少 30% 重复代码。',
      },
    ],
  }
}

function loadResume() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...blankResume(), ...JSON.parse(raw) }
  } catch (e) {
    /* 存储损坏时忽略，用示例数据兜底 */
  }
  return sampleResume()
}

const resume = reactive(loadResume())

// 任何改动都自动存进浏览器，关掉网页再打开不丢
watch(
  resume,
  () => localStorage.setItem(STORAGE_KEY, JSON.stringify(resume)),
  { deep: true },
)

function clearAll() {
  if (confirm('确定要清空所有内容吗？此操作不可恢复。')) {
    Object.assign(resume, blankResume())
  }
}

function exportPdf() {
  window.print()
}
</script>

<template>
  <div class="app">
    <header class="toolbar no-print">
      <div class="brand">
        <span class="brand-mark">简历</span>
        <h1>一页纸简历生成器</h1>
      </div>
      <div class="actions">
        <button class="btn" @click="clearAll">清空</button>
        <button class="btn primary" @click="exportPdf">导出 PDF</button>
      </div>
    </header>

    <main class="workspace">
      <ResumeForm :resume="resume" />
      <ResumePreview :resume="resume" />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ===== 顶部工具栏 ===== */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  display: inline-block;
  padding: 4px 10px;
  background: var(--ink);
  color: var(--paper);
  font-size: 13px;
  letter-spacing: 4px;
}

.brand h1 {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 20px;
  border: 1px solid var(--ink);
  background: var(--paper);
  color: var(--ink);
  transition: background 0.15s, color 0.15s;
}

.btn:hover {
  background: var(--ink);
  color: var(--paper);
}

.btn.primary {
  background: var(--ink);
  color: var(--paper);
}

.btn.primary:hover {
  background: #333;
}

/* ===== 两栏工作区 ===== */
.workspace {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(360px, 480px) 1fr;
}

@media (max-width: 900px) {
  .workspace {
    grid-template-columns: 1fr;
  }
}
</style>

<style>
/* ===== 打印样式：只打印简历本身，导出即 PDF ===== */
@media print {
  @page {
    size: A4;
    margin: 0;
  }

  body {
    background: #fff;
  }

  .no-print {
    display: none !important;
  }

  .workspace {
    display: block !important;
  }

  .preview-pane {
    overflow: visible !important;
    padding: 0 !important;
  }

  .a4 {
    box-shadow: none !important;
    margin: 0 !important;
    width: 210mm !important;
    min-height: 297mm !important;
  }
}
</style>
