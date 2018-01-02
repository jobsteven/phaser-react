// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-02 20:54:54
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-02 22:04:35 by {{last_modified_by}}
//  Description: futuquant-main
//
// //////////////////////////////////////////////////////////////////////////////

import Dragon from './dragon';

module.exports = class MainScene extends Phaser.State {
  constructor(game) {
    super(game);
  }

  preload() {
    this.bg = new Dragon('TwoTeachers')

  }

  create() {
    this.world.add(this.bg);

    this.bg.x = 960;
    this.bg.y = 670;
    this.bg.play('entrance', 1);

    this.bg.addEvent(dragonBones.EventObject.COMPLETE, this.entranAniComplete.bind(this))
  }

  entranAniComplete(evt) {
    // console.log(evt.animationState.name, evt.armature);
    this.bg.play('stand');
  }

  shutdown() {
    //
  }

  render() {
    dragonBones.PhaserFactory.factory.dragonBones.advanceTime(-1);
  }
}
