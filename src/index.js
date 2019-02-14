/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */



'use strict';

(function () {
    if (process.env.NODE_ENV !== 'production') {
        console.log('Looks like we are in development mode!');
    }
    Office.onReady(function () {
        $(document).ready(function () {
            views.init();    
            vlink.init();
        });

    });

    Office.initialize = function(reason){
    };

})();

