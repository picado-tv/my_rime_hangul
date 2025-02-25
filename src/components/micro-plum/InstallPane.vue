<script setup lang="ts">
import { ref } from 'vue'
import {
  useMessage,
  NForm,
  NFormItem,
  NRadioGroup,
  NRadio,
  NInput,
  NDynamicTags,
  NCheckbox,
  NButton,
  NIcon
} from 'naive-ui'
import { Add12Regular } from '@vicons/fluent'
import {
  normalizeTarget,
  Recipe,
  GitHubDownloader,
  JsDelivrDownloader
} from '@libreservice/micro-plum'
import {
  prerequisites,
  install,
  schemaPattern
} from '../../micro-plum'
import {
  tab,
  source,
  mode,
  downloading,
  installedPrerequisites,
  preSelectedSchemas
} from './MicroPlum.vue'

const props = defineProps<{
  message: ReturnType<typeof useMessage>
}>()

const form = ref<InstanceType<typeof NForm>>()

const schemaURL = ref<string>('')
const target = ref<string>('')
const schemas = ref<string[]>([])
const installPrerequisites = ref<boolean>(!installedPrerequisites.value)
const installPrerequisitePrompt = `${installedPrerequisites.value ? 'Reinstall' : 'Install'} essay, prelude and emoji`

const rules = {
  target: {
    trigger: ['blur'],
    validator: () => {
      if (mode.value !== 'plum') {
        return
      }
      const error = new Error('Invalid plum target')
      if (target.value) {
        const normalized = normalizeTarget(target.value)
        if (!normalized || normalized.schema) {
          return error
        }
      } else if (!installPrerequisites.value) {
        return error
      }
    }
  },
  schemas: {
    validator: () => {
      if (mode.value !== 'plum') {
        return
      }
      for (const schema of schemas.value) {
        if (!schemaPattern.test(schema)) {
          return new Error(`Invalid schema id: ${schema}`)
        }
      }
      if (schemas.value.length === 0 &&
        target.value &&
        !prerequisites.includes(normalizeTarget(target.value)?.repo!)) {
        return new Error('Please provide at least one schema')
      }
    }
  },
  schemaURL: {
    trigger: ['blur'],
    validator: () => {
      if (mode.value !== 'schema') {
        return
      }
      if ((schemaURL.value && !normalizeTarget(schemaURL.value)?.schema) ||
        (!schemaURL.value && !installPrerequisites.value)) {
        return new Error('Invalid URL')
      }
    }
  }
}

async function onClick () {
  try {
    await form.value!.validate()
  } catch {
    return
  }
  downloading.value = true
  try {
    const Downloader = source.value === 'jsDelivr' ? JsDelivrDownloader : GitHubDownloader
    if (installPrerequisites.value) {
      installedPrerequisites.value = true
      await Promise.all(prerequisites.map(prerequisite => install(new Downloader(prerequisite))))
    }
    let recipe: Recipe | undefined
    if (mode.value === 'plum' && target.value) {
      recipe = await install(new Downloader(target.value, schemas.value))
    } else if (mode.value === 'schema' && schemaURL.value) {
      recipe = await install(new Downloader(schemaURL.value))
    }
    if (recipe) {
      preSelectedSchemas.value = recipe.loader.schemaIds
    }
    tab.value = 'deploy'
  } catch (e) {
    console.error(e)
    props.message.error((e as Error).message)
  }
  downloading.value = false
}
</script>

<template>
  <n-form
    ref="form"
    :disabled="downloading"
    :rules="rules"
  >
    <n-form-item label="Source">
      <n-radio-group v-model:value="source">
        <n-radio
          v-for="src of ['GitHub', 'jsDelivr']"
          :key="src"
          :value="src"
        >
          {{ src }}
        </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="Mode">
      <n-radio-group v-model:value="mode">
        <n-radio value="schema">
          Schema
        </n-radio>
        <n-radio value="plum">
          Plum
        </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item
      v-show="mode === 'plum'"
      label="Target"
      path="target"
    >
      <n-input
        v-model:value="target"
        placeholder="e.g. rime/rime-luna-pinyin"
      />
    </n-form-item>
    <n-form-item
      v-show="mode === 'plum'"
      label="Schemas"
      path="schemas"
    >
      <n-dynamic-tags v-model:value="schemas">
        <template #trigger="{ activate, disabled }">
          <n-button
            size="small"
            type="info"
            dashed
            :disabled="disabled"
            @click="activate()"
          >
            <template #icon>
              <n-icon :component="Add12Regular" />
            </template>
            e.g. luna_pinyin
          </n-button>
        </template>
      </n-dynamic-tags>
    </n-form-item>
    <n-form-item
      v-show="mode === 'schema'"
      label="Schema URL"
      path="schemaURL"
    >
      <n-input
        v-model:value="schemaURL"
        placeholder="GitHub URL of *.schema.yaml"
      />
    </n-form-item>
    <n-form-item label="Extra">
      <n-checkbox v-model:checked="installPrerequisites">
        {{ installPrerequisitePrompt }}
      </n-checkbox>
    </n-form-item>
  </n-form>
  <div style="display: flex; justify-content: end">
    <n-button
      secondary
      type="info"
      :disabled="downloading"
      @click="onClick"
    >
      Install
    </n-button>
  </div>
</template>
