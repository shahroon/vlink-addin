/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */



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

