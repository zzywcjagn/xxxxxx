/*
------------------------------------------
@Author: sm
@Date: 2024.06.07 19:15
@Description: 测试
------------------------------------------
#Notice:
⚠️【免责声明】
------------------------------------------
1、此脚本仅用于学习研究，不保证其合法性、准确性、有效性，请根据情况自行判断，本人对此不承担任何保证责任。
2、由于此脚本仅用于学习研究，您必须在下载后 24 小时内将所有内容从您的计算机或手机或任何存储设备中完全删除，若违反规定引起任何事件本人对此均不负责。
3、请勿将此脚本用于任何商业或非法目的，若违反规定请自行对此负责。
4、此脚本涉及应用与本人无关，本人对因此引起的任何隐私泄漏或其他后果不承担任何责任。
5、本人对任何脚本引发的问题概不负责，包括但不限于由脚本错误引起的任何损失和损害。
6、如果任何单位或个人认为此脚本可能涉嫌侵犯其权利，应及时通知并提供身份证明，所有权证明，我们将在收到认证文件确认后删除此脚本。
7、所有直接或间接使用、查看此脚本的人均应该仔细阅读此声明。本人保留随时更改或补充此声明的权利。一旦您使用或复制了此脚本，即视为您已接受此免责声明。
*/

const $ = new Env("电信签到");
let ckName = `testA`;
const strSplitor = "#";
const envSplitor = ["&", "\n"];
process.env[ckName] = "18120900263#349832"
const notify = "";
const axios = require("axios");
const _0x3c561e = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBkLT15ThVgz6/NOl6s8GNPofdWzWbCkWnkaAm7O2LjkM1H7dMvzkiqdxU02jamGRHLX/ZNMCXHnPcW/sDhiFCBN18qFvy8g6VYb9QtroI09e176s+ZCtiv7hbin2cCTj99iUpnEloZm19lwHyo69u5UMiPMpq0/XKBO8lYhN/gwIDAQAB";

const defaultUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.31(0x18001e31) NetType/WIFI Language/zh_CN miniProgram"
const _0x1e9565 = "-----BEGIN PUBLIC KEY-----\n" + _0x3c561e + "\n-----END PUBLIC KEY-----";
const _0x516f15 = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+ugG5A8cZ3FqUKDwM57GM4io6JGcStivT8UdGt67PEOihLZTw3P7371+N47PrmsCpnTRzbTgcupKtUv8ImZalYk65dU8rjC/ridwhw9ffW2LBwvkEnDkkKKRi2liWIItDftJVBiWOh17o6gfbPoNrWORcAdcbpk2L+udld5kZNwIDAQAB";
const _0x4995b7 = "-----BEGIN PUBLIC KEY-----\n" + _0x516f15 + "\n-----END PUBLIC KEY-----";
const _0x51cf70 = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIPOHtjs6p4sTlpFvrx+ESsYkEvyT4JB/dcEbU6C8+yclpcmWEvwZFymqlKQq89laSH4IxUsPJHKIOiYAMzNibhED1swzecH5XLKEAJclopJqoO95o8W63Euq6K+AKMzyZt1SEqtZ0mXsN8UPnuN/5aoB3kbPLYpfEwBbhto6yrwIDAQAB";
const _0x2e5ddf = "-----BEGIN PUBLIC KEY-----\n" + _0x51cf70 + "\n-----END PUBLIC KEY-----";
const NodeRsa = require("node-rsa");
let rsa = new NodeRsa(_0x1e9565);
class Public {
    async request(options) {
        return await axios.request(options);
    }
}
class Task extends Public {
    constructor(env) {

        super();
        this.index = $.userIdx++
        let user = env.split(strSplitor);
        this.name = user[0];
        this.passwd = user[1];
    }
    encode_phone() {
        let name = this.name.split("");
        for (let i in name) {
            name[i] = String.fromCharCode(name[i].charCodeAt(0) + 2);
        }
        return name.join("");
    }
    async login() {

        try {
            let time = $.time("yyyyMMddhhmmss");


            let UA = "iPhone 14 15.4." + $.randomString(16) + this.name + time + this.passwd + "0$$$0.";
            let options = {
                method: "POST",
                url: "https://appgologin.189.cn:9031/login/client/userLoginNormal",
                headers: {
                    "Content-Type": "application/json",

                },
                data: {
                    headerInfos: {
                        code: "userLoginNormal",
                        timestamp: time,
                        broadAccount: "",
                        broadToken: "",
                        clientType: "#9.6.1#channel50#iPhone 14 Pro Max#",
                        shopId: "20002",
                        source: "110003",
                        sourcePassword: "Sid98s",
                        token: "",
                        userLoginName: this.name
                    },
                    content: {
                        attach: "test",
                        fieldData: {
                            loginType: "4",
                            accountType: "",
                            loginAuthCipherAsymmertric: rsa.encrypt(UA, "base64"),
                            deviceUid: $.randomString(16),
                            phoneNum: this.encode_phone(),
                            isChinatelecom: "0",
                            systemVersion: "15.4.0",
                            authentication: this.passwd
                        }
                    }
                }

            };
            let { data: result } = await this.request(options);
            console.log(result);

            /*
            if (_0x107431 == "0000") {
                let {
                    userId = "",
                    token = ""
                } = _0x3cbd6a?.["responseData"]?.["data"]?.["loginSuccessResult"] || {};
                this.userId = userId;
                this.token = token;
                $.log("使用服务密码登录成功");
                _0x1d3d6d[this.name] = {
                    token: token,
                    userId: userId,
                    t: Date.now()
                };
                _0x4e4355();
            } else {
                let _0xf8ba30 = _0x3cbd6a?.["msg"] || _0x3cbd6a?.["responseData"]?.["resultDesc"] || _0x3cbd6a?.["headerInfos"]?.["reason"] || "";
                $.log("服务密码登录失败[" + _0x107431 + "]: " + _0xf8ba30);
            }*/
        } catch (e) {
            console.log(e);
        }

    }
    async run() {

        await this.login()
        if (!(await this.get_ticket())) {
            return;
        }
        if (!(await this.get_sign())) {
            return;
        }

        console.log(this.index);

    }
}


