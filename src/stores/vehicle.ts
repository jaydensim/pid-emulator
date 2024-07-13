import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Railroute } from '../types/Railroute'

export const useVehicle = defineStore('Vehicle', () => {
  const vehicleMotionState = ref<'stopped' | 'departing' | 'moving' | 'arriving'>('stopped')

  const vehicleDoorState = ref<'closed' | 'opening' | 'open' | 'closing'>('closed')

  const vehicleSafetyState = ref<'safe' | 'unsafe'>('safe')

  const vehicleFullStoppingPattern = ref<string[]>([])
  const vehiclePreviousStops = ref<string[]>([])
  const vehicleNextStops = ref<string[]>([])

  const vehicleRoute = ref<Railroute>()

  function setVehicleMotionState(state: 'stopped' | 'departing' | 'moving' | 'arriving') {
    if (vehicleSafetyState.value === 'safe') {
      vehicleMotionState.value = state
    } else {
      vehicleMotionState.value = 'stopped'
    }
  }

  function setVehicleDoorState(state: 'closed' | 'opening' | 'open' | 'closing') {
    if (vehicleSafetyState.value === 'unsafe') {
      vehicleDoorState.value = state
    } else {
      vehicleDoorState.value = 'closed'
    }
  }

  function setVehicleSafetyState(state: 'safe' | 'unsafe') {
    if (state == 'safe' && vehicleDoorState.value == 'closed') {
      vehicleSafetyState.value = state
    } else {
      vehicleSafetyState.value = 'unsafe'
    }
  }

  function setVehicleRoute(route: Railroute) {
    vehicleRoute.value = JSON.parse(JSON.stringify(route))
    resetRoute()
  }

  function resetRoute() {
    if (!vehicleRoute.value) return
    vehicleFullStoppingPattern.value = []
    vehicleNextStops.value = []
    vehicleFullStoppingPattern.value = JSON.parse(JSON.stringify(vehicleRoute.value.stations))
    vehicleNextStops.value = JSON.parse(JSON.stringify(vehicleRoute.value.stations))
  }

  function progressVehicleStop() {
    if (vehicleNextStops.value.length > 0) {
      vehiclePreviousStops.value.push(vehicleNextStops.value.shift() as string)
    }
  }

  return {
    vehicleMotionState,
    vehicleDoorState,
    vehicleSafetyState,
    vehicleFullStoppingPattern,
    vehiclePreviousStops,
    vehicleNextStops,
    vehicleRoute,
    setVehicleSafetyState,
    setVehicleMotionState,
    setVehicleDoorState,
    setVehicleRoute,
    resetRoute,
    progressVehicleStop
  }
})
