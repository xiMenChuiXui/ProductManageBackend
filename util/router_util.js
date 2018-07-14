'use strict'

function success(res, data) {
    res.send({
        code: 0,
        data: data,
        msg: "操作成功"
    });
}

function fail(res, msg) {
    res.send({
        code: -1,
        msg: msg
    })
}

module.exports = {
    success, fail
}