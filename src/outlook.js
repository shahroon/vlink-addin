import { vlink, base64 } from './vlink.js';
import { views } from './views.js';
var outlook = {
    recipients: {
        checkRecipients: function(){
            function recipientUpdated(eventarg) {            
                if (eventarg.type === "olkRecipientsChanged") {
                  outlook.signatureExist();
                  return;
                }
              }
            function myCallback(){
                console.log("Callback");
            }  
              
            Office.context.mailbox.item.addHandlerAsync(Office.EventType.RecipientsChanged, recipientUpdated, myCallback);
            
        },
        getRecipients: function(){
            var item = Office.context.mailbox.item.to;
            function callback(asyncResult) {
                var arrayOfToRecipients = asyncResult.value;
                console.log(arrayOfToRecipients);
                if (arrayOfToRecipients.length == 0){
                    console.log("Please add recipient, then proceed..");
                    return;
                }
                
                if (arrayOfToRecipients.length == 1){
                    var contactID = arrayOfToRecipients[0].emailAddress;
                    outlook.recipients.firstRecipient = contactID.trim();
                    if (outlook.recipients.firstRecipient != null) { outlook.insertContent.signature(); }  
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
        firstRecipient: null,

        zeroRecipient: function(){
            var item = Office.context.mailbox.item.to;
            function callback(asyncResult) {
                if (asyncResult.value.length == 0){
                    Office.context.ui.closeContainer();
                }else{
                    console.log("Check Rec");
                    outlook.recipients.checkRecipients();
                }
            }

            item.getAsync(callback);
        }
    },
    insertContent:{
        video: function(){
            vlink.get_recipient_uuid(); 
   
            Office.context.mailbox.item.body.setSelectedDataAsync(
                "<div id='insert-content'>"+vlink.build_thumbnail_tag()+"</div>",
                { coercionType: Office.CoercionType.Html }
                );     
        },
        signature: function(){ 
            var signature = base64.decode(vlink.data.email_signature);
            var updatedSig = signature.replace(/(\[\[)(contact::get_uid2)(\]\])/, vlink.get_recipient_uuid());
            updatedSig = updatedSig.replace(/(\[\[)(::contact_owner_uid)(\]\])/, vlink.data.coid);
            updatedSig = updatedSig.replace(/(\[\[)(message::uid2)(\]\])/, vlink.message_uuid);
            Office.context.mailbox.item.body.setSelectedDataAsync(
                "<div id='email-signature'>"+updatedSig+"</div>",
                { coercionType: Office.CoercionType.Html });
        }
    },
    signatureExist: function(){
        Office.context.mailbox.item.body.getAsync(
            "html",
            { asyncContext: "Signature does not exist, please proceed to insert Signature." },
            function callback(result) {
                if (result.value.includes('email-signature')){
                    console.log("Signature already exists.");
                }
                else{
                    console.log("Here");
                    outlook.recipients.getRecipients();
                }
            }); 
    }
};

export { outlook };
