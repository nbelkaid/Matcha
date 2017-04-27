$(document).ready(function() {

    var form      = $('#send_form')
    var send      = $('#send')
    var socket    = io.connect()


    $('.chat-content').empty()
    socket.emit('get_message', $('#chat_name')[0].innerText)

    $('.contact-input').click(function() {
        var user = $(this).context.children[1].innerText
        $(this).removeClass('new_message')
        $('.chat-content').empty()
        $('#chat_name').empty()
        $('#chat_name').append(user)
        socket.emit('get_message', user)
    })

    socket.on('display_conversation', function (data) {

        $('<ul class="chat-list-content">').appendTo('.chat-content')
            
        for (var i = 0; i < data.message.length; i++) {
            var element = data.message[i];
            
            $('<li class="' + element.class + '"> <div><span class="message-content">' +
            element.content +  '</span>' + '<span class="message-date">' + element.date + 
            '</span>').appendTo('.chat-list-content')
        }

        $('.chat-list-content').scrollTop($('.chat-list-content')[0].scrollHeight)

    })

    form.submit(function(e) {
        e.preventDefault()
        var data = $('#send_message').val()
        if (data != '') {
            socket.emit('send_message', {
                to      : $('#chat_name')[0].innerText,
                message : data
            })
        }
    })

    send.click(function(e) {
        e.preventDefault()
        var data = $('#send_message').val()
        if (data != '') {
            socket.emit('send_message', {
                to      : $('#chat_name')[0].innerText,
                message : data
            })
        }
    })


    socket.on('display_new_message_to', function(new_message) {

        if (new_message && new_message.content && new_message.from && new_message.from == $('#chat_name')[0].innerText) {
            $('<li class="' + new_message.class + '"><div><span class="message-content">' +
            new_message.content +  '</span>' + '<span class="message-date">'+ new_message.date +
            '</span>').appendTo('.chat-list-content')
            $('#send_message').val('')
            $('.chat-list-content').scrollTop($('.chat-list-content')[0].scrollHeight)
        }

    })
    socket.on('display_new_message', function(new_message) {

        if (new_message && new_message.content) {
            $('<li class="' + new_message.class + '"><div><span class="message-content">' +
            new_message.content +  '</span>' + '<span class="message-date">'+ new_message.date +
            '</span>').appendTo('.chat-list-content')
            $('#send_message').val('')
            $('.chat-list-content').scrollTop($('.chat-list-content')[0].scrollHeight)
        }

    })

    socket.on('display_notif', function(to) {

        $('.'+to.to).removeClass('new_message').addClass('new_message')

    })

})

function send_message_to(to, content, cb) {
    socket.emit('get_message', {
        to      : to,
        message : content
    })
}