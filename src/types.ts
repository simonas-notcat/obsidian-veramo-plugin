import { UniqueVerifiableCredential } from "@veramo/data-store";

export interface VeramoPluginSettings {
	agentUrl: string;
	apiKey: string;
}

export type VerifiableCredentialToMarkdown = (vc: UniqueVerifiableCredential) => string
