// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-02 20:54:54
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-16 11:47:18 by {{last_modified_by}}
//  Description: futuquant-main
//
// //////////////////////////////////////////////////////////////////////////////

import phaser_react from '../index.js';

module.exports = class C extends phaser_react.PhaserComponent {

  init(data) {
    console.log('C->init', data);

  }

  password = null
  scalex = 0.1

  create() {
    this.container = this.add.group();

    this.container.x = this.game.width / 2
    this.container.y = this.game.height / 2

    const password = this.add.text(0, 0, 'C', {
      fontSize: 364,
      backgroundColor: 'white'
    })
    this.container.addChild(password)

    this.container.pivot.x = this.container.width / 2
    this.container.pivot.y = this.container.height / 2

    this.container.scale.set(this.scalex)

    this.add.tween(this.container.scale).to({ x: 1, y: 1 }, 1500, null, true)

    console.log('C Create');
  }

  shutdown() {
    console.log('C shutdown');
    this.world.remove(this.password)
  }
}
