// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-02 20:54:54
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-15 17:05:08 by {{last_modified_by}}
//  Description: futuquant-main
//
// //////////////////////////////////////////////////////////////////////////////

import phaser_react from '../index.js';

console.log(phaser_react);

module.exports = class A extends phaser_react.PhaserComponent {
  init(data) {
    console.log('A->init', data);
  }

  preload() {
    this.bg = new phaser_react.Dragon('TwoTeachers')

    // this.load.image('dog', 'http://xxx.dog.png')
    // this.load.music('sexy', 'http://baljdsf.mp3')

  }

  // background image
  bg = null

  // dog
  // dog = null

  create() {

    // this.dog = this.add.image(100, 100, 'dog')

    this.world.add(this.bg);

    this.bg.x = 960;
    this.bg.y = 670;

    this.bg.play('entrance', 1);

    this.bg.addEvent(dragonBones.EventObject.COMPLETE, this.entranAniComplete.bind(this))

    console.log('A Create');
  }

  shutdown() {
    console.log('A shutdown')

    // this.bg.removeEvent(dragonBones.EventObject.COMPLETE, this.entranAniComplete.bind(this))

    this.world.remove(this.bg)
    // this.world.remove(this.dog)

    this.bg = null
    // this.dog = null
  }

  entranAniComplete() {
    this.bg.play('stand');

    // setTimeout(() => {
    //   this.goto('a/b')
    // }, 2000)
  }

}
