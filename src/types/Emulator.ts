import { type Component } from 'vue'

export interface Emulator {
  id: string
  name: string
  description: string
  type: 'led' | 'display' | 'other'
  disabled?: boolean
  colour: string
  component: Component
  configcomponent?: Component
}
