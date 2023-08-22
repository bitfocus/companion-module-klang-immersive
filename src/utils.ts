import { InstanceBase } from '@companion-module/base'
import { OSCResponse } from './osc'

export interface InstanceBaseExt<TConfig> extends InstanceBase<TConfig> {
	config: TConfig
	OSC: any

	InitVariables(): void
	UpdateVariablesValues(): void
	ReceiveOSCResponse(data: OSCResponse): void
}
