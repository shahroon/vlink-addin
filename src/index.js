/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */



'use strict';

(function () {
    Office.onReady(function () {
        // Office is ready

        $(document).ready(function () {
            // The document is ready

// INTIALIZE CODE STARTS HERE
            vlink.init();
            views.init();
            // $('#vlink_sign_in').show();
            // $(views.sign_in.button).click(function(){
            //     vlink.sign_in_request($(views.sign_in.email_input).val(), $(views.sign_in.password_input).val());     
            // });  
// INTIALIZE CODE ENDS HERE

        });

    });

    Office.initialize = function(reason){
        // MOVE INTIALIZE CODE HERE
        // vlink.init();
        // $('#vlink_sign_in').show();
        // $(views.sign_in.button).click(function(){
        //     vlink.sign_in_request($(views.sign_in.email_input).val(), $(views.sign_in.password_input).val());     
        // });  
    };

})();

