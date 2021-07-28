import { App, Modal } from 'obsidian';
import { VeramoPluginSettings, VerifiableCredentialToMarkdown } from './types';
import { getRemoteAgent } from './agent';
import { TAgent } from '@veramo/core';
import { IDataStoreORM, UniqueVerifiableCredential } from '@veramo/data-store';
import { stringify } from 'yaml'
import { VerifiableSocialPosting } from './vc-templates/VerifiableSocialPosting'
import { VerifiableCredential } from './vc-templates/VerifiableCredential'

const templates: Record<string, VerifiableCredentialToMarkdown> = {
  'VerifiableCredential,VerifiableSocialPosting': VerifiableSocialPosting,
  'VerifiableCredential': VerifiableCredential,
}

export class VeramoModal extends Modal {
  settings: VeramoPluginSettings
  agent: TAgent<IDataStoreORM>

	constructor(app: App, settings: VeramoPluginSettings) {
		super(app);
    this.settings = settings
    this.agent = getRemoteAgent(this.settings.agentUrl, this.settings.apiKey)
	}
  
	async onOpen() {
    let {contentEl} = this;
    console.log(this.settings, '2')
		contentEl.setText('Importing from' + this.settings.agentUrl);
    const count = await this.agent.dataStoreORMGetVerifiableCredentialsCount()
		contentEl.setText(`Credential count: 0/${count}`);
    const credentials = await this.agent.dataStoreORMGetVerifiableCredentials()
    let importedCredentialsMarkdown = ''
    credentials.forEach((vc, index) => {
      contentEl.setText(`Credential count: ${index}/${count}`);
      const name = vc.verifiableCredential.type.join(',')
      const markdownTemplate = templates[name] || templates['VerifiableCredential']
      const markdown = markdownTemplate(vc)
      console.log(`writing ${vc.hash}`)
      const filename = 'Veramo/' + vc.hash + '.md'
      this.app.vault.create(filename, markdown)
      importedCredentialsMarkdown += `![[${filename}|${name}]]\n`
    })

    this.app.vault.create('Veramo/import.md', importedCredentialsMarkdown)



	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}
}