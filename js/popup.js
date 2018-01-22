$(document).ready(function(){	
    $('#wait').hide();
	$("#sendsms").click(function(){

        $('#status').text('');
        $('#wait').show();
		var phone = $('#phone').val();
        var message = $('#message').val();

		if(!validate_phone(phone)){
            $('#status').text('Please enter a valid phone number');
            $('#wait').hide();
			return;
		}

        if(!message){
            $('#status').text('Please enter message');
            $('#wait').hide();
            return;
        }

        $(this).prop('disabled', true);

        chrome.storage.sync.get({
            api: 'xxxxxx'
        }, function(items) {
            send_sms(phone, message, items.api);
        });

	});

    $("#options").click(function(){
        var options_url = chrome.extension.getURL("../options.html"); 
        window.open(options_url, '_blank');
    });
});

function validate_phone(phone) {  

	if(phone.length < 10){
		return false;
	}

	// TODO : validate

	return true;
}

function send_sms(phone, message, api_key){
        $.ajax({
                'url': 'https://mobtexting.com/app/index.php/api',
                'type': 'GET',
                'dataType': 'json',
                'data': {
                    'method': 'sms.normal',
                    'api_key': api_key,
                    'to': phone,
                    'sender': 'BULKSMS',
                    'message': message,
                    'flash': '0',
                    'unicode': '1'  
                },
                'success': function (data) {
                    // what happens if the request was completed properly
                    $('#status').text('SMS Sent Successfully');
                    $('#wait').hide();
                    $('#sendsms').prop('disabled', false);
                },
                'error': function (data) {
                    // what happens if the request fails.
                    $('#status').text('SMS Sending Failed!');
                    $('#wait').hide();
                    $('#sendsms').prop('disabled', false);
                }
            });
    }
