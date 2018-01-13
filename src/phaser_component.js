// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-12 18:08:20
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-13 11:50:38 by {{last_modified_by}}
//  Description: db4phaser-PhaserComponent
//
// //////////////////////////////////////////////////////////////////////////////

export default class PhaserComponent {
  constructor() {
    this._children = []
  }

  get game() {
    return PhaserComponent._game
  }

  goto(...args) {
    return PhaserComponent._navigator.goto(...args)
  }
}
