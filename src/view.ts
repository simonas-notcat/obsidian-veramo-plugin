import { ItemView } from 'obsidian';

export class VeramoView extends ItemView {
  constructor(leaf: any) {
    super(leaf);
    console.log('heeeere')
  }

  getViewType() {
    return 'veramo';
  }
  getDisplayText() {
      return "Veramo";
  }
  getIcon() {
      return "calendar-with-checkmark";
}
}