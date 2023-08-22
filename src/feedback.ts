import { CompanionFeedbackDefinitions, CompanionFeedbackDefinition } from '@companion-module/base'
export enum FeedbackId {}

export function GetFeedbacks(): CompanionFeedbackDefinitions {
	const feedbacks: { [id in FeedbackId]: CompanionFeedbackDefinition | undefined } = {}
	return feedbacks
}
