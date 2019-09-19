import { views } from './views.js';
import { api_credentials } from './api_credentials';
import { outlook } from './outlook';
import { options } from './options';
import GibberishAES  from 'gibberish-aes/dist/gibberish-aes-1.0.0';

var vlink = {
    server_root: 'https://459214a0.ngrok.io/',
    //server_root: 'https://platform.vlinksolutions.com/',
    data: null,
    video: null,
    embed_code: null,
    recipient_uuid: null,
    message_uuid: null,
    selected_video_index: -1,
    selected_embed_code_index: -1,
    after_data_sync_callback: null,

    content_cursor: {
        selector: ' .vlink-cur-pos',
        marker: 'vlink-cur-pos'
    },

    messages: {
        sign_in_success: {
            text: 'Signed in successfully',
            type: 'notice'
        },

        sign_in_fail: {
            text: 'Invalid username or password',
            type: 'error'
        },

        unauthorized: {
            text: 'Permission denied',
            type: 'error'
        },

        network_error: {
            text: 'Network error',
            type: 'error'
        },

        data_retrieval_fail: {
            text: 'Failed to fetch data from server',
            type: 'error'
        },

        preview_load_failed: {
            text: 'Failed to load preview',
            type: 'error'
        },

        no_video_selected: {
            text: 'Please select a video',
            type: 'error'
        },

        no_recipient: {
            text: 'Oops! you forgot to address your email.  Please do that before using the vLink extension.',
            type: 'error'
        },

        too_many_recipients: {
            text: "We see you are sending email to multiple contacts!\n\nIn order to track your recipients' activity the vLink plugin must send separate emails to each contact",
            type: 'error'
        },

        logged_out: {
            text: 'Logged out',
            type: 'notice'
        },

        no_subject: {
            text: 'Oops! you forget to provide subject for email. Please do that before sending.',
            type: 'error',
            code: 301
        }
    },

    errors: {
        unauthorized: 'Unauthorized'
    },

    encrypt: function(string, key){
        return GibberishAES.enc(string, key);
    },

    decrypt: function(string, key){
        return GibberishAES.dec(string, key);
    },

    init: function(){
        window.intervalId = window.setInterval(function(){

                //vlink.show_select_video_box;
                
                views.new_message_status_bar.init();
                vlink.message_uuid = vlink.build_uuid();
                vlink.after_data_sync_callback = vlink.insert_email_signature;
                vlink.video = null;

                //vlink.get_data(); // Causing duplicate requestes to server, need to figure out the issue, till then it should remain commented.
                window.clearInterval(window.intervalId);
        }, 300);
    },

    build_uuid: function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },

    show_message: {
        in: {
            main_window: function(message){
                views.show_message($(views.status_bar.element_selector), message);
            },

            new_message_box: function(message){
                views.show_message($(views.new_message_status_bar.selector), message);
            },

            sign_in_box: function(message){
                views.show_message($(views.sign_in.status_bar), message);
            },

            select_video_box: function(message){
                views.show_message($(views.video_select.status_bar_selector), message);
            },

            too_many_recipients_modal_box: function(){
                views.show_too_many_recipients_modal_box();
            }
        }
    },

    save_data: function(data){
        vlink.data = data;
    },

    load_data: function(){return vlink.data;},

    sign_in: function(){
        api_credentials.load();
        if (api_credentials.token === null)
            vlink.show_sign_in();
    },

    show_sign_in: function(){
        views.show($(views.sign_in.selector));
    },

    sign_in_request: function(username, password){
        $.ajax({
            url: vlink.server_root + 'oauth/token',
            type: 'post',
            data: {
                client_id: 'RjuxeFnJSuRVD4GalcHWL9EinRUwhXri0nVM9pzq',
                client_secret: 'zJIxiii7dyPP295EM29mYPGblZbQ6Wfra4UrIcRm',
                username: username,
                password: password,
                grant_type: 'password'
            },
            success: function(data, textStatus, jqXHR){
                if (data.access_token != null){
                    api_credentials.store(data.access_token, data.token_type);
                    vlink.show_message.in.sign_in_box(vlink.messages.sign_in_success);
                    $(views.sign_in.selector).hide();
                    
                    vlink.get_data();
                }
                else
                    vlink.show_message.in.sign_in_box(vlink.messages.sign_in_fail);
            },
            error: function(jqXHR, textStatus, errorThrown){
                api_credentials.clear();
                vlink.show_message.in.sign_in_box(vlink.messages.network_error);
            }
        });
    },

    get_recipient_uuid: function(){
        
        //if (vlink.recipient_uuid == null){
            if(outlook.recipients.firstRecipient != null){
                vlink.recipient_uuid = base64.encode(vlink.encrypt(outlook.recipients.firstRecipient.trim(), vlink.data.puid));
            }else{
                vlink.recipient_uuid = "[[contact::get_uid2]]";
            } 
        //}
        return vlink.recipient_uuid;
    },

    build_redirect_url: function(){
        return vlink.embed_code.video_url + "&rid="+ vlink.recipient_uuid + "&mid=" + vlink.message_uuid;
    },

    build_thumbnail_tag: function(){
        return "<div id='vlink-video-link'><a href='" + vlink.build_redirect_url() + "'><img src='" + vlink.video.url.watermark_url + "' width='" + options.preview_image.size.width +"' height='" + options.preview_image.size.height + "'></img></a></div><br>" + ($(views.add_desc.element_selector).is(':checked') ? vlink.video.description : "") + "<br>";
    },

    build_tracking_image_url: function(){
        if ($('#vlink-tri').length > 0) return;
        return "<img id='vlink-tri' style='display:none;' src='" + vlink.video.tracking_image_info.url + "&mid=" + vlink.message_uuid + "&rid=" + vlink.get_recipient_uuid() + "&vid=" + vlink.embed_code.id + "'></img>";
    },

    show_select_video_box: function(){
        views.video_select.ui_reset();
        views.show($(views.video_select.selector));
    },

    insert_email_signature: function(){
        //outlook.insertContent.signature();
    },

    insert_selected_video: function(){
        if (vlink.video == null){
            vlink.show_message.in.select_video_box(vlink.messages.no_video_selected);
            return;
        }

        outlook.insertContent.video();
        //Office.context.ui.closeContainer();
    },

    set_current_video: function (value) {
        var values = value.split('+');
        vlink.selected_video_index = values[0];
        vlink.selected_embed_code_index = values[1];

        vlink.video = vlink.data.videos[vlink.selected_video_index];
        vlink.embed_code = vlink.video.embed_codes[vlink.selected_embed_code_index];
    },

    get_data: function(){
        vlink.sign_in();
        if (api_credentials.token === null) return;

        $.ajax({
            url: vlink.server_root + 'api/v1/contact_owner/data',
            type: 'get',
            headers: {'Authorization' : 'Token token=' + api_credentials.token},
            success: vlink.get_data_success,
            error: vlink.get_data_failure
        });
    },

    get_data_success: function(data, textStatus, jqXHR){
        vlink.save_data(data);
        views.video_select.ui_init();
        if (textStatus == "success"){
            outlook.recipients.getRecipients(false);
        }

        if (vlink.after_data_sync_callback != null){
            vlink.after_data_sync_callback();
            vlink.after_data_sync_callback = null;
        }
    },

    get_data_failure: function(jqXHR, textStatus, errorThrown){
        if (errorThrown == vlink.errors.unauthorized){
            api_credentials.clear();
            vlink.show_message.in.main_window(vlink.messages.unauthorized);
            vlink.sign_in();
            return;
        }

        vlink.show_message.in.main_window(vlink.messages.data_retrieval_fail);
    },

    preview_selected_video: function(){
        if (vlink.video == null) return;
        $.ajax({
            url: vlink.video.url.preview_url,
            type: 'get',
            headers: {'Authorization' : 'Token token=' + api_credentials.token},
            success: function(data, textStatus, jqXHR){
                views.show_video_preview(data, 'Preview', 650, 380);
            },
            error: function(){
                vlink.show_message.in.select_video_box(vlink.messages.preview_load_failed);
            }
        });
    },

    clean_email_for_post: function(){
        $(vlink.content_cursor.selector).removeClass(vlink.content_cursor.marker);
    },

    add_contact_uid_to_video_link_in_signature: function(){
        signature_element = document.getElementById('x_email-signature');

        original_html = signature_element.innerHTML;
        result_html = original_html.replace("[[contact::get_uid2]]", vlink.get_recipient_uuid());
        result_html = result_html.replace("[[::contact_owner_uid]]", vlink.data.coid);

        if (original_html == result_html)
            return false;
        else {
            signature_element.innerHTML = result_html;
            return true;
        }
    },

    add_contact_uid_to_video_link_in_body: function(){
        var video_link = document.getElementById('vlink-video-link');
        video_link.innerHTML = video_link.innerHTML.replace("[[contact::uid2]]", vlink.get_recipient_uuid());
    },

    post_email: function(email){
        // if ($(gmail.subject_box_selector).val() == ""){
        //     vlink.show_message.in.new_message_box(vlink.messages.no_subject);
        //     return vlink.messages.no_subject.code;
        // }

        vlink.clean_email_for_post();
        vlink.add_contact_uid_to_video_link_in_signature();

        if (vlink.video == null){
            vlink.recipient_uuid = null;
            return;
        }
        //Done in outlook.insertContent.video
        //vlink.add_contact_uid_to_video_link_in_body();
        //gmail.compose_message.append_content(vlink.build_tracking_image_url());

        //var subject = base64.encode($(gmail.subject_box_selector).val());
        //var body = base64.encode($(gmail.compose_message.content_selector).html());

        window.setTimeout(function() {
            $.ajax({
                url: vlink.server_root + 'api/v1/email/record_send',
                type: 'post',
                headers: {'Authorization': 'Token token=' + api_credentials.token},
                success: vlink.record_message_success,
                data: {
                    s: subject,
                    b: body,
                    mid: vlink.message_uuid,
                    rid: vlink.get_recipient_uuid(),
                    vid: vlink.embed_code ? vlink.embed_code.id : null
                }
            });
        }, 1000);
    },

    record_message_success: function(){
        vlink.recipient_uuid = null;
    },

    logout: function(){
        api_credentials.clear();
        vlink.show_message.in.main_window(vlink.messages.logged_out);
    }
};
var base64 = {
    encode: function(string){
        return window.btoa(unescape(encodeURIComponent(string)));
    },

    decode: function(string){
        return decodeURIComponent(escape(window.atob(string)));
    }
};

export { vlink, base64 };