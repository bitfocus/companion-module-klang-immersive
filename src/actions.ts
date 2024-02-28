import { CompanionActionDefinition, CompanionActionDefinitions } from '@companion-module/base'
import { KlangConfig } from './config'
import { InstanceBaseExt } from './utils'

let CHANNEL_CHOICES: { label: string; id: number }[] = []
let MIX_CHOICES: { label: string; id: number }[] = []

const FADER_CHOICES = [
	{ label: '0 db', id: 0 },
	{ label: '-1 db', id: -1 },
	{ label: '-2 db', id: -2 },
	{ label: '-3 db', id: -3 },
	{ label: '-4 db', id: -4 },
	{ label: '-5 db', id: -5 },
	{ label: '-6 db', id: -6 },
	{ label: '-7 db', id: -7 },
	{ label: '-8 db', id: -8 },
	{ label: '-9 db', id: -9 },
	{ label: '-10 db', id: -10 },
	{ label: '-12 db', id: -12 },
	{ label: '-14 db', id: -14 },
	{ label: '-16 db', id: -16 },
	{ label: '-18 db', id: -18 },
	{ label: '-20 db', id: -20 },
	{ label: '-22 db', id: -22 },
	{ label: '-24 db', id: -24 },
	{ label: '-26 db', id: -26 },
	{ label: '-28 db', id: -28 },
	{ label: '-30 db', id: -30 },
	{ label: '-50 db', id: -50 },
	{ label: '-60 db', id: -60 },
	{ label: 'OFF', id: -90 },
]

export enum ActionId {
	Action_SetChannelVolume = 'Action_SetChannelVolume',
	Action_SetMixVolume = 'Action_SetMixVolume',
	Action_SoloChannel = 'Action_SoloChannel',
	Action_MuteChannel = 'Action_MuteChannel',
	Action_SnapshotIdUpdate = 'Action_SnapshotIdUpdate',
	Action_SnapshotCurrentUpdate = 'Action_SnapshotCurrentUpdate',
	Action_SnapshotIdGo = 'Action_SnapshotIdGo',
	Action_SnapshotIndexGo = 'Action_SnapshotIndexGo',
	Action_SnapshotNext = 'Action_SnapshotNext',
	Action_SnapshotPrev = 'Action_SnapshotPrev',
	Action_SnapshotFirst = 'Action_SnapshotFirst',
	Action_MixMode = 'Action_MixMode',
}

