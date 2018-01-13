// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-02 20:54:54
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-13 18:06:35 by {{last_modified_by}}
//  Description: futuquant-main
//
// //////////////////////////////////////////////////////////////////////////////

import Dragon from './dragon';
import PhaserComponent from './phaser_component';

module.exports = class A extends PhaserComponent {
  init(data) {
    console.log('A->init', data);
  }

  preload() {
    this.bg = new Dragon('TwoTeachers')
  }

  create() {
    this.game.world.add(this.bg);

    this.bg.x = 960;
    this.bg.y = 670;

    this.bg.play('entrance', 1);

    this.bg.addEvent(dragonBones.EventObject.COMPLETE, this.entranAniComplete.bind(this))

    console.log('A Create');
  }

  shutdown() {
    console.log('A shutdown')
    this.game.world.remove(this.bg)
  }

  entranAniComplete() {
    this.bg.play('stand');

    // setTimeout(() => {
    //   this.goto('a/b/c', { a: 'av', b: 'bv' })
    // }, 2000)
  }
}
