import { InstanceBase, InstanceStatus, runEntrypoint, SomeCompanionConfigField } from '@companion-module/base'
import { GetConfigFields, KlangConfig } from './config'
import { GetActions } from './actions'
import { GetFeedbacks } from './feedback'
import { GetPresetList } from './presets'
import { initVariables, updateVariables } from './variables'
import { OSC } from './osc'
import { getUpgrades } from './upgrade'

class KlangInstance extends InstanceBase<KlangConfig> {
	public config: KlangConfig = {
		label: '',
		host: '',
		tx_port: 0,
		type: '',
	}

	public OSC: OSC | null = null

	constructor(internal: unknown) {
		super(internal)
		this.instanceOptions.disableVariableValidation = true
	}

	public async configUpdated(config: KlangConfig): Promise<void> {
		this.log('info', 'Starting')
		this.config = config
		this.saveConfig(config)
		this.log('info', 'Updating config!')
		if (this.OSC) this.OSC.destroy()
		this.OSC = new OSC(this)
		this.updateInstance()
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	public async init(config: KlangConfig): Promise<void> {
		this.log('info', `Welcome, Klang module is being initialized`)
		await this.configUpdated(config)
	}

	async destroy() {
		this.log('debug', `Instance destroyed: ${this.id}`)
		this.OSC?.destroy()
	}

	public updateInstance(): void {
		initVariables(this)
		updateVariables(this)

		this.setActionDefinitions(GetActions(this))
		this.setFeedbackDefinitions(GetFeedbacks())
		this.setPresetDefinitions(GetPresetList())
	}

	public InitVariables(): void {
		initVariables(this)
	}

	public UpdateVariablesValues(): void {
		updateVariables(this)
	}

	public ReceiveOSCResponse(): void {
		this.updateStatus(InstanceStatus.Ok)
		this.UpdateVariablesValues()
	}
}

runEntrypoint(KlangInstance, getUpgrades())
