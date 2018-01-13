// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-02 20:54:54
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-13 20:08:07 by {{last_modified_by}}
//  Description: futuquant-main
//
// //////////////////////////////////////////////////////////////////////////////

import PhaserComponent from './phaser_component';

module.exports = class D extends PhaserComponent {

  init(data) {
    console.log('D->init', data);
  }

  create() {
    this.text = this.add.text(600, 600, 'D', {
      fontSize: 364,
      backgroundColor: 'white'
    })
    console.log('D Create');
  }

  // update() {
  //   console.log('I am D');
  // }

  shutdown() {
    console.log('D shutdown');
    this.world.remove(this.text)
    // return new Promise((res) => {
    //   setTimeout(res, 4000)
    // })
  }
}
