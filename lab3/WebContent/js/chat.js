$(document).ready(function() {
	'use strict';
	var chat = $('#chat-input');
	var enterChat = function() {
		if(chat.val().length === 0) {
			return;
		}
		var now = new Date();
		var template = '<div class="chat__container "><div class="chat__container--arrow "></div><div><div class="chat__bubble">' + chat.val() + '</div><div class="chat__meta"><p>' + now.toString() + '<span> --Me</span></p></div></div></div>';
		$('.page__content').append(template);
		chat.val('');
		//Scroll to bottom if the height of the body is greater than scrollheight
		if (document.body.clientHeight >= document.body.scrollHeight) {
			window.scrollTo(0,document.body.scrollHeight);
		}
	};
	$('#chat-submit').click(enterChat);
	$('#chat-input').keypress(function(event) {
		if ( event.which === 13 ) {
			$('#chat-submit').trigger('click');
		}
	});
});