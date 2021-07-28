import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { VeramoPlugin } from './plugin'

export class SettingTab extends PluginSettingTab {
	plugin: VeramoPlugin;

	constructor(app: App, plugin: VeramoPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		// containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Agent URL')
			.setDesc('https://example.com/agent')
			.addText(text => text
				.setPlaceholder('Enter your agent URL')
				.setValue(String(this.plugin.settings.agentUrl))
				.onChange(async (value) => {
					console.log('URL: ' + value);
					this.plugin.settings.agentUrl = value;
					await this.plugin.saveSettings();
				}));
		new Setting(containerEl)
			.setName('API key')
			.setDesc('Secret API key')
			.addText(text => text
				.setPlaceholder('Enter your API key')
				.setValue(String(this.plugin.settings.apiKey))
				.onChange(async (value) => {
					console.log('API key: ' + value);
					this.plugin.settings.apiKey = value;
					await this.plugin.saveSettings();
				}));
		}
}