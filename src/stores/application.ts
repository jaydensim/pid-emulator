import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useApplication = defineStore('Application', () => {
  const loadState = ref<{
    emulators: 'unloaded' | 'loading' | 'error' | 'ready'
    railroutes: 'unloaded' | 'loading' | 'error' | 'ready'
  }>({
    emulators: 'unloaded',
    railroutes: 'unloaded'
  })

  const isAppFullyLoaded = computed(() => {
    return loadState.value.emulators === 'ready' && loadState.value.railroutes === 'ready'
  })

  function setLoadState(
    type: 'emulators' | 'railroutes',
    state: 'unloaded' | 'loading' | 'error' | 'ready'
  ) {
    loadState.value[type] = state
  }

  return { loadState, isAppFullyLoaded, setLoadState }
})