export function GetActions(instance: InstanceBaseExt<KlangConfig>): CompanionActionDefinitions {
	if (instance.config.type == 'vokal') {
		MIX_CHOICES = []
		for (let i = 1; i < 13; i++) {
			MIX_CHOICES.push({ label: `Mix ${i}`, id: i })
		}
	} else {
		MIX_CHOICES = []
		for (let i = 1; i < 17; i++) {
			MIX_CHOICES.push({ label: `Mix ${i}`, id: i })
		}
	}

	if (instance.config.type == 'konductor') {
		CHANNEL_CHOICES = []
		for (let i = 1; i < 129; i++) {
			CHANNEL_CHOICES.push({ label: `Channel ${i}`, id: i })
		}
	} else {
		CHANNEL_CHOICES = []
		for (let i = 1; i < 65; i++) {
			CHANNEL_CHOICES.push({ label: `Channel ${i}`, id: i })
		}
	}

	const actions: { [id in ActionId]: CompanionActionDefinition | undefined } = {
		[ActionId.Action_SetChannelVolume]: {
			name: 'Set channel volume',
			options: [
				{
					label: 'Mix number',
					type: 'dropdown',
					id: 'mix',
					default: 1,
					choices: MIX_CHOICES,
				},
				{
					label: 'Channel number',
					type: 'dropdown',
					id: 'channel',
					default: 1,
					choices: CHANNEL_CHOICES,
				},
				{
					label: 'fader value',
					type: 'dropdown',
					id: 'fader',
					default: -60,
					choices: FADER_CHOICES,
				},
			],
			callback: (action): void => {
				if (instance.OSC)
					instance.OSC.sendCommand(`/Kf/ui/${action.options.mix}/ch/${action.options.channel}/gaindB`, [
						{ type: 'f', value: action.options.fader },
					])
			},
		},
		[ActionId.Action_SetMixVolume]: {
			name: 'Set mix volume',
			options: [
				{
					label: 'Mix number',
					type: 'dropdown',
					id: 'mix',
					default: 1,
					choices: MIX_CHOICES,
				},
				{
					label: 'fader value',
					type: 'dropdown',
					id: 'fader',
					default: -60,
					choices: FADER_CHOICES,
				},
			],
			callback: (action): void => {
				if (instance.OSC)
					instance.OSC.sendCommand(`/Kf/ui/${action.options.mix}/gaindB`, [{ type: 'f', value: action.options.fader }])
			},
		},
		[ActionId.Action_SoloChannel]: {
			name: 'Solo channel',
			options: [
				{
					label: 'Mix number',
					type: 'dropdown',
					id: 'mix',
					default: 1,
					choices: MIX_CHOICES,
				},
				{
					label: 'Channel number',
					type: 'dropdown',
					id: 'channel',
					default: 1,
					choices: CHANNEL_CHOICES,
				},
				{
					label: 'Solo on/off',
					type: 'dropdown',
					id: 'solo',
					default: 'T',
					choices: [
						{ label: 'on', id: 'T' },
						{ label: 'off', id: 'F' },
					],
				},
			],
			callback: (action): void => {
				if (instance.OSC)
					instance.OSC.sendCommand(`/Kf/ui/${action.options.mix}/ch/${action.options.channel}/solo`, [
						{ type: action.options.solo },
					])
			},
		},
		[ActionId.Action_MuteChannel]: {
			name: 'Mute channel',
			options: [
				{
					label: 'Mix number',
					type: 'dropdown',
					id: 'mix',
					default: 1,
					choices: MIX_CHOICES,
				},
				{
					label: 'Channel number',
					type: 'dropdown',
					id: 'channel',
					default: 1,
					choices: CHANNEL_CHOICES,
				},
				{
					label: 'Mute on/off',
					type: 'dropdown',
					id: 'mute',
					default: 'T',
					choices: [
						{ label: 'on', id: 'T' },
						{ label: 'off', id: 'F' },
					],
				},
			],
			callback: (action): void => {
				console.log('Options', action.options)
				if (instance.OSC)
					instance.OSC.sendCommand(`/Kf/ui/${action.options.mix}/ch/${action.options.channel}/mute`, [
						{ type: action.options.mute },
					])
			},
		},
		[ActionId.Action_MixMode]: {
			name: 'Mix mode',
			options: [
				{
					label: 'Mix number',
					type: 'dropdown',
					id: 'mix',
					default: 1,
					choices: MIX_CHOICES,
				},
				{
					label: 'Mode',
					type: 'dropdown',
					id: 'mode',
					default: 3,
					choices: [
						{ label: 'Mono', id: 1 },
						{ label: 'Stereo', id: 2 },
						{ label: '3D', id: 3 },
						{ label: 'i3D', id: 4 },
					],
				},
			],
			callback: (action): void => {
				console.log('Options', action.options)
				if (instance.OSC)
					instance.OSC.sendCommand(`/Kf/ui/${action.options.mix}/mode`, [{ type: 'i', value: action.options.mode }])
			},
		},
		[ActionId.Action_SnapshotIdUpdate]: {
			name: 'Update snapshot by ID',
			options: [
				{
					label: 'Snapshot ID',
					type: 'number',
					id: 'snapshot',
					default: 1,
					min: 1,
					max: 100,
				},
			],
			callback: (action): void => {
				if (instance.OSC)
					instance.OSC.sendCommand('/Kf/co/updateSnaphot', [{ type: 'i', value: action.options.snapshot }])
			},
		},
		[ActionId.Action_SnapshotCurrentUpdate]: {
			name: 'Update current snapshot',
			options: [],
			callback: (): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Kf/co/updateSnaphot')
			},
		},
		[ActionId.Action_SnapshotIdGo]: {
			name: 'Fire snapshot by ID',
			options: [
				{
					label: 'Snapshot ID',
					type: 'number',
					id: 'snapshot',
					default: 1,
					min: 1,
					max: 100,
				},
			],
			callback: (action): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Kf/co/recall', [{ type: 'i', value: action.options.snapshot }])
			},
		},
		[ActionId.Action_SnapshotIndexGo]: {
			name: 'Fire snapshot by Position',
			options: [
				{
					label: 'Snapshot Index',
					type: 'number',
					id: 'snapshot',
					default: 1,
					min: 1,
					max: 100,
				},
			],
			callback: (action): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Kf/co/recallInd', [{ type: 'i', value: action.options.snapshot }])
			},
		},
		[ActionId.Action_SnapshotNext]: {
			name: 'Fire next snapshot',
			options: [],
			callback: (): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Kf/co/recallNext')
			},
		},
		[ActionId.Action_SnapshotPrev]: {
			name: 'Fire previous snapshot',
			options: [],
			callback: (): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Kf/co/recallPrev')
			},
		},
		[ActionId.Action_SnapshotFirst]: {
			name: 'Fire previous snapshot',
			options: [],
			callback: (): void => {
				if (instance.OSC) instance.OSC.sendCommand('/Kf/co/recallFirst')
			},
		},
	}

	return actions
}
