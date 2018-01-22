$(document).ready(function(){	
	restore_options();
	$("#checkpage").click(function(){
		save_options();
	});
});

// Saves options to chrome.storage
function save_options() {
  var username = $('#username').val();
  var api = $('#api').val();
  chrome.storage.sync.set({
    username: username,
    api: api
  }, function() {
	$('#status').text("Changes saved. Please refresh!");
  });
}

function restore_options() {
  chrome.storage.sync.get({
    username: 'N/A',
    api: 'N/A'
  }, function(items) {
	$('#username-text').text(items.username);
	api = get_hidden(items.api);
	$('#api-text').text(api);
	display_credits(items.api);
  });
}

function get_hidden(api){
	var len = api.length;
	len -= 5;
	api = api.substring(0, 5);
	for(var i = 0; i < len; i++){
		api += 'X';
	}
	return api;
}

function display_credits(api_key){
	$.ajax({
		'type': 'GET',
		'url': 'http://api.mobtexting.com/v1/credit',
        'data': {
        	'api_key': api_key
        },
        'success': function(data){ 
        	$('#credits-text').text(data.balance);
        },
        'error': function (data) {
        	$('#credits-text').text("N/A");
	    }
	});
}