/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

import { views } from './views.js';
import { vlink } from './vlink.js';
import { outlook } from './outlook.js';
'use strict';

Office.onReady(function () {
    $(document).ready(function () {  
        outlook.recipients.zeroRecipient();       
        views.init();    
        vlink.init();

    });

});