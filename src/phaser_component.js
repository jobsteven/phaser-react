// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-12 18:08:20
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-15 11:37:33 by {{last_modified_by}}
//  Description: PhaserComponent
//
// //////////////////////////////////////////////////////////////////////////////

export default class PhaserComponent {
  get game() {
    return PhaserComponent._game
  }

  get add() {
    return this.game.add
  }

  get make() {
    return this.game.make
  }

  get camera() {
    return this.game.camera
  }

  get cache() {
    return this.game.cache
  }

  get input() {
    return this.game.input
  }

  get load() {
    return this.game.load
  }

  get math() {
    return this.game.math
  }

  get sound() {
    return this.game.sound
  }

  get scale() {
    return this.game.scale
  }

  get stage() {
    return this.game.stage
  }

  get time() {
    return this.game.time
  }

  get tweens() {
    return this.game.tweens
  }

  get world() {
    return this.game.world
  }

  get particles() {
    return this.game.particles
  }

  get rnd() {
    return this.game.rnd
  }

  get physics() {
    return this.game.physics
  }

  goto(...args) {
    return PhaserComponent._navigator.goto(...args)
  }

  level(key) {
    return PhaserComponent._navigator.level(key)
  }

  // init , preload, create, update , shutdown
}
