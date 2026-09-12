<script setup>
defineProps({
  resume: { type: Object, required: true },
})

// 教育经历：新增一条 / 删除指定一条
function addEducation(resume) {
  resume.education.push({ school: '', major: '', degree: '', start: '', end: '', desc: '' })
}
function removeEducation(resume, index) {
  resume.education.splice(index, 1)
}

// 工作 / 项目经历：新增一条 / 删除指定一条
function addExperience(resume) {
  resume.experience.push({ org: '', role: '', start: '', end: '', desc: '' })
}
function removeExperience(resume, index) {
  resume.experience.splice(index, 1)
}
</script>

<template>
  <aside class="form-pane no-print">
    <!-- ===== 基本信息 ===== -->
    <section class="block">
      <h2>基本信息</h2>
      <div class="grid-2">
        <label>姓名 <input v-model="resume.name" placeholder="张小明" /></label>
        <label>所在城市 <input v-model="resume.city" placeholder="北京" /></label>
        <label>求职意向 <input v-model="resume.intention" placeholder="前端开发工程师" /></label>
        <label>电话 <input v-model="resume.phone" placeholder="138-0000-0000" /></label>
        <label class="span-2">邮箱 <input v-model="resume.email" placeholder="name@example.com" /></label>
      </div>
    </section>

    <!-- ===== 教育经历 ===== -->
    <section class="block">
      <header class="block-head">
        <h2>教育经历</h2>
        <button class="btn-add" @click="addEducation(resume)">+ 添加</button>
      </header>
      <fieldset v-for="(edu, i) in resume.education" :key="i" class="entry">
        <header class="entry-head">
          <span class="entry-index">{{ i + 1 }}</span>
          <button
            v-if="resume.education.length > 1"
            class="btn-del"
            title="删除此条"
            @click="removeEducation(resume, i)"
          >删除</button>
        </header>
        <div class="grid-2">
          <label>学校 <input v-model="edu.school" placeholder="某某大学" /></label>
          <label>专业 <input v-model="edu.major" placeholder="计算机科学与技术" /></label>
          <label>学历
            <select v-model="edu.degree">
              <option value="">请选择</option>
              <option>大专</option>
              <option>本科</option>
              <option>硕士</option>
              <option>博士</option>
            </select>
          </label>
          <label class="date-pair">
            <input v-model="edu.start" type="month" />
            <span>至</span>
            <input v-model="edu.end" type="month" />
          </label>
        </div>
        <label>补充说明 <textarea v-model="edu.desc" rows="2" placeholder="课程、成绩、荣誉等"></textarea></label>
      </fieldset>
    </section>

    <!-- ===== 工作 / 项目经历 ===== -->
    <section class="block">
      <header class="block-head">
        <h2>工作 / 项目经历</h2>
        <button class="btn-add" @click="addExperience(resume)">+ 添加</button>
      </header>
      <fieldset v-for="(exp, i) in resume.experience" :key="i" class="entry">
        <header class="entry-head">
          <span class="entry-index">{{ i + 1 }}</span>
          <button
            v-if="resume.experience.length > 1"
            class="btn-del"
            title="删除此条"
            @click="removeExperience(resume, i)"
          >删除</button>
        </header>
        <div class="grid-2">
          <label>公司 / 项目 <input v-model="exp.org" placeholder="某某科技有限公司" /></label>
          <label>职位 / 角色 <input v-model="exp.role" placeholder="前端开发工程师" /></label>
          <label class="date-pair span-2">
            <input v-model="exp.start" type="month" />
            <span>至</span>
            <input v-model="exp.end" type="month" />
          </label>
        </div>
        <label>工作内容 <textarea v-model="exp.desc" rows="3" placeholder="用一句话说清楚：做了什么 + 带来什么结果"></textarea></label>
      </fieldset>
    </section>

    <!-- ===== 技能与自我评价 ===== -->
    <section class="block">
      <h2>技能特长</h2>
      <label class="span-2"><textarea v-model="resume.skills" rows="2" placeholder="按熟练度排列，用顿号或斜杠分隔"></textarea></label>
    </section>
    <section class="block">
      <h2>自我评价</h2>
      <label class="span-2"><textarea v-model="resume.summary" rows="3" placeholder="2-3 句话：你是谁 + 有什么优势 + 想做什么"></textarea></label>
    </section>
  </aside>
</template>

<style scoped>
.form-pane {
  padding: 24px;
  background: var(--paper);
  border-right: 1px solid var(--line);
  overflow-y: auto;
}

.block {
  margin-bottom: 28px;
}

.block h2 {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--ink);
  margin-bottom: 14px;
}

.block-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.block-head h2 {
  flex: 1;
}

.btn-add {
  border: 1px solid var(--ink);
  background: none;
  padding: 3px 10px;
  font-size: 12px;
}

.btn-add:hover {
  background: var(--ink);
  color: var(--paper);
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 12px;
  margin-bottom: 10px;
}

.span-2 {
  grid-column: span 2;
  display: block;
}

label {
  display: block;
  font-size: 12px;
  color: var(--ink-soft);
}

input, textarea, select {
  width: 100%;
  margin-top: 4px;
  padding: 7px 10px;
  border: 1px solid var(--line);
  background: #fafaf9;
  outline: none;
  transition: border-color 0.15s;
}

input:focus, textarea:focus, select:focus {
  border-color: var(--ink);
  background: #fff;
}

textarea {
  line-height: 1.6;
}

.date-pair {
  display: flex;
  align-items: center;
  gap: 6px;
}

.date-pair input {
  min-width: 0;
}

.date-pair span {
  color: var(--ink-faint);
}

/* 条目卡片 */
.entry {
  border: 1px solid var(--line);
  padding: 12px;
  margin-bottom: 10px;
}

.entry-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.entry-index {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: var(--ink);
  color: var(--paper);
  font-size: 11px;
}

.btn-del {
  border: none;
  background: none;
  color: var(--ink-faint);
  font-size: 12px;
  text-decoration: underline;
}

.btn-del:hover {
  color: var(--ink);
}
</style>
