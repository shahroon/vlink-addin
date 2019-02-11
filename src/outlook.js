outlook = {
    recipients: {
        count: function(){
            var item = Office.context.mailbox.item;
            if (item.itemType == Office.MailboxEnums.ItemType.Appointment)
                toRecipients = item.requiredAttendees;
            else {
                toRecipients = item.to;
            }
            return toRecipients.getAsync.length;
        }
    },
    insertContent:{
        video: function(){
            Office.context.mailbox.item.body.setSelectedDataAsync(
                "<div id='insert-content'>"+vlink.build_thumbnail_tag()+"</div>",
                { coercionType: Office.CoercionType.Html }
                );
        },
        signature: function(){
            Office.context.mailbox.item.body.setAsync(
                "<div id='email-signature'>"+base64.decode(vlink.data.email_signature)+"</div>",
                { coercionType: Office.CoercionType.Html });

        }
    }
};
