console.log("deferred.js start");

/** done() と fail() と Promise */
function onSuccess() {
    console.log("成功");
}

function onFailure() {
    console.log("失敗");
}

$.ajax('deferred.html',{
    success: onSuccess,
    error: onFailure
});

/**
 * Deferred / Promiseの仕組みを使って書き直す
 */
var promise = $.ajax('deferred.html');
promise.done(onSuccess);
promise.fail(onFailure);

/** 引数  */
promise.done(function(data, textStatus, jqXHR) {
    // dataでサーバからのデータを受け取れる
});

/** Deferred */

function onSuccess1() {
    console.log("成功1");
}

function onSuccess2() {
    console.log("成功2");
}

function onFailure() {
    console.log("失敗");
}

var defer = $.Deferred();
defer.done(onSuccess1);
defer.done(onSuccess2);
defer.fail(onFailure);

defer.resolve();
// defer.reject();

function preload(url) {
    var defer = $.Deferred();
    var img  = new Image();

    img.onload = function() {
        defer.resolve();
    }

    img.onerror = function() {
        defer.reject;
    }

    img.src = url;

    return defer.promise();
}

var promise = preload("logo.gif");

promise.done(function() {
    console.log("画像の先読み完了");
});

promise.fail(function() {
    console.log("画像の先読み失敗");
});

/** then */

$.ajax({
    url: 'deferred.html'
})
.then(onSuccess, onFailure);