<script setup>
defineProps({
  resume: { type: Object, required: true },
})

// 把 "2018-09" 转成 "2018.09"，空值返回空字符串
function fmtDate(d) {
  return d ? d.replaceAll('-', '.') : ''
}

// "2018-09" ~ "2022-06" 拼成时间段，只剩一边就只显示一边
function range(start, end) {
  const s = fmtDate(start)
  const e = fmtDate(end)
  if (s && e) return `${s} — ${e}`
  return s || e
}
</script>

<template>
  <div class="preview-pane">
    <div class="a4">
      <!-- ===== 头部：姓名 + 意向 + 联系方式 ===== -->
      <header class="r-head">
        <h1>{{ resume.name || '你的姓名' }}</h1>
        <p v-if="resume.intention" class="intention">求职意向：{{ resume.intention }}</p>
        <p class="contact">
          <span v-if="resume.city">{{ resume.city }}</span>
          <span v-if="resume.phone">{{ resume.phone }}</span>
          <span v-if="resume.email">{{ resume.email }}</span>
        </p>
      </header>

      <!-- ===== 教育经历 ===== -->
      <section v-if="resume.education.some(e => e.school)" class="r-section">
        <h2>教育经历</h2>
        <div v-for="(edu, i) in resume.education.filter(e => e.school)" :key="i" class="r-entry">
          <div class="r-line">
            <strong>{{ edu.school }}</strong>
            <span class="meta">{{ [edu.major, edu.degree].filter(Boolean).join(' · ') }}</span>
            <span class="date">{{ range(edu.start, edu.end) }}</span>
          </div>
          <p v-if="edu.desc" class="r-desc">{{ edu.desc }}</p>
        </div>
      </section>

      <!-- ===== 工作 / 项目经历 ===== -->
      <section v-if="resume.experience.some(e => e.org)" class="r-section">
        <h2>工作 / 项目经历</h2>
        <div v-for="(exp, i) in resume.experience.filter(e => e.org)" :key="i" class="r-entry">
          <div class="r-line">
            <strong>{{ exp.org }}</strong>
            <span class="meta">{{ exp.role }}</span>
            <span class="date">{{ range(exp.start, exp.end) }}</span>
          </div>
          <p v-if="exp.desc" class="r-desc">{{ exp.desc }}</p>
        </div>
      </section>

      <!-- ===== 技能特长 ===== -->
      <section v-if="resume.skills" class="r-section">
        <h2>技能特长</h2>
        <p class="r-desc">{{ resume.skills }}</p>
      </section>

      <!-- ===== 自我评价 ===== -->
      <section v-if="resume.summary" class="r-section">
        <h2>自我评价</h2>
        <p class="r-desc">{{ resume.summary }}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.preview-pane {
  overflow: auto;
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* A4 纸：210mm × 297mm */
.a4 {
  width: 210mm;
  min-height: 297mm;
  background: var(--paper);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  padding: 18mm 16mm;
  color: var(--ink);
  font-size: 13.5px;
  line-height: 1.7;
}

/* ===== 头部 ===== */
.r-head {
  text-align: center;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 14px;
  margin-bottom: 20px;
}

.r-head h1 {
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 6px;
  text-indent: 6px; /* 抵消末字间距，视觉居中 */
}

.intention {
  margin-top: 4px;
  font-size: 14px;
  color: var(--ink-soft);
  letter-spacing: 1px;
}

.contact {
  margin-top: 8px;
  font-size: 12.5px;
  color: var(--ink-soft);
}

.contact span + span::before {
  content: ' ｜ ';
  color: var(--line);
}

/* ===== 分区 ===== */
.r-section {
  margin-bottom: 18px;
}

.r-section h2 {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 3px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--ink);
  margin-bottom: 10px;
}

.r-entry {
  margin-bottom: 12px;
}

.r-line {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.r-line strong {
  font-size: 14.5px;
}

.meta {
  color: var(--ink-soft);
  font-size: 13px;
}

.date {
  margin-left: auto;
  color: var(--ink-faint);
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
}

.r-desc {
  margin-top: 3px;
  color: #333;
  text-align: justify;
}

/* 窄屏时简历整体缩放，避免横向滚动 */
@media (max-width: 900px) {
  .a4 {
    zoom: 0.75;
  }
}
</style>
