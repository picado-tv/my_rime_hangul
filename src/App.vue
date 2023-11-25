<script setup lang="ts">
import {
  NConfigProvider,
  NNotificationProvider,
  NDialogProvider,
  NMessageProvider,
  NH1,
  NH2,
  darkTheme,
  useOsTheme
} from 'naive-ui'
import { MyLayout, MyHeader, MyFooter } from '@libreservice/my-widget'
import MyPwa from './components/MyPwa.vue'

const osThemeRef = useOsTheme()
</script>

<template>
  <my-pwa />
  <n-config-provider :theme="osThemeRef === 'dark' ? darkTheme : null">
    <my-layout>
      <template #header>
        <div style="padding-left: 24px; display: flex; align-items: center; cursor: pointer;">
          <img src="/LibreService.svg" style="width: 48px; height: 48px;">
          <span class="n-text" style="--n-bezier: cubic-bezier(.4, 0, .2, 1); --n-text-color: rgb(51, 54, 57); --n-font-weight-strong: 500; --n-font-famliy-mono: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace; --n-code-border-radius: 2px; --n-code-text-color: rgb(51, 54, 57); --n-code-color: rgb(244, 244, 248); --n-code-border: 1px solid #0000; font-size: 18px; margin-left: 12px;">
            무설치 한글입력기
          </span>
        </div>
      </template>
      <template #content>
        <div style="cursor: pointer; text-align: center; margin-top: 16px">
          <n-h1> 무설치 한글입력기 </n-h1>
        </div>
        <n-notification-provider :max="1">
          <n-dialog-provider>
            <n-message-provider>
              <router-view v-slot="{ Component }">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </router-view>
            </n-message-provider>
          </n-dialog-provider>
        </n-notification-provider>
      </template>
      <template #footer>
        <div class="my-footer">
          <p> The Web IME is forked from <a class="n-a" href="https://github.com/LibreService/my_rime/commit/8bd65bd024189bdd7aad0b987d0b727a292d9ee0" target="_blank" style="--n-text-color: #18a058; --n-bezier: cubic-bezier(.4, 0, .2, 1);">My Rime</a></p>
          <p> Commit <a class="n-a" href="https://github.com/picado-tv/my_rime_hangul/commit/__COMMIT__" target="_blank" style="--n-text-color: #18a058; --n-bezier: cubic-bezier(.4, 0, .2, 1);">{{ "__COMMIT__".slice(0, 7) }}</a> · Built at __BUILD_DATE__ </p>
        </div>
      </template>
    </my-layout>
  </n-config-provider>
</template>
