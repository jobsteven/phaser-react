// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-12 16:14:17
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-13 15:35:54 by {{last_modified_by}}
//  Description: db4phaser-router
//
// //////////////////////////////////////////////////////////////////////////////

import PhaserComponent from './phaser_component';

class PhaserNavigator {
  constructor() {
    PhaserComponent._navigator = this;
  }

  init() {
    PhaserComponent._game = this.game;
  }

  update() {

  }

  _com_regs = {}
  _com_idx = ''
  _com_stack = []

  reg(com_id, Component) {
    this._com_regs[com_id] = Component
  }

  async goto(target_com_idx) {
    if (this._com_idx === target_com_idx) {
      console.warn('goto is the same.')
      return
    }

    const target_ids = target_com_idx.split('/').filter(i => i)

    if (!target_ids.length) {
      console.warn('goto is empty and be ignored.')
      return
    }

    if (!this._com_stack.length) {
      await this._createComponents(...target_ids)
      console.log('phaser_navigator - empty', this._com_idx, '->', target_com_idx);
      this._com_idx = target_com_idx
      return
    }

    let diff_index = -1

    for (let i = 0; i < target_ids.length; i++) {
      const target_id = target_ids[i]
      const current_id = this._com_stack[i].com_id

      if (target_id !== current_id) {
        diff_index = i
        break
      }
    }

    if (diff_index === -1 && this._com_stack.length > this._com_idx.length) {
      diff_index = this._com_idx.length
    }

    await this._destoryComponents(...this._com_stack.splice(diff_index))
    await this._createComponents(...target_ids.slice(diff_index))

    console.log('phaser_navigator', this._com_idx, '->', target_com_idx);
    this._com_idx = target_com_idx
  }

  async _createComponents(...com_idx) {
    if (!com_idx.length) return

    try {
      for (let i = 0; i < com_idx.length; i++) {
        const com_id = com_idx[i]

        const PhaserComponentClass = this._com_regs[com_id];

        const phaser_component = new PhaserComponentClass();

        if (phaser_component.preload) {
          phaser_component.preload();

          this.game.load.start();

          await this._cacheComplete();
        }

        if (phaser_component.create) {
          phaser_component.create();
        }

        this._com_stack.push({ com_id, com: phaser_component })
      }
    } catch (e) {
      console.error('phaser_navigator create component errors', e)
    }
  }

  async _destoryComponents(...coms) {
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
    return new Promise((res) => {
      this.game.load.onLoadComplete.addOnce(res);
    })
  }

}

export default PhaserNavigator
