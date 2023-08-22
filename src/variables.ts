import { CompanionVariableDefinition, CompanionVariableValues } from '@companion-module/base'
import { KlangConfig } from './config'
import { InstanceBaseExt } from './utils'

export function updateVariables(instance: InstanceBaseExt<KlangConfig>): void {
	const variables: CompanionVariableValues = {}
	instance.setVariableValues(variables)
}

export function initVariables(instance: InstanceBaseExt<KlangConfig>): void {
	const globalSettings: Set<CompanionVariableDefinition> = new Set([])
	const filteredVariables = [...globalSettings]
	instance.setVariableDefinitions(filteredVariables)
}
