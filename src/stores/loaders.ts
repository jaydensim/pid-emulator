import type { Emulator } from '../types/Emulator'
import type { Railroute } from '../types/Railroute'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApplication } from './application'
import { useVehicle } from './vehicle'

const emulatorModules = import.meta.glob('../_emulators/**/*.emulator.ts')
const railrouteModules = import.meta.glob('../_routes/**/*.railroute.ts')

export const useLoaders = defineStore('Loaders', () => {
  const applicationStore = useApplication()
  const vehicleStore = useVehicle()

  const emulators = ref(new Map<string, Emulator>())
  const railroutes = ref(new Map<string, Railroute>())

  async function bootstrap() {
    try {
      applicationStore.setLoadState('emulators', 'loading')
      for (const path in emulatorModules) {
        const mod = (await emulatorModules[path]()) as { default: Emulator }
        emulators.value.set(mod.default.id, mod.default)
      }
      applicationStore.setLoadState('emulators', 'ready')
    } catch (e) {
      applicationStore.setLoadState('emulators', 'error')
    }

    try {
      applicationStore.setLoadState('railroutes', 'loading')
      let hasFirstSet = false
      for (const path in railrouteModules) {
        const mod = (await railrouteModules[path]()) as { default: Railroute }
        railroutes.value.set(mod.default.id, mod.default)
        if (!hasFirstSet) {
          hasFirstSet = true
          vehicleStore.setVehicleRoute(mod.default)
        }
      }

      applicationStore.setLoadState('railroutes', 'ready')
    } catch (e) {
      applicationStore.setLoadState('railroutes', 'error')
    }
  }

  return { emulators, railroutes, bootstrap }
})
