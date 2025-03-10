import os
import threading
import time
import uvicorn
import httpx
import fastapi
import subprocess
# 重写 subprocess.Popen 类
class MySubprocessPopen(subprocess.Popen):
    def __init__(self, *args, **kwargs):
        # 在调用父类（即 subprocess.Popen）的构造方法时，将 encoding 参数直接置为 UTF-8 编码格式
        super().__init__(*args, encoding='UTF-8', **kwargs)  # Ensure encoding is passed correctly

subprocess.Popen = MySubprocessPopen
os.environ["EXECJS_RUNTIME"] = "Node"

import execjs


httpx._config.DEFAULT_CIPHERS += ":ALL:@SECLEVEL=1"
diffValue = 2
filename = 'Cache.js'
if os.path.exists(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        fileContent = file.read()
else:
    fileContent = ''



def printn(m):
    print(f'\n{m}')


def initCookie(resRe='', url=''):
    global js_code_ym, fileContent
    cookie = ''
    getUrl = ''
    if resRe and url:
        getUrl = url
        response = resRe
    else:
        getUrl = 'https://wapside.189.cn:9001/jt-sign/ssoHomLogin'
        cookie = ''
        response = httpx.post(getUrl)

    content = response.text.split(' content="')[2].split('" r=')[0]
    code1 = response.text.split('$_ts=window')[1].split(
        '</script><script type="text/javascript"')[0]
    code1Content = '$_ts=window' + code1
    Url = response.text.split(
        '$_ts.lcd();</script><script type="text/javascript" charset="utf-8" src="')[1].split('" r=')[0]
    urls = getUrl.split('/')
    rsurl = urls[0] + '//' + urls[2] + Url
    filename = 'Cache.js'
    if fileContent == '':
        if not os.path.exists(filename):
            fileRes = httpx.get(rsurl)
            fileContent = fileRes.text
            if fileRes.status_code == 200:
                with open(filename, 'w', encoding='utf-8') as file:
                    file.write(fileRes.text)
            else:
                print(
                    f"Failed to download {rsurl}. Status code: {fileRes.status_code}")
    if response.headers['Set-Cookie']:
        cookie = response.headers['Set-Cookie'].split(';')[0].split('=')[1]
    runJs = js_code_ym.replace('content_code', content).replace(
        "'ts_code'", code1Content + fileContent)
    execjsRun = RefererCookie(runJs)
    return {
        'cookie': cookie,
        'execjsRun': execjsRun
    }




def RefererCookie(runJs):
    try:
        execjsRun = execjs.compile(runJs)
        return execjsRun
    except execjs._exceptions.CompileError as e:
        print(f"JavaScript 编译错误: {e}")
    except execjs._exceptions.RuntimeError as e:
        print(f"JavaScript 运行时错误: {e}")
    except Exception as e:
        print(f"其他错误: {e}")


js_code_ym = '''delete __filename
delete __dirname
ActiveXObject = undefined

window = global;

content="content_code"

navigator = {"platform": "Linux aarch64"}
navigator = {"userAgent": "CtClient;11.0.0;Android;13;22081212C;NTIyMTcw!#!MTUzNzY"}

location={
    "href": "https://",
    "origin": "",
    "protocol": "",
    "host": "",
    "hostname": "",
    "port": "",
    "pathname": "",
    "search": "",
    "hash": ""
}

i = {length: 0}
base = {length: 0}
div = {
    getElementsByTagName: function (res) {
        if (res === 'i') {
            return i
        }
    return '<div></div>'

    }
}

script = {

}
meta = [
    {charset:"UTF-8"},
    {
        content: content,
        getAttribute: function (res) {
            if (res === 'r') {
                return 'm'
            }
        },
        parentNode: {
            removeChild: function (res) {

              return content
            }
        },

    }
]
form = '<form></form>'

window.addEventListener= function (res) {

    }

document = {
    createElement: function (res) {

       if (res === 'div') {
            return div
        } else if (res === 'form') {
            return form
        }
        else{return res}




    },
    addEventListener: function (res) {

    },
    appendChild: function (res) {
        return res
    },
    removeChild: function (res) {
    },
    getElementsByTagName: function (res) {
        if (res === 'script') {
            return script
        }
        if (res === 'meta') {
            return meta
        }
        if (res === 'base') {
            return base
        }
    },
    getElementById: function (res) {
        if (res === 'root-hammerhead-shadow-ui') {
            return null
        }
    }

}

setInterval = function () {}
setTimeout = function () {}
window.top = window

'ts_code'

function main() {
    cookie = document.cookie.split(';')[0]
    return cookie
}'''

init_result=''

def main():
    if init_result:
        cookie = init_result['cookie']
        execjsRun = init_result['execjsRun']
    else:
        print("初始化 cookies 失败")
        return {}

    runcookie = {
        'cookie': cookie,
        'execjsRun': execjsRun
    }

    # 添加输出 cookies 的代码
    cookies = f"yiUIIlbdQT3fO={runcookie['cookie']}; yiUIIlbdQT3fP={runcookie['execjsRun'].call('main').split('=')[1]}"
    return cookies

def refresh_every_three_minutes():
    while True:
        print("Refreshing...")
        httpx.get("http://127.0.0.1:8000/init")
        time.sleep(1200)  # Sleep for 180 seconds (3 minutes)

def start_refresh_process():
    refresh_thread = threading.Thread(target=refresh_every_three_minutes)
    refresh_thread.daemon = True
    refresh_thread.start()



app = fastapi.FastAPI()

@app.get("/init")
async  def init():
    global init_result
    init_result = initCookie()
    return 'ok'

@app.get("/get_cookie")
async def read_root():
    result =main()
    return result

if __name__ == "__main__":
    start_refresh_process()
    uvicorn.run("ruishu:app")
