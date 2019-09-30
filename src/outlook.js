import { vlink, base64 } from './vlink.js';
var outlook = {
    recipients: {
        checkRecipients: function(){
            function recipientUpdated(eventarg) {      
                if (eventarg.changedRecipientFields.to) {
                    outlook.recipients.getRecipients(true);
                    return;
                }
              }
            function myCallback(){
                console.log("Callback");
            }                
            Office.context.mailbox.item.addHandlerAsync(Office.EventType.RecipientsChanged, recipientUpdated, myCallback);           
        },
        getRecipients: function(recipientStatus){
            var item = Office.context.mailbox.item.to;
            function callback(asyncResult) {
                var arrayOfToRecipients = asyncResult.value;
                if (arrayOfToRecipients.length == 1){
                    outlook.recipients.firstRecipient = arrayOfToRecipients[0].emailAddress;
                    outlook.insertContent.signature();
                }else if (arrayOfToRecipients.length == 0 && recipientStatus){
                    Office.context.ui.displayDialogAsync(vlink.server_root+'outlook_addin/recp_missing.html', {height: 30, width: 20, displayInIframe: true});
                }
        
                if (arrayOfToRecipients.length > 1){
                    console.log("Multiple recipients...");
                    return;
                }

                if (vlink.data == null){
                    vlink.after_data_sync_callback = vlink.show_select_video_box;
                    vlink.get_data();
                    return;
                }
            }

            item.getAsync(callback);
        },
        firstRecipient: null
    },
    insertContent:{
        video: function(){
            vlink.get_recipient_uuid(); 
            Office.context.mailbox.item.body.setSelectedDataAsync(
                "<div id='insert-content'>"+
                vlink.build_thumbnail_tag()+
                vlink.build_tracking_image_url()+
                "</div>",
                { coercionType: Office.CoercionType.Html }
                ); 
            outlook.recordInsertion();      
        },
        signature: function(){ 
            if(outlook.recipients.firstRecipient != null){
                var signature = base64.decode(vlink.data.email_signature);
                var updatedSig = signature.replace(/(\[\[)(contact::get_uid2)(\]\])/, vlink.get_recipient_uuid());
                updatedSig = updatedSig.replace(/(\[\[)(::contact_owner_uid)(\]\])/, vlink.data.coid);
                updatedSig = updatedSig.replace(/(\[\[)(message::uid2)(\]\])/, vlink.message_uuid);
                Office.context.mailbox.item.body.setSelectedDataAsync(
                    "<div id='email-signature'>"+updatedSig+"</div>",
                    { coercionType: Office.CoercionType.Html });
            }
        }
    },

    recordInsertion: function(){
        outlook.getBody();
    },

    getSubject: function(body){
        Office.context.mailbox.item.subject.getAsync(response);
        function response(asyncResult) {
            var subject = asyncResult.value;
            vlink.record_send(subject, body);
        }  
    },

    getBody: function(){
        Office.context.mailbox.item.body.getAsync(
            "html",
            { asyncContext: "Updating all the links based on changed Recipient ID." },
            function callback(result) {
                var content = result.value;
                outlook.getSubject(content);
            }); 
    },
};

export { outlook };
