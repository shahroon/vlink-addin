!function(e){var t={};function i(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(o,n,function(t){return e[t]}.bind(null,n));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=335)}({131:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.views=void 0;var o=i(93),n=i(132),s=i(133),l={selecty_change:function(e,t){"-1"==t.item.value?(o.vlink.video=null,o.vlink.embed_code=null,o.vlink.selected_video_index=-1,o.vlink.selected_embed_code_index=-1):(o.vlink.set_current_video(t.item.value),l.video_select.set_video_selection_text(o.vlink.video.title))},dialog:{close_button_selector:".vlink-close-btn",modal:{selector:"#vlink-modalDialog",too_many_recipients_selector:"#vlink-error-too-many-emails",init:function(){$(l.dialog.modal.selector+" "+l.dialog.close_button_selector).click(function(){l.remove_too_many_recipients_modal_box()})}}},button:{html:"<div id='insert-video-btn' class='wG J-Z-I' command='' data-tooltip='vLink - Insert Content‬' aria-label='Insert Video‬' role='button' aria-pressed='false' aria-haspopup='true' aria-expanded='false' style='-webkit-user-select: none;' ></div>",selector:"#insert-video-btn"},status_bar:{element_selector:"#status-bar"},new_message_status_bar:{selector:"#status-bar-compose",init:function(){var e=$(l.status_bar.element_selector).clone();e.attr("id",l.new_message_status_bar.selector.split("#")[1]),e.val("")}},show_message:function(e,t){var i=t.type;e.empty().append(t.text),e.addClass(i),l.show(e),window.setTimeout(function(){l.hide(e),window.setTimeout(function(){e.removeClass(i)},500)},3e3)},show_too_many_recipients_modal_box:function(){$(l.dialog.modal.too_many_recipients_selector).css("left",window.innerWidth/2-210+"px"),$(l.dialog.modal.too_many_recipients_selector).css("top",window.innerHeight/3-70+"px"),l.show(l.dialog.modal.selector),l.show(l.dialog.modal.too_many_recipients_selector)},remove_too_many_recipients_modal_box:function(){l.hide(l.dialog.modal.too_many_recipients_selector),l.hide(l.dialog.modal.selector)},sign_in:{selector:"#vlink_sign_in",button:"#signin-button",cancel_button:"#signin-cancel-button",email_input:"#email-input",password_input:"#password-input",status_bar:"#vlink-sign-in-status-bar",init:function(){$(l.sign_in.button).click(function(){o.vlink.sign_in_request($(l.sign_in.email_input).val(),$(l.sign_in.password_input).val())}),$(l.sign_in.cancel_button).click(function(){$(l.sign_in.email_input).val(""),$(l.sign_in.password_input).val(""),l.sign_in.hide()}),$(l.sign_in.selector).css("left",window.innerWidth/2-125+"px"),$(l.sign_in.selector).css("top",window.innerHeight/3-100+"px")},hide:function(){l.hide($(l.sign_in.selector))}},video_select:{selector:"#vlink-video-select",title_field_selector:"#vlink-video-title",insert_button_selector:"#insert-video-button",cancel_button_selector:"#video-select-cancel-button",preview_button_selector:"#preview-button",search_selector:"#videos-search",status_bar_selector:"#vlink-video-select-status-bar",tooltip:{id:"vlink-insert-video-tooltip",instance:null,create:function(){l.video_select.tooltip.instance=document.getElementById(l.video_select.tooltip.id),l.video_select.tooltip.instance.style.display="block",document.addEventListener("mousemove",l.video_select.tooltip.move,!1)},move:function(e){var t=e.clientX,i=e.clientY;l.video_select.tooltip.instance.style.top=i-23+"px",l.video_select.tooltip.instance.style.left=t+2+"px"},remove:function(){document.removeEventListener("mousemove",l.video_select.tooltip.move,!1),l.video_select.tooltip.instance.style.display="none",l.video_select.tooltip.instance=null}},init:function(){$(l.video_select.insert_button_selector).click(function(){o.vlink.insert_selected_video()}),$(l.video_select.cancel_button_selector).click(function(){l.hide($(l.video_select.selector))}),$(l.video_select.preview_button_selector).click(function(){o.vlink.preview_selected_video()}),$(l.video_select.search_selector).autocomplete({minLength:0,select:function(e,t){o.vlink.set_current_video(t.item.key),l.video_select.set_video_selection_text(o.vlink.video.title),l.video_select.clear_select_dropdown()}}).focus(function(){$(this).trigger("keydown")}).click(function(){$(this).trigger("keydown")}),$(".ui-autocomplete").css({top:"-=130px",left:"+=25px"}),$(l.video_select.selector).css("left",window.innerWidth/2-275+"px"),$(l.video_select.selector).css("top",window.innerHeight/3-65+"px")},ui_init:function(){var e=[];o.vlink.show_select_video_box(),$(l.video_select.selector).removeClass("hide");for(var t=0,i=o.vlink.data.videos,n=0;n<i.length;n++)for(var s=0;s<i[n].embed_codes.length;s++)e[t++]={key:n+"+"+s,value:i[n].embed_codes[s].title};e.sort(function(e,t){var i=e.value.toLowerCase(),o=t.value.toLowerCase();return i<o?-1:i>o?1:0}),$(l.video_select.search_selector).autocomplete("option","source",e)},ui_reset:function(){o.vlink.video=null,o.vlink.embed_code=null,o.vlink.selected_video_index=-1,o.vlink.selected_embed_code_index=-1,l.video_select.clear_search_box(),l.video_select.clear_select_dropdown(),l.video_select.set_video_selection_text(""),l.video_select.ui_init()},clear_search_box:function(){$(l.video_select.search_selector).val("")},clear_select_dropdown:function(){$("#videos-dropdown-button > .ui-selectmenu-text").text("")},set_video_selection_text:function(e){$(l.video_select.title_field_selector).empty().append(e)}},options:{selector:"#vlink-options",image_size_dropdown_selector:"#preview-size",ok_button_selector:"#options-ok-button",cancel_button_selector:"#options-cancel-button",init:function(){$(l.options.image_size_dropdown_selector).change(function(){var e=$(this).val().split("x");s.options.preview_image.size.width=e[0],s.options.preview_image.size.height=e[1]}),$(l.options.cancel_button_selector).click(function(){l.hide($(l.options.selector))}),$(l.options.ok_button_selector).click(function(){l.hide($(l.options.selector))}),$(l.options.selector).css("left",window.innerWidth/2-100+"px"),$(l.options.selector).css("top",window.innerHeight/3-50+"px")}},init:function(){$("body").prepend('<div id="div1"></div>').load("ui.html",function(){l.sign_in.init(),l.video_select.init(),l.options.init(),n.api_credentials.load(),null!=n.api_credentials.token?o.vlink.get_data():o.vlink.show_sign_in()}),$(l.dialog.close_button_selector).attr("src","")},show_video_preview:function(e,t,i,o){var n=screen.width/2-i/2,s=screen.height/2-o/2;return window.open(e,t,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+i+", height="+o+", top="+s+", left="+n)},show:function(e){$(e).removeClass("hide")},hide:function(e){$(e).addClass("hide")}};t.views=l},132:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={token:null,token_type:null,load:function(){null===o.token&&o.load_from_store()},load_from_store:function(){o.token=localStorage.getItem("token"),o.token_type=localStorage.getItem("token_type")},store:function(e,t){localStorage.setItem("token",e),localStorage.setItem("token_type",t),o.token=localStorage.getItem("token"),o.token_type=localStorage.getItem("token_type")},clear:function(){o.token=null,o.token_type=null,localStorage.removeItem("token"),localStorage.removeItem("token_type")}};t.api_credentials=o},133:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.options={preview_image:{size:{width:null,height:null}}}},335:function(e,t,i){"use strict";var o=i(131),n=i(93);console.log("Loading Office...."),Office.onReady(function(){$(document).ready(function(){console.log("Loaded."),o.views.init(),n.vlink.init()})})},336:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.outlook=void 0;var o=i(93),n={recipients:{count:function(){var e=Office.context.mailbox.item;return(e.itemType==Office.MailboxEnums.ItemType.Appointment?e.requiredAttendees:e.to).getAsync.length}},insertContent:{video:function(){Office.context.mailbox.item.body.setSelectedDataAsync("<div id='insert-content'>"+o.vlink.build_thumbnail_tag()+"</div>",{coercionType:Office.CoercionType.Html})},signature:function(){Office.context.mailbox.item.body.setAsync("<div id='email-signature'>"+o.base64.decode(o.vlink.data.email_signature)+"</div>",{coercionType:Office.CoercionType.Html})}}};t.outlook=n},93:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.base64=t.vlink=void 0;var o=i(131),n=i(132),s=i(336),l=i(133),r={server_root:"https://platform.vlinksolutions.com/",data:null,video:null,embed_code:null,recipient_uuid:null,message_uuid:null,selected_video_index:-1,selected_embed_code_index:-1,after_data_sync_callback:null,content_cursor:{selector:" .vlink-cur-pos",marker:"vlink-cur-pos"},messages:{sign_in_success:{text:"Signed in successfully",type:"notice"},sign_in_fail:{text:"Invalid username or password",type:"error"},unauthorized:{text:"Permission denied",type:"error"},network_error:{text:"Network error",type:"error"},data_retrieval_fail:{text:"Failed to fetch data from server",type:"error"},preview_load_failed:{text:"Failed to load preview",type:"error"},no_video_selected:{text:"Please select a video",type:"error"},no_recipient:{text:"Oops! you forgot to address your email.  Please do that before using the vLink extension.",type:"error"},too_many_recipients:{text:"We see you are sending email to multiple contacts!\n\nIn order to track your recipients' activity the vLink plugin must send separate emails to each contact",type:"error"},logged_out:{text:"Logged out",type:"notice"},no_subject:{text:"Oops! you forget to provide subject for email. Please do that before sending.",type:"error",code:301}},errors:{unauthorized:"Unauthorized"},encrypt:function(e,t){return GibberishAES.enc(e,t)},decrypt:function(e,t){return GibberishAES.dec(e,t)},init:function(){window.intervalId=window.setInterval(function(){r.show_select_video_box,o.views.new_message_status_bar.init(),r.message_uuid=r.build_uuid(),r.after_data_sync_callback=r.insert_email_signature,r.video=null,r.get_data(),window.clearInterval(window.intervalId)},300)},build_uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})},show_message:{in:{main_window:function(e){o.views.show_message($(o.views.status_bar.element_selector),e)},new_message_box:function(e){o.views.show_message($(o.views.new_message_status_bar.selector),e)},sign_in_box:function(e){o.views.show_message($(o.views.sign_in.status_bar),e)},select_video_box:function(e){o.views.show_message($(o.views.video_select.status_bar_selector),e)},too_many_recipients_modal_box:function(){o.views.show_too_many_recipients_modal_box()}}},save_data:function(e){r.data=e},load_data:function(){return r.data},sign_in:function(){n.api_credentials.load(),null===n.api_credentials.token&&r.show_sign_in()},show_sign_in:function(){o.views.show($(o.views.sign_in.selector))},sign_in_request:function(e,t){$.ajax({url:r.server_root+"oauth/token",type:"post",data:{client_id:"RjuxeFnJSuRVD4GalcHWL9EinRUwhXri0nVM9pzq",client_secret:"zJIxiii7dyPP295EM29mYPGblZbQ6Wfra4UrIcRm",username:e,password:t,grant_type:"password"},success:function(e,t,i){null!=e.access_token?(n.api_credentials.store(e.access_token,e.token_type),r.show_message.in.sign_in_box(r.messages.sign_in_success),$(o.views.sign_in.selector).hide(),r.get_data()):r.show_message.in.sign_in_box(r.messages.sign_in_fail)},error:function(e,t,i){n.api_credentials.clear(),r.show_message.in.sign_in_box(r.messages.network_error)}})},get_recipient_uuid:function(){return r.recipient_uuid,r.recipient_uuid},build_redirect_url:function(){return r.embed_code.video_url+"&rid=[[contact::uid2]]&mid="+r.message_uuid},build_thumbnail_tag:function(){return"<div id='vlink-video-link'><a href='"+r.build_redirect_url()+"'><img src='"+r.video.url.watermark_url+"' width='"+l.options.preview_image.size.width+"' height='"+l.options.preview_image.size.height+"'></img></a></div><br>"+r.video.description+"<br>"},build_tracking_image_url:function(){if(!($("#vlink-tri").length>0))return"<img id='vlink-tri' style='display:none;' src='"+r.video.tracking_image_info.url+"&mid="+r.message_uuid+"&rid="+r.get_recipient_uuid()+"&vid="+r.embed_code.id+"'></img>"},show_select_video_box:function(){var e=s.outlook.recipients.count();if(0!=e)if(e>1)r.show_message.in.too_many_recipients_modal_box();else{if(null==r.data)return r.after_data_sync_callback=r.show_select_video_box,void r.get_data();o.views.video_select.ui_reset(),o.views.show($(o.views.video_select.selector))}else r.show_message.in.new_message_box(r.messages.no_recipient)},insert_email_signature:function(){$("#email-signature").length>0||s.outlook.insertContent.signature()},insert_selected_video:function(){null!=r.video?(s.outlook.insertContent.video(),Office.context.ui.closeContainer()):r.show_message.in.select_video_box(r.messages.no_video_selected)},set_current_video:function(e){var t=e.split("+");r.selected_video_index=t[0],r.selected_embed_code_index=t[1],r.video=r.data.videos[r.selected_video_index],r.embed_code=r.video.embed_codes[r.selected_embed_code_index]},get_data:function(){r.sign_in(),null!==n.api_credentials.token&&$.ajax({url:r.server_root+"api/v1/contact_owner/data",type:"get",headers:{Authorization:"Token token="+n.api_credentials.token},success:r.get_data_success,error:r.get_data_failure})},get_data_success:function(e,t,i){r.save_data(e),o.views.video_select.ui_init(),null!=r.after_data_sync_callback&&(r.after_data_sync_callback(),r.after_data_sync_callback=null)},get_data_failure:function(e,t,i){if(i==r.errors.unauthorized)return n.api_credentials.clear(),r.show_message.in.main_window(r.messages.unauthorized),void r.sign_in();r.show_message.in.main_window(r.messages.data_retrieval_fail)},preview_selected_video:function(){null!=r.video&&(console.log(r.video.url.preview_url),$.ajax({url:r.video.url.preview_url,type:"get",headers:{Authorization:"Token token="+n.api_credentials.token},success:function(e,t,i){o.views.show_video_preview(e,"Preview",650,380)},error:function(){r.show_message.in.select_video_box(r.messages.preview_load_failed)}}))},clean_email_for_post:function(){$(r.content_cursor.selector).removeClass(r.content_cursor.marker)},add_contact_uid_to_video_link_in_signature:function(){return signature_element=document.getElementById("email-signature"),original_html=signature_element.innerHTML,result_html=original_html.replace("[[contact::get_uid2]]",r.get_recipient_uuid()),result_html=result_html.replace("[[::contact_owner_uid]]",r.data.coid),original_html!=result_html&&(signature_element.innerHTML=result_html,!0)},add_contact_uid_to_video_link_in_body:function(){var e=document.getElementById("vlink-video-link");e.innerHTML=e.innerHTML.replace("[[contact::uid2]]",r.get_recipient_uuid())},post_email:function(e){r.clean_email_for_post(),r.add_contact_uid_to_video_link_in_signature(),null!=r.video?(r.add_contact_uid_to_video_link_in_body(),window.setTimeout(function(){$.ajax({url:r.server_root+"api/v1/email/record_send",type:"post",headers:{Authorization:"Token token="+n.api_credentials.token},success:r.record_message_success,data:{s:subject,b:body,mid:r.message_uuid,rid:r.get_recipient_uuid(),vid:r.embed_code?r.embed_code.id:null}})},1e3)):r.recipient_uuid=null},record_message_success:function(){r.recipient_uuid=null},logout:function(){n.api_credentials.clear(),r.show_message.in.main_window(r.messages.logged_out)}},c={encode:function(e){return window.btoa(unescape(encodeURIComponent(e)))},decode:function(e){return decodeURIComponent(escape(window.atob(e)))}};t.vlink=r,t.base64=c}});