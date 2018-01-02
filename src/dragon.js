// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-02 19:28:46
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-02 22:04:16 by {{last_modified_by}}
//  Description: DragonSprite
//
// //////////////////////////////////////////////////////////////////////////////

module.exports = class Dragon extends Phaser.Sprite {
  constructor(res_id, base_path = '') {
    super(dragonBones.PhaserFactory._game, 0, 0);

    this._proxy = null;

    this.res_id = res_id;

    this.res_ske_id = `${res_id}_ske.json`;
    this.res_ske_path = `${base_path}${this.res_ske_id}`;

    this.res_tex_id = `${res_id}_tex.json`;
    this.res_text_path = `${base_path}${this.res_tex_id}`;

    this.res_raw_id = `${res_id}_tex.png`;
    this.res_raw_path = `${base_path}${this.res_raw_id}`;

    this.game.load.pack(res_id, null, {
      [res_id]: [{
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

    this.game.load.onLoadComplete.add(this._loadPackComplete.bind(this));
  }

  _loadPackComplete() {
    const factory = dragonBones.PhaserFactory.factory;

    factory.parseDragonBonesData(this.game.cache.getJSON(this.res_ske_id))
    factory.parseTextureAtlasData(
      this.game.cache.getJSON(this.res_tex_id),
      this.game.cache.getImage(this.res_raw_id, true).base
    );

    this._proxy = factory.buildArmatureDisplay('TwoTeacher');
    this.addChild(this._proxy);
    // removed from displaylist todo
  }

  _destoryProxy() {
    // todo
  }

  play(...args) {
    return this._proxy.animation.play(...args);
  }

  addEvent(...args) {
    return this._proxy.addEvent(...args);
  }
}
