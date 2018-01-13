// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-02 20:54:54
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-13 14:55:40 by {{last_modified_by}}
//  Description: futuquant-main
//
// //////////////////////////////////////////////////////////////////////////////

import PhaserComponent from './phaser_component';

module.exports = class D extends PhaserComponent {
  create() {
    this.text = this.game.add.text(600, 600, 'D', {
      fontSize: 364,
      backgroundColor: 'white'
    })
    console.log('D Create');

  }

  shutdown() {
    console.log('D shutdown');
    this.game.world.remove(this.text)
  }
}
