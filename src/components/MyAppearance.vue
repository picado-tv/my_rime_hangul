<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { NH2, NP, NText, NTable, NIcon, NSpace, NCheckbox, NSelect } from 'naive-ui'
import { Add12Filled } from '@vicons/fluent'
import { forceVertical } from '../control'
import { setPageSize } from '../workerAPI'

const PAGE_SIZE = 'pageSize'
const pageSize = ref<number>(Number(localStorage.getItem(PAGE_SIZE)) || 0)

watchEffect(() => {
  localStorage.setItem(PAGE_SIZE, pageSize.value.toString())
  setPageSize(pageSize.value)
})

const options = [
  { label: 'default', value: 0 },
  ...Array.from({ length: 10 }, (_, i) => ({ label: (i + 1).toString(), value: i + 1 }))
]
</script>

<template>
  <div>
    <n-h2 prefix="bar" type="info" >사용 방법</n-h2>
    <n-p depth="3">
      본 입력기는 외국어입력기로서 개발된 오픈소스를 개량해 사용하는 점과 한자어를 자동완성하는 기능으로 인해 일반적인 한국어입력 키보드와 사용법이 조금 다릅니다. 연락처를 통해 의견주시면 개선에 참고하겠습니다.
    </n-p>
    <n-p style="font-size: larger; font-weight: bold">선택모드 조작법</n-p>
    <n-p>기본적으로 한국어를 입력하면 선택모드가 시작되어 한글 및 상용한자어를 선택할 수 있습니다.</n-p>
    <n-table>
      <thead>
        <tr>
          <th>조작키</th>
          <th>역할</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>숫자키</td>
          <td>후보중 선택</td>
        </tr>
        <tr>
          <td>방향키 <n-icon size="12" :component="Add12Filled" /> 스페이스키 </td>
          <td>선택</td>
        </tr>
        <tr>
          <td>엔터키 </td>
          <td>로마자로 완성</td>
        </tr>
        <tr>
          <td>시프트키  <n-icon size="12" :component="Add12Filled" /> 엔터키 </td>
          <td>미완성 한글 (초성) 선택</td>
        </tr>
      </tbody>
    </n-table>
<!-- 
    <n-p style="font-size: larger; font-weight: bold">전문한자모드 조작법</n-p>
    <n-p><n-text code>`</n-text> 기호 (Backquote) 를 누르면 전문한자모드를 시작합니다. 전문한자모드에서는 한글자한자 및 더 다양한 어휘를 선택할 수 있습니다.</n-p>
 -->
    <n-p style="font-size: larger; font-weight: bold">편리한 사용법</n-p>
    <n-table>
      <thead>
        <tr>
          <th>경우</th>
          <th>편리한 입력방법</th>
          <th>예시</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>순한글단어</td>
          <td>띄어쓰기 전까지 글을 쓴 후 한자번호를 누르고 1누르고 스페이스 누르기</td>
          <td><n-text code>보세요 (1 space) </n-text></td>
        </tr>
        <tr>
          <td>한자어 + 한글단어</td>
          <td>띄어쓰기 전까지 글을 쓴 후 한자번호 누르고 1누르고 스페이스 누르기</td>
          <td><n-text code>참고하세요 (3 1 space) </n-text></td>
        </tr>
        <tr>
          <td>순한자단어</td>
          <td>띄어쓰기 전까지 글을 쓴 후 한자번호 누르고 스페이스</td>
          <td><n-text code>참고 (2 space) </n-text></td>
        </tr>
        <tr>
          <td>여러한자 및 한글단어조합</td>
          <td>띄어쓰기 전까지 글을 쓴 후 숫자 여러번 누르고 스페이스</td>
          <td><n-text code>자료참고하세요 (3 3 1 space) </n-text></td>
        </tr>
      </tbody>
    </n-table>

    <!-- <n-h3 prefix="bar" type="info">자세한 사용법</n-h3> -->
    <!--
    <n-checkbox v-model:checked="forceVertical">
      Force vertical
    </n-checkbox>
    <n-space style="align-items: center">
      Number of candidates
      <n-select
        v-model:value="pageSize"
        style="width: 96px"
        :options="options"
      />
    </n-space>
    -->
  </div>
</template>
