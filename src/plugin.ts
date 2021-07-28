import { App, ItemView, Modal, Notice, Plugin, PluginSettingTab, Setting, ViewCreator } from 'obsidian';
import { VeramoPluginSettings } from './types'
import { VeramoModal } from './modal'
import { SettingTab } from './settings'
import { VeramoView } from './view'

const DEFAULT_SETTINGS: VeramoPluginSettings = {
	agentUrl: '',
	apiKey: ''
}

export class VeramoPlugin extends Plugin {
	settings: VeramoPluginSettings;
  view: ItemView

	async onload() {
		console.log('loading plugin veramo');

		await this.loadSettings();

		this.addRibbonIcon('dice', 'Veramo', () => {
			new Notice('This is a veramo noticeeees!');
		});

		this.addStatusBarItem().setText('Hello veramo');

		this.addCommand({
			id: 'open-veramo-modal',
			name: 'Import credentials',
			// callback: () => {
			// 	console.log('Simple Callback');
			// },
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						new VeramoModal(this.app, this.settings).open();
					}
					return true;
				}
				return false;
			}
		});


		this.addSettingTab(new SettingTab(this.app, this));
    this.registerView('veramo', (leaf) => (this.view = new VeramoView(leaf)))

		this.registerCodeMirror((cm: CodeMirror.Editor) => {
			console.log('codemirror', cm);
		});

		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}




