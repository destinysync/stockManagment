function signInOrSignUp() {
    var str = $("form").serialize();
    var email = decodeURIComponent(str.match(/username=(.*)&.*/)[1]);
    var pw = decodeURIComponent(str.match(/&password=(.*)/)[1]);
    if (email !== '' && pw !== '') {
        $.post('/signInOrSignUp/', function (data, status) {

        })
    }
}

function runFuncAfterFinishingTyping(delay, selector, func) {
    var typingTimer;
    var doneTypingInterval = delay;
    var $input = selector;
    // example: selector = $("input[type='text']")

    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    function doneTyping() {
        func();
    }
}

$(document).ready(function () {

    $('#signUpSubmit').click(function () {
        signInOrSignUp();
    });

    $('#navAddButton').click(function () {
        var content = '<div class="row"><div class="col-lg-6"><form action="/signInOrSignUp/" method="post"><div class="form-group"><label for="address">添加代理商<span id="agentAddedFeedback"></span></label><input placeholder="地址" class="form-control" name="address" id="address" value="" type="text"></div><div class="form-group"><label for="phone"></label><input placeholder="电话" class="form-control" name="phone" id="phone" value="" type="text"></div><div class="form-group"><label for="name"></label><input placeholder="姓名" class="form-control" name="name" id="name" value="" type="text"></div><div class="form-group"><label for="Email"></label><input placeholder="邮箱地址" class="form-control" name="username" id="Email" value="" type="email"></div><div class="form-group"><label for="Password"></label><input placeholder="密码" class="form-control" name="password" id="Password" type="password"></div></form><button type="submit" id="addAgentButton" class="btn btn-primary">提交</button></div><div class="col-lg-6"><div class="form-group"><label for="model">添加产品型号<span id="modelAddedFeedback"></span></label><input placeholder="型号" class="form-control" name="model"id="model" value="" type="text"></div><button type="submit" id="addModel" class="btn btn-primary">提交</button></div></div>';
$('.contentContainer').html(content);
    });

    $(document).on('click', '#checkoutButton', function () {
        var content = '<div class="row"><div class="col-lg-4"><form role = "form"><div class = "form-group"><label for = "cloudCodes">云码</label><textarea class = "form-control" rows = "20" name="cloudCodes" id="cloudCodes"></textarea></div></form></div><div class="col-lg-4"><label for = "agentList">代理商列表</label><select class="form-control" id="agentList"></select></div><div class="col-lg-4"><label for = "modelList">型号列表</label><select class="form-control" id="modelList"></select></div></div><div class="row"><div class="col-lg-1 col-lg-offset-11"><button type="submit" id="checkoutSubmitButton" class="btn btn-primary">提交</button></div></div>';
        $('.contentContainer').html(content);
       $.post('/updateList', function (data, status) {
           $('#agentList').html(data.agentList);
           $('#modelList').html(data.modelList)
       }) 
    });

    $.post('/admin', function (data, status) {
$('#modelListInbound').html(data.modelList);
        $('#agentListInventory').html(data.agentList);
    });

    $('#inboundSubmitButton').click(function () {
        var cloudCodesInbound = $('#cloudCodesInbound').val().split('\n'),
            numberToAdd = cloudCodesInbound.length;
        $.post('/inbound/' + numberToAdd, function (data, status) {

        })
    });




    $(document).on('click', '#checkoutSubmitButton', function () {
        var cloudCodes = $('#cloudCodes').val();
        alert(cloudCodes);
    });
    
    $(document).on('click', '#addModel' ,function () {
        var model = encodeURIComponent($('#model').val());
        $.post('/addModel/' + model, function (data, status) {
            if (data == 'OK') {
                setTimeout(function () {
                    $('#model').val('');
                }, 1000);
                $('#modelAddedFeedback').html('<b>   添加成功！</b>');
                setTimeout(function () {
                    $('#modelAddedFeedback').html('');
                }, 3000);
            }
        })
    });

    $(document).on('click', '#addAgentButton', function () {
        var address = $('#address').val(),
            phone = $('#phone').val(),
            name = $('#name').val(),
            username = $('#Email').val(),
            password = $('#Password').val(),
            agentObj = {
                address: address,
                phone: phone,
                name: name,
                username: username,
                password: password
            };


        var request = $.ajax({
            url: '/addAgent',
            type: 'POST',
            data: JSON.stringify(agentObj),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false
        });

        request.done(function (msg) {
            $('#agentAddedFeedback').html('<b>   代理商添加成功！</b>')
            setTimeout(function () {
                $('#address').val('');
                $('#phone').val('');
                $('#name').val('');
                $('#Email').val('');
                $('#Password').val('');
            }, 1000)
        });

        request.fail(function (jqXHR, textStatus) {
            $('#agentAddedFeedback').html('<b>   代理商添加失败</b>！')
            setTimeout(function () {
                $('#address').val('');
                $('#phone').val('');
                $('#name').val('');
                $('#Email').val('');
                $('#Password').val('');
            }, 1000)
        });

    })

});
