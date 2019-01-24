gmail = {
    compose_button_selector:  '.T-I.J-J5-Ji.T-I-KE.L3',

    compose_message: {
        content_selector: '.Am.Al.editable.LW-avf',
        toolbar_selector: '.a8X.gU > div:first-child',
        toolbar_separator: "<div class='Uz aw4 J-J5-Ji' aria-hidden='true'></div>",
        send_button_selector: '.T-I.J-J5-Ji.aoO.T-I-atl.L3',
        content_table_body_selector: '.iN > tbody',

        append_content: function(content_html){
            $(gmail.compose_message.content_selector).append(content_html);
        },

        prepend_content: function(content_html){
            $(gmail.compose_message.content_selector).prepend(content_html);
        },

        add_toolbar_button: function(button){
            $(gmail.compose_message.toolbar_selector).append(button);
        },

        add_toolbar_start_separator: function(){
            $(gmail.compose_message.toolbar_selector).append(gmail.compose_message.toolbar_separator)
        }
    },

    to_box_selector: '.vN.Y7BVp.a3q',
    cc_box_selector: '.vN.Y7BVp.a3p',
    bcc_box_selector: '.vN.Y7BVp',
    all_email_boxes_selector: '.vN.bfK.a3q',
    subject_box_selector: "input[name='subject']",

    recipients: {
        count: function(){ return $(gmail.all_email_boxes_selector).length;},
        first_email: function(){return $(gmail.all_email_boxes_selector).attr('email');}
    },

    initialize: function(){
        var send_button_class = gmail.compose_message.send_button_selector.replace(/\./g, ' ');

        gmail_send_button = document.getElementsByClassName(send_button_class);

        if (gmail_send_button != null && gmail_send_button.length > 0){
            gmail_send_button[0].parentNode.addEventListener('click', function(event){
            if (vlink.post_email(gmail.recipients.first_email()) == vlink.messages.no_subject.code) {
                event.stopPropagation();
                return false;
                }
            }, true);

            return true;
        }

        return false;
    }
};