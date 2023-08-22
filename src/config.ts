import { Regex, SomeCompanionConfigField } from '@companion-module/base'

export interface KlangConfig {
	label: string
	host: string
	tx_port: number
	type: string
}

export const GetConfigFields = (): SomeCompanionConfigField[] => {
	return [
		{
			type: 'static-text',
			width: 12,
			value: '',
			id: 'info',
			label: '',
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'The IP of the Klang unit',
			width: 12,
			default: '127.0.0.1',
			regex: Regex.IP,
		},
		{
			type: 'number',
			id: 'tx_port',
			label: 'Sending port',
			width: 6,
			default: 9110,
			min: 1,
			max: 65535,
			step: 1,
		},
		{
			type: 'dropdown',
			id: 'type',
			label: 'Klang device',
			width: 6,
			default: 'vokal',
			choices: [
				{
					id: 'vokal',
					label: 'KLANG:vokal',
				},
				{
					id: 'konductor',
					label: 'KLANG:konductor',
				},
				{
					id: 'dmi',
					label: 'DMI-KLANG',
				},
			],
		},
	]
}
