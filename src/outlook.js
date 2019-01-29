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
    }
};