!(async () => {
    await getNotice()
    $.checkEnv(ckName);

    for (let user of $.userList) {
        //

        await new Task(user).run();

    }


})()
    .catch((e) => console.log(e))
    .finally(() => $.done());

async function getNotice() {
    let options = {
        url: `https://gitee.com/smallfawn/Note/raw/main/Notice.json`,
        headers: {
            "User-Agent": defaultUserAgent,
        }
    }
    let { data: res } = await new Public().request(options);
    return res
}


// prettier-ignore
function Env(t, s) {
    return new (class {
        constructor(t, s) {
            this.userIdx = 1;
            this.userList = [];
            this.userCount = 0;
            this.name = t;
            this.notifyStr = [];
            this.logSeparator = "\n";
            this.startTime = new Date().getTime();
            Object.assign(this, s);
            this.log(`\ud83d\udd14${this.name},\u5f00\u59cb!`);
        }
        checkEnv(ckName) {
            let userCookie = (this.isNode() ? process.env[ckName] : "") || "";
            this.userList = userCookie.split(envSplitor.find((o) => userCookie.includes(o)) || "&").filter((n) => n);
            this.userCount = this.userList.length;
            this.log(`共找到${this.userCount}个账号`);
        }
        async sendMsg() {
            this.log("==============📣Center 通知📣==============")
            let message = this.notifyStr.join(this.logSeparator);
            if (this.isNode()) {

                await notify.sendNotify(this.name, message);
            } else {

            }
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports;
        }

        queryStr(options) {
            return Object.entries(options)
                .map(
                    ([key, value]) =>
                        `${key}=${typeof value === "object" ? JSON.stringify(value) : value
                        }`
                )
                .join("&");
        }
        getURLParams(url) {
            const params = {};
            const queryString = url.split("?")[1];
            if (queryString) {
                const paramPairs = queryString.split("&");
                paramPairs.forEach((pair) => {
                    const [key, value] = pair.split("=");
                    params[key] = value;
                });
            }
            return params;
        }
        isJSONString(str) {
            try {
                return JSON.parse(str) && typeof JSON.parse(str) === "object";
            } catch (e) {
                return false;
            }
        }
        isJson(obj) {
            var isjson =
                typeof obj == "object" &&
                Object.prototype.toString.call(obj).toLowerCase() ==
                "[object object]" &&
                !obj.length;
            return isjson;
        }

        randomNumber(length) {
            const characters = "0123456789";
            return Array.from(
                { length },
                () => characters[Math.floor(Math.random() * characters.length)]
            ).join("");
        }
        randomString(length) {
            const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
            return Array.from(
                { length },
                () => characters[Math.floor(Math.random() * characters.length)]
            ).join("");
        }
        uuid() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                function (c) {
                    var r = (Math.random() * 16) | 0,
                        v = c == "x" ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                }
            );
        }
        time(t) {
            let s = {
                "M+": new Date().getMonth() + 1,
                "d+": new Date().getDate(),
                "H+": new Date().getHours(),
                "m+": new Date().getMinutes(),
                "s+": new Date().getSeconds(),
                "q+": Math.floor((new Date().getMonth() + 3) / 3),
                S: new Date().getMilliseconds(),
            };
            /(y+)/.test(t) &&
                (t = t.replace(
                    RegExp.$1,
                    (new Date().getFullYear() + "").substr(4 - RegExp.$1.length)
                ));
            for (let e in s) {
                new RegExp("(" + e + ")").test(t) &&
                    (t = t.replace(
                        RegExp.$1,
                        1 == RegExp.$1.length
                            ? s[e]
                            : ("00" + s[e]).substr(("" + s[e]).length)
                    ));
            }
            return t;
        }

        log(content) {
            this.notifyStr.push(content)
            console.log(content)
        }
        wait(t) {
            return new Promise((s) => setTimeout(s, t));
        }
        done(t = {}) {
            this.sendMsg();
            const s = new Date().getTime(),
                e = (s - this.startTime) / 1e3;
            $.log(
                `\ud83d\udd14${this.name},\u7ed3\u675f!\ud83d\udd5b ${e}\u79d2`
            );
            if (this.isNode()) {
                process.exit(1);
            }
        }
    })(t, s);
}