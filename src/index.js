/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// require('../node_modules/office-ui-fabric-js/dist/css/fabric.min.css');
// require('../node_modules/office-ui-fabric-js/dist/css/fabric.components.css'); 
// require('../app.css');
require('../node_modules/jquery/dist/jquery.js'); 
require('../node_modules/jquery-ui/jquery-ui.min.js');
require('../node_modules/office-ui-fabric-js/dist/js/fabric.js');

import { views } from './views.js';
import { vlink } from './vlink.js';
'use strict';

(function () {
    Office.onReady(function () {
        $(document).ready(function () {
            views.init();    
            vlink.init();
        });

    });

    Office.initialize = function(reason){
    };

})();

