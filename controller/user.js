var express = require("express");
var router = express.Router();
var userModel = require("../model/user");

router.post("/user", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const number = Math.ceil(Math.random() * 9);
        const avatar = `http://pbl.yaojunrong.com/avatar${number}.jpg`;
        if (username) {
            if (password && password.length >= 5) {
                const data = await userModel.create({
                    username,
                    email,
                    password,
                    avatar
                });
                res.json({
                    code: 200,
                    msg: "注册成功"
                });
            } else {
                res.json({
                    code: 400,
                    msg: "密码长度不符合要求。"
                });
            }
        } else {
            res.json({
                code: 400,
                msg: "请输入用户名"
            });
        }
    } catch (err) {
        res.json({
            code: 400,
            msg: `缺少必要参数`,
            err
        });
        next(err);
    }
});
router.get("/logout", (req, res) => {
    if (req.session.user) {
        req.session.user = null;
        res.json({
            code: 200,
            msg: "退出登录成功"
        });
    } else {
        res.json({
            code: 403,
            msg: "不能在未登录状态下退出登录"
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginData = await userModel.findOne({ email });
        if (!loginData) {
            res.json({
                code: 400,
                msg: "用户不存在"
            });
        } else {
            if (password && password === loginData.password) {
                req.session.user = loginData;
                res.json({
                    code: 200,
                    msg: "登录成功",
                    userData: {
                        email: loginData.email,
                        username: loginData.username,
                        avatar: loginData.avatar,
                        desc: loginData.desc
                    }
                });
            } else {
                res.json({
                    code: 400,
                    msg: "密码不正确"
                });
            }
        }
    } catch (err) {
        res.json({
            code: 400,
            msg: err
        });
    }
});
module.exports = router;
