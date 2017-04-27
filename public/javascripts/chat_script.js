$(document).ready(function() {

    var form      = $('#send_form')
    var send      = $('#send')
    var socket    = io.connect()

    form.submit(function(e) {
        e.preventDefault()
        var data = $('#send_message').val()
        if (data != '') {
            send_message_to($('#chat_name')[0].innerText, data, function(result) {
                if (result) {
                    $('#send_message').val('')
                }
            })
        }
    })

    $('.contact-input').click(function() {
        var user = $(this).context.children[1].innerText
        $('.chat-content').empty()
        $('#chat_name').empty()
        $('#chat_name').append(user)
        console.log(user)
        socket.emit('get_message', user)
    })

    send.click(function(e) {
        e.preventDefault()
        var data = $('#send_message').val()
        if (data != '') {
            send_message_to($('#chat_name')[0].innerText, data, function(result) {
                if (result) {
                    $('#send_message').val('')
                }
            })
        }
    })

})

function send_message_to(to, content, cb) {
    console.log(to, content)
    cb(1)
}