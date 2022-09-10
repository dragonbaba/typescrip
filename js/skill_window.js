"use strict";
import {Window_Base} from './js/rmmz_windows.js';
//
//创建一个窗口
class skillWindow extends Window_Selectable {
    constructor() {
        super(0, 0, 240, Graphics.boxHeight);
        this.refresh();
        this.activate();
        this.select(0);
    }
    maxItems() {
        return $gameParty.skills().length;
    }
    item() {
        return $gameParty.skills()[this.index()];
    }
    drawItem(index) {
        const skill = $gameParty.skills()[index];
        const rect = this.itemRectForText(index);
        this.changePaintOpacity(this.isEnabled(skill));
        this.drawText(skill.name, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
    isEnabled(skill) {
        return $gameParty.skillIsUsable(skill.id);
    }
    isCurrentItemEnabled() {
        return this.isEnabled(this.item());
    }
    processOk() {
        if (this.isCurrentItemEnabled()) {
            this.playOkSound();
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        }
        else {
            this.playBuzzerSound();
        }
    }
}
//创建一个场景
class Scene_Skill extends Scene_MenuBase {
    constructor() {
        super();
    }
    create() {
        super.create();
        this.createHelpWindow();
        this.createSkillWindow();
    }
    createSkillWindow() {
        const rect = this.skillWindowRect();
        this._skillWindow = new skillWindow();
        this._skillWindow.setHelpWindow(this._helpWindow);
        this._skillWindow.x = rect.x;
        this._skillWindow.y = rect.y;
        this._skillWindow.width = rect.width;
        this._skillWindow.height = rect.height;
        this.addWindow(this._skillWindow);
    }
    skillWindowRect() {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth;
        const wh = this.mainAreaHeight();
        return new Rectangle(wx, wy, ww, wh);
    }
    mainAreaTop() {
        return this._helpWindow.height;
    }
    mainAreaHeight() {
        return Graphics.boxHeight - this.mainAreaTop();
    }
    onSkillOk() {
        this.actor().setLastMenuSkill(this.item());
        this.determineItem();
    }
    onSkillCancel() {
        this.popScene();
    }
    item() {
        return this._skillWindow.item();
    }
    user() {
        return this.actor();
    }
    playSeForItem() {
        SoundManager.playUseSkill();
    }
    useItem() {
        super.useItem();
        this._skillWindow.refresh();
        this._skillWindow.activate();
    }
}    
//创建一个菜单
class Window_MenuCommand extends Window_Command {
    addMainCommands() {
        this.addCommand(TextManager.item, 'item');
        this.addCommand(TextManager.skill, 'skill');
    }
}
let indenpendentitem={
    item1:[],
    item2:[],
    item3:[],
    item4:[],
}
indenpendentitem.item1=$dataItems;
indenpendentitem.item2=$dataSkills;
indenpendentitem.item3=$dataWeapons;
indenpendentitem.item4=$dataArmors;
