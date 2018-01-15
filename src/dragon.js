// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-02 19:28:46
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-15 16:33:23 by {{last_modified_by}}
//  Description: DragonSprite
//
// //////////////////////////////////////////////////////////////////////////////
let dragWorldLoopTimer;
let drivenDragons = 0;

export default class Dragon extends Phaser.Sprite {

  static startLoop(dragon, world, yes) {
    yes ? drivenDragons++ : drivenDragons--;

    if (yes && !dragWorldLoopTimer) {
      dragWorldLoopTimer = dragonBones.PhaserFactory._game.time.events.loop(1, () => {
        dragonBones.PhaserFactory.factory.dragonBones.advanceTime(1 / 60);
      });
    }

    // TIMERS
    const timerEvents = dragonBones.PhaserFactory._game.time.events.events;

    // REFERS
    // console.log('drivenDragons', drivenDragons)

    // YES
    if (yes) {
      if (!timerEvents.find(item => item === dragWorldLoopTimer)) {
        timerEvents.push(dragWorldLoopTimer);
      }
      return
    }

    // NO
    if (dragWorldLoopTimer && drivenDragons <= 0 &&
      timerEvents.find(item => item === dragWorldLoopTimer)) {
      timerEvents.splice(timerEvents.indexOf(dragWorldLoopTimer))
    }
  }

  constructor(res_id, base_path = '../dragons/') {
    super(dragonBones.PhaserFactory._game, 0, 0);

    if (!res_id) {
      throw new Error('dragon res_id is required!')
    }

    this._dragonFactory = dragonBones.PhaserFactory.factory;

    this.res_id = res_id;
    this.res_ske_id = `${res_id}_ske.json`;

    this.events.onAddedToGroup.addOnce(Dragon.startLoop, Dragon, 0, true);
    this.events.onRemovedFromGroup.addOnce(Dragon.startLoop, Dragon, 0, false);

    if (!this.game.cache.checkJSONKey(this.res_ske_id)) {

      this.res_ske_path = `${base_path}${this.res_ske_id}`;

      this.res_tex_id = `${res_id}_tex.json`;
      this.res_text_path = `${base_path}${this.res_tex_id}`;

      this.res_raw_id = `${res_id}_tex.png`;
      this.res_raw_path = `${base_path}${this.res_raw_id}`;

      return this._loadDragonBones();
    }

    this._prepareArmatureDisplay();
  }

  _loadDragonBones() {
    this.game.load.pack(this.res_id, null, {
      [this.res_id]: [{
        type: 'image',
        key: this.res_raw_id,
        url: this.res_raw_path,
        overwrite: false
      }, {
        type: 'json',
        key: this.res_ske_id,
        url: this.res_ske_path,
        overwrite: false
      }, {
        type: 'json',
        key: this.res_tex_id,
        url: this.res_text_path,
        overwrite: false
      }]
    })
    this.game.load.onLoadComplete.addOnce(this._loadDragonBonesComplete, this);
  }

  _loadDragonBonesComplete() {
    this._parseBragonBones();
    this._prepareArmatureDisplay();
  }

  _prepareArmatureDisplay() {
    const _armatureDisplay = this._dragonFactory.buildArmatureDisplay(this.res_id);
    this.addChild(_armatureDisplay);
    this.armatureDisplay = _armatureDisplay;
  }

  _parseBragonBones() {
    try {
      this._dragonFactory.parseDragonBonesData(this.game.cache.getJSON(this.res_ske_id))
      this._dragonFactory.parseTextureAtlasData(
        this.game.cache.getJSON(this.res_tex_id),
        this.game.cache.getImage(this.res_raw_id, true).base
      );
    } catch (error) {
      console.error('dragon data parse erorr', error)
    }
  }

  set armatureDisplay(_armatureDisplay) {
    this._armatureDisplay = _armatureDisplay
  }

  get armatureDisplay() {
    if (!this._armatureDisplay) {
      throw new Error('dragon armatureDisplay object has not been initialized.')
    }
    return this._armatureDisplay
  }

  play(...args) {
    this.armatureDisplay.animation.play(...args);
  }

  gotoAndPlay(...args) {
    this.armatureDisplay.animation.gotoAndPlay(...args);
  }

  gotoAndPlayByFrame(...args) {
    this.armatureDisplay.animation.gotoAndPlayByFrame(...args);
  }

  once(...args) {
    args._origin = args[1];
    args[1] = (...evtargs) => {
      this.removeEvent(...args);
      args._origin.apply(args[2] || null, evtargs)
    }
    return this.armatureDisplay.addEvent(...args);
  }

  addEvent(...args) {
    return this.armatureDisplay.addEvent(...args);
  }

  removeEvent(...args) {
    return this.armatureDisplay.removeEvent(...args);
  }
}
