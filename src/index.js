// //////////////////////////////////////////////////////////////////////////////
//  Copyright (C) 2016-present
//  Licensed under the The MIT License (MIT)
//  https://choosealicense.com/licenses/mit/
//
//  Github Home: https://github.com/AlexWang1987
//  Author: alexwong
//  Date: 2018-01-02 20:48:31
//  Email: 1669499355@qq.com
//  Last Modified time: 2018-01-02 21:54:03 by {{last_modified_by}}
//  Description: futuquant-index
//
// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////
//
//  Copyright (C) 2016-present  All Rights Reserved.
//  Licensed under the Apache License, Version 2.0 (the "License");
//  http://www.apache.org/licenses/LICENSE-2.0
//
//  Github Home: https://github.com/AlexWang1987
//  Author: AlexWang
//  Date: 2017-03-17 11:13:14
//  QQ Email: 1669499355@qq.com
//  Last Modified time: 2018-01-02 20:45:31 by {{last_modified_by}}
//  Description: wbp-init-umd-main
//
// //////////////////////////////////////////////////////////////////////////////
// if (WBP_DEV && module.hot) { module.hot.accept(); }

import MainScene from 'main';

const gameApp = new Phaser.Game(1920, 1080, Phaser.AUTO, 'stage')
gameApp.state.add('main', MainScene);
gameApp.state.start('main')

dragonBones.PhaserFactory.init(gameApp);
