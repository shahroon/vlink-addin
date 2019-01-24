views = {
    dialog: {
        close_button_selector: '.vlink-close-btn',

        modal: {
            selector: '#vlink-modalDialog',
            too_many_recipients_selector: '#vlink-error-too-many-emails',

            init: function(){
                $(views.dialog.modal.selector + ' ' + views.dialog.close_button_selector).click(function(){
                    views.remove_too_many_recipients_modal_box();
                })
            }
        }
    },

    button: {
        html: "<div id='insert-video-btn' class='wG J-Z-I' command='' data-tooltip='vLink - Insert Content‬' aria-label='Insert Video‬' role='button' aria-pressed='false' aria-haspopup='true' aria-expanded='false' style='-webkit-user-select: none;' ></div>",
        selector: '#insert-video-btn'
    },

    status_bar: {
        element_selector: '#status-bar'
    },

    new_message_status_bar: {
        selector: '#status-bar-compose',

        init: function(){
            var status_bar = $(views.status_bar.element_selector).clone();
            status_bar.attr('id', views.new_message_status_bar.selector.split('#')[1]);
            status_bar.val('');
            $(gmail.compose_message.content_table_body_selector).prepend($("<tr></tr>").append($("<td></td>").append(status_bar)));
        }
    },

    show_message: function(status_bar, message){
        var type = message.type;

        status_bar.empty().append(message.text);
        status_bar.addClass(type);
        views.show(status_bar);

        window.setTimeout(function(){
            views.hide(status_bar);
            window.setTimeout(function(){status_bar.removeClass(type);}, 500)
        }, 3000);
    },

    show_too_many_recipients_modal_box: function(){
        $(views.dialog.modal.too_many_recipients_selector).css('left', (window.innerWidth/2 - 210) + 'px');
        $(views.dialog.modal.too_many_recipients_selector).css('top', (window.innerHeight/3 - 70) + 'px');

        views.show(views.dialog.modal.selector);
        views.show(views.dialog.modal.too_many_recipients_selector);
    },

    remove_too_many_recipients_modal_box: function(){
        views.hide(views.dialog.modal.too_many_recipients_selector);
        views.hide(views.dialog.modal.selector);
    },

    sign_in: {
        selector: '#vlink_sign_in',
        button: '#signin-button',
        cancel_button: '#signin-cancel-button',
        email_input: '#email-input',
        password_input: '#password-input',
        status_bar: '#vlink-sign-in-status-bar',

        init: function(){
            $(views.sign_in.button).click(function(){
                vlink.sign_in_request($(views.sign_in.email_input).val(), $(views.sign_in.password_input).val());     
            });    
            $(views.sign_in.cancel_button).click(function(){
                $(views.sign_in.email_input).val('');
                $(views.sign_in.password_input).val('');
                views.sign_in.hide();
            });

            $(views.sign_in.selector).css('left', (window.innerWidth/2 - 125) + 'px');
            $(views.sign_in.selector).css('top', (window.innerHeight/3 - 100) + 'px');

            $(views.sign_in.selector).draggable();
        },

        hide: function(){
            views.hide($(views.sign_in.selector));
        }
    },

    video_select: {
        selector: '#vlink-video-select',
        title_field_selector: '#vlink-video-title',
        insert_button_selector: '#insert-video-button',
        cancel_button_selector: '#video-select-cancel-button',
        preview_button_selector: '#preview-button',
        search_selector: '#videos-search',
        status_bar_selector: '#vlink-video-select-status-bar',

        dropdown: {
            selector: '#videos-dropdown',

            init: function(){
                $(views.video_select.dropdown.selector).selectmenu({
                    change: function(event, ui){
                        if (ui.item.value == '-1'){
                            vlink.video = null;
                            vlink.embed_code = null;
                            vlink.selected_video_index = -1;
                            vlink.selected_embed_code_index = -1;
                        }
                        else{
                            vlink.set_current_video(ui.item.value);
                            views.video_select.set_video_selection_text(vlink.video.title);
                        }
                    },

                    select: function(event, ui){
                        views.video_select.clear_search_box();
                    }
                });

                //$('.ui-icon.ui-icon-triangle-1-s').css('background-image', "url(" + chrome.extension.getURL('lib/jquery-ui/images/ui-icons_888888_256x240.png') + ")");
            }
        },

        tooltip: {
            id: 'vlink-insert-video-tooltip',
            instance: null,

            create: function(){
                views.video_select.tooltip.instance = document.getElementById(views.video_select.tooltip.id);
                views.video_select.tooltip.instance.style.display = 'block';

                document.addEventListener('mousemove', views.video_select.tooltip.move, false);
            },

            move: function (event) {
                var x = event.clientX,
                    y = event.clientY;

                views.video_select.tooltip.instance.style.top = (y - 23) + 'px';
                views.video_select.tooltip.instance.style.left = (x + 2) + 'px';
            },

            remove: function(){
                document.removeEventListener('mousemove', views.video_select.tooltip.move, false);
                views.video_select.tooltip.instance.style.display = 'none';
                views.video_select.tooltip.instance = null;
            }
        },

        init: function(){
            views.video_select.dropdown.init();

            $(views.video_select.insert_button_selector).click(function(){
                vlink.insert_selected_video();
            });

            $(views.video_select.cancel_button_selector).click(function(){
                views.hide($(views.video_select.selector));
            });

            $(views.video_select.preview_button_selector).click(function(){
                vlink.preview_selected_video();
            });

            $(views.video_select.search_selector).autocomplete({
                minLength: 0,

                select: function(event, ui){
                    vlink.set_current_video(ui.item.key);
                    views.video_select.set_video_selection_text(vlink.video.title);
                    views.video_select.clear_select_dropdown();
                }
            })
                .focus(function(){
                $(this).trigger('keydown');
            })
                .click(function(){
                $(this).trigger('keydown');
            });

            $(views.video_select.selector).css('left', (window.innerWidth/2 - 275) + 'px');
            $(views.video_select.selector).css('top', (window.innerHeight/3 - 65) + 'px');

            $(views.video_select.selector).draggable();
        },

        ui_init: function(){
            var search_source = [];

            $(views.video_select.dropdown.selector).empty().append("<option value='-1'></option>");

            var count = 0;
            var videos = vlink.data.videos;
            for(var i = 0; i < videos.length; i++){
                for(var j = 0; j < videos[i].embed_codes.length; j++){
                    search_source[count++] = {key: i + "+" + j, value: videos[i].embed_codes[j].title}
                }
            }

            search_source.sort(function(a, b){
                var s1 = a.value.toLowerCase();
                var s2 = b.value.toLowerCase();
                if (s1 < s2) return -1;
                else if (s1 > s2) return 1;
                else return 0;
            });

            for (var k = 0; k < search_source.length; k++){
                $(views.video_select.dropdown.selector).append("<option value='" + search_source[k].key + "'>" + search_source[k].value + "</option>");
            }


            if ($(views.video_select.dropdown.selector + ' option').length == 1)
                $(views.video_select.dropdown.selector+ ' option').text("No Videos Found");

            $(views.video_select.dropdown.selector).selectmenu('destroy');
            views.video_select.dropdown.init();

            if (vlink.selected_video_index != -1 && vlink.selected_embed_code_index != -1)
                $(views.video_select.dropdown.selector + '-button .ui-selectmenu-text').text(vlink.embed_code.title);

            $(views.video_select.search_selector).autocomplete( "option", "source", search_source);
        },

        ui_reset: function(){
            vlink.video = null;
            vlink.embed_code = null;
            vlink.selected_video_index = -1;
            vlink.selected_embed_code_index = -1;

            views.video_select.clear_search_box();
            views.video_select.clear_select_dropdown();
            views.video_select.set_video_selection_text('');
            views.video_select.ui_init();
        },

        clear_search_box: function(){
            $(views.video_select.search_selector).val('');
        },

        clear_select_dropdown: function(){
            $('#videos-dropdown-button > .ui-selectmenu-text').text('');
        },

        set_video_selection_text: function(text){
            $(views.video_select.title_field_selector).empty().append(text);
        }
    },

    options: {
        selector: '#vlink-options',
        image_size_dropdown_selector: '#preview-size',
        ok_button_selector: '#options-ok-button',
        cancel_button_selector: '#options-cancel-button',

        init: function(){
            $(views.options.image_size_dropdown_selector).change(function(){
                var values = $(this).val().split('x');
                options.preview_image.size.width = values[0];
                options.preview_image.size.height = values[1];
            });

            $(views.options.cancel_button_selector).click(function(){
                views.hide($(views.options.selector));
            });

            $(views.options.ok_button_selector).click(function(){
                views.hide($(views.options.selector));
            });

            $(views.options.selector).css('left', (window.innerWidth/2 - 100) + 'px');
            $(views.options.selector).css('top', (window.innerHeight/3 - 50) + 'px');

            $(views.options.selector).draggable();
        }
    },

    // init: function(){
    //     $('body').prepend($("<div id='vlink-ui'></div>").load(chrome.extension.getURL('app/html/ui.html'), function(){
    //         views.sign_in.init();
    //         views.video_select.init();
    //         views.options.init();
    //         views.dialog.modal.init();
    //         $(views.dialog.close_button_selector).attr('src', chrome.extension.getURL('app/img/close_icon.png'));
    //     }));
    // },

    show_video_preview: function(url, title, w, h) {
        var left = (screen.width/2)-(w/2);
        var top = (screen.height/2)-(h/2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    },

    show: function(view){
        $(view).removeClass('hide');
    },

    hide: function(view){
        $(view).addClass('hide');
    }
};