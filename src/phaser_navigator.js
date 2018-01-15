// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-12 16:14:17
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-15 16:56:43 by {{last_modified_by}}
//  Description: PhaserNavigator
//
// //////////////////////////////////////////////////////////////////////////////

import PhaserComponent from './phaser_component';

export default class PhaserNavigator {
  constructor() {
    PhaserComponent._navigator = this;
  }

  init() {
    PhaserComponent._game = this.game;
  }

  update() {
    this._com_stack.forEach(({ com }) => com.update && com.update())
  }

  _com_idx = ''
  _com_regs = {}
  _com_stack = []

  reg(com_id, Component) {
    this._com_regs[com_id] = Component
  }

  level(key) {
    const lowerLevels = this._com_stack.filter((com) => com.com_id === key)
    return lowerLevels.length && lowerLevels[0]
  }

  async goto(new_com_idx = '', params) {
    if (this._com_idx === new_com_idx) {
      console.warn('the same path ignored.')
      return
    }

    const new_com_stack = new_com_idx.split('/').filter(i => i)
    if (!new_com_stack.length) {
      // console.warn('goto is empty and be ignored.')
      await this._destoryComponents(this._com_stack.splice(0))
      this._com_idx = new_com_idx
      return
    }

    if (!this._com_idx) {
      await this._createComponents(new_com_stack, params)
      this._com_idx = new_com_idx
      return
    }

    let diff_index = -1

    for (let i = 0; i < new_com_stack.length; i++) {
      const target_id = new_com_stack[i]
      const current_id = this._com_stack[i] && this._com_stack[i].com_id

      if (current_id === undefined || target_id !== current_id) {
        diff_index = i
        break
      }
    }

    if (diff_index === -1) {
      diff_index = new_com_stack.length
    }

    const desComs = this._com_stack.splice(diff_index);
    const creComs = new_com_stack.slice(diff_index)

    await this._destoryComponents(desComs)
    await this._createComponents(creComs, params)

    console.log('phaser_navigator[', this._com_idx, ']->[', new_com_idx, ']');

    this._com_idx = new_com_idx
  }

  async _createComponents(create_com_idx, params = {}) {
    if (!create_com_idx.length) return

    try {
      for (let i = 0; i < create_com_idx.length; i++) {
        const new_com_id = create_com_idx[i]
        const PhaserComponentClass = this._com_regs[new_com_id];

        if (!PhaserComponentClass) throw new Error('this component has not been registered.')

        const phaser_component = new PhaserComponentClass();

        if (phaser_component.init) {
          await phaser_component.init(params);
        }

        if (phaser_component.preload) {
          phaser_component.preload();
          this.game.load.start();
          await this._cacheComplete();
        }

        if (phaser_component.create) {
          phaser_component.create();
        }

        this._com_stack.push({ com_id: new_com_id, com: phaser_component })
      }
    } catch (e) {
      console.error('phaser_navigator create component errors', e)
    }
  }

  async _destoryComponents(coms) {
    if (!coms.length) return

    try {
      for (let i = coms.length - 1; i >= 0; i--) {
        const com = await coms[i].com
        if (com.shutdown) {
          await com.shutdown();
        }
      }
    } catch (e) {
      console.error('Destoring components failed.', e);
    }
  }

  async _cacheComplete() {
    if (!this.game.load.hasLoaded) {
      return new Promise((res) => {
        this.game.load.onLoadComplete.addOnce(res);
      })
    }
  }
}
