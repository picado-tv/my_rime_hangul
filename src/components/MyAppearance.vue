<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { NH2, NP, NText, NTable, NIcon, NA, NCheckbox, NSelect } from 'naive-ui'
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
    <n-p style="font-size: larger; font-weight: bold">선택모드 조작법</n-p>
    <n-p>기본적으로 한국어를 입력하면 선택모드가 시작되어 한글단어, 기초한자(1,800자), 상용한자어(약 20만)를 선택할 수 있습니다.</n-p>
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
          <td>시프트키 <n-icon size="12" :component="Add12Filled" /> 엔터키 </td>
          <td>미완성 한글 (초성) 선택</td>
        </tr>
      </tbody>
    </n-table>
 
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
          <td>띄어쓰기 전까지 글을 쓴 후 한자번호 누르고 1누르고 스페이스 누르기</td>
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

    <n-p style="font-size: larger; font-weight: bold">전문한자모드 조작법</n-p>
    <n-p><n-text code>`</n-text> 기호 (Backquote) 를 누르면 전문한자모드를 시작합니다. 전문한자모드에서는 모든 한자와 더 다양한 한자어휘를 선택할 수 있습니다.</n-p>
    <img src="https://github.com/picado-tv/rime-handarin/blob/master/keyboard-2set.png?raw=true" alt="한다린 키보드 레이아웃" />
    <n-table>
      <thead>
        <tr>
          <th>조작키</th>
          <th>역할</th>
          <th>예시</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>기본 녹색과 붉은색 자판 <n-text type="primary">[ㄱㄴㄷㄹ...</n-text><n-text type="error">ㅏㅑㅓㅕ...</n-text>]</td>
          <td>한자음으로 찾기</td>
          <td>喝: <n-text code>`갈</n-text><br />兀: <n-text code>`올</n-text></td>
        </tr>
        <tr>
          <td>시프트키 <n-icon size="12" :component="Add12Filled" /> 청색 자판 <n-text type="info">[丿丶丨乙一]</n-text></td>
          <td>필순으로 입력하여 모든 한자 입력하는 법, 참고: <n-a href="https://ko.wikipedia.org/wiki/%EC%98%A4%ED%95%84%ED%99%94%EC%88%98%EC%9E%85%EB%B2%95">위키백과[오필화수입법]</n-a></td>
          <td>石: <n-text code>`一丿丨乙一</n-text><br />乭: <n-text code>`一丿丨乙一乙</n-text></td>
        </tr>
        <tr>
          <td><n-text code>밖</n-text></td>
          <td>한국 한자음이 없는 한자(𠦌)나 원래 음이 없는 한자 등등 목록</td>
          <td>약 16,000여개의 한자 수록 (비사용권장)</td>
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
