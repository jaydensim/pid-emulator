import WaratahEmulator from './WaratahEmulator.vue'
import WaratahEmulatorConfig from './WaratahEmulatorConfig.vue'

const emulator = {
  id: 'sydneytrains:waratah1',
  name: 'Sydney Trains - Waratah Series 1',
  description: 'PID Emulator for the Waratah trains in Sydney.',
  type: 'led',
  colour: 'FF7A00',
  component: WaratahEmulator
  //configcomponent: WaratahEmulatorConfig
}

export default emulator
