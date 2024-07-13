import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useVehicle } from './vehicle'

const ActorDefault: string[] = [
  'actor:ctf:begin',
  'vehicle:route:reset',
  'actor:ctf:setdelay:30000',
  'vehicle:vmov:moving',
  'actor:ctf:setdelay:15000',
  'vehicle:vmov:arriving',
  'actor:ctf:setdelay:500',
  'vehicle:vmov:stopped',
  'vehicle:safety:unsafe',
  'actor:ctf:setdelay:3000',
  'vehicle:doors:opening',
  'actor:ctf:setdelay:5000',
  'vehicle:doors:open',
  'actor:ctf:setdelay:3000',
  'vehicle:doors:closing',
  'actor:ctf:setdelay:500',
  'vehicle:doors:closed',
  'vehicle:safety:safe',
  'vehicle:route:nextstop',
  'actor:ctf:setdelay:5000',
  'vehicle:vmov:departing',
  'actor:ctf:setdelay:0',
  'actor:ctf:repeatif:morestops:2',
  'actor:ctf:setdelay:30000',
  'vehicle:vmov:moving',
  'actor:ctf:setdelay:15000',
  'vehicle:vmov:arriving',
  'actor:ctf:setdelay:500',
  'vehicle:vmov:stopped',
  'vehicle:safety:unsafe',
  'actor:ctf:setdelay:3000',
  'vehicle:doors:opening',
  'actor:ctf:setdelay:5000',
  'vehicle:doors:open',
  'actor:ctf:end'
]

export const useActor = defineStore('Actor', () => {
  const vehicleStore = useVehicle()

  const actorProgram = ref<string[]>(ActorDefault)
  const actorState = ref<'stopped' | 'running' | 'paused'>('stopped')
  const currentStage = ref<number>(0)

  const currentTimeBuildup = ref<number>(0)
  const lastRunTime = ref<number>(0)
  const currentDelay = ref<number>(0)

  const moveNextNumber = ref<boolean>(false)

  const isSkippingToNextStation = ref<boolean>(false)

  function setActorProgram(program: string[]) {
    actorProgram.value = program
  }

  const actorProgramProgress = computed(() => {
    return currentStage.value / actorProgram.value.length
  })

  const actorWaitStateProgress = computed(() => {
    return currentTimeBuildup.value / currentDelay.value
  })

  const currentActorInstruction = computed(() => {
    return actorProgram.value[currentStage.value]
  })

  function runActorStep() {
    const currentPerfNow = performance.now()
    if (
      currentDelay.value >= currentTimeBuildup.value &&
      !actorProgram.value[currentStage.value].includes('actor:ctf:setdelay') &&
      !isSkippingToNextStation.value
    ) {
      currentTimeBuildup.value += currentPerfNow - lastRunTime.value
      lastRunTime.value = currentPerfNow
    } else {
      currentTimeBuildup.value = 0
      lastRunTime.value = currentPerfNow

      if (moveNextNumber.value) {
        currentStage.value++
        moveNextNumber.value = false
      }

      const currentInstruction = actorProgram.value[currentStage.value]
      const [driver, scope, instruction, ...args] = currentInstruction.split(':')
      let outcome = false
      if (driver == 'actor') {
        outcome = actorControlActorDriver(scope, instruction, args)
      } else if (driver == 'vehicle') {
        outcome = vehicleControlActorDriver(scope, instruction, args)
      }

      moveNextNumber.value = outcome
    }
  }

  function actorControlActorDriver(scope: string, instruction: string, args: string[]) {
    if (instruction == 'begin') {
      actorState.value = 'running'
      vehicleStore.setVehicleDoorState('closed')
      vehicleStore.setVehicleSafetyState('safe')
      vehicleStore.setVehicleMotionState('stopped')
      return true
    } else if (instruction == 'end') {
      actorState.value = 'stopped'
      return false
    } else if (instruction == 'repeatif') {
      const [condition, value] = args
      if (condition == 'morestops') {
        if (vehicleStore.vehicleNextStops.length > 1) {
          currentStage.value = parseInt(value)
          return false
        } else return true
      } else return true
    } else if (instruction == 'setdelay') {
      currentDelay.value = parseInt(args[0])
      currentTimeBuildup.value = currentDelay.value * 2
      return true
    }
    return true
  }

  function vehicleControlActorDriver(scope: string, instruction: string, args: string[]) {
    if (scope == 'vmov' && ['moving', 'stopped', 'departing', 'arriving'].includes(instruction)) {
      vehicleStore.setVehicleMotionState(
        instruction as 'moving' | 'stopped' | 'departing' | 'arriving'
      )
    } else if (scope == 'safety' && ['safe', 'unsafe'].includes(instruction)) {
      vehicleStore.setVehicleSafetyState(instruction as 'safe' | 'unsafe')
    } else if (scope == 'doors' && ['opening', 'open', 'closing', 'closed'].includes(instruction)) {
      vehicleStore.setVehicleDoorState(instruction as 'opening' | 'open' | 'closing' | 'closed')
    } else if (scope == 'route') {
      if (instruction == 'nextstop') {
        vehicleStore.progressVehicleStop()
        isSkippingToNextStation.value = false
      } else if (instruction == 'reset') {
        vehicleStore.resetRoute()
      }
    }
    return true
  }

  function callbackAnimation() {
    if (actorState.value == 'running') runActorStep()
    window.requestAnimationFrame(callbackAnimation)
  }

  function setActorState(state: 'stopped' | 'running' | 'paused') {
    actorState.value = state
    const currentPerfNow = performance.now()
    if (state == 'running') {
      lastRunTime.value = currentPerfNow
      window.requestAnimationFrame(callbackAnimation)
    } else if (state == 'stopped') {
      reset()
    } else if (state == 'paused') {
      currentTimeBuildup.value += currentPerfNow - lastRunTime.value
      lastRunTime.value = currentPerfNow
    }
  }

  function skipDelay() {
    currentTimeBuildup.value = currentDelay.value
  }

  function skipToNextStation() {
    isSkippingToNextStation.value = true
  }

  function reset() {
    currentStage.value = 0
    currentTimeBuildup.value = 0
    lastRunTime.value = 0
    currentDelay.value = 0
  }

  return {
    actorProgram,
    actorState,
    currentStage,
    currentActorInstruction,
    isSkippingToNextStation,
    actorProgramProgress,
    actorWaitStateProgress,
    setActorState,
    setActorProgram,
    skipDelay,
    skipToNextStation
  }
})
