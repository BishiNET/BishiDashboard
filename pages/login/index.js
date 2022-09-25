import Head from 'next/head'
import { LockClosedIcon } from '@heroicons/react/solid'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import Router from 'next/router'


function Login({ csrf, _cookie }) {

  const [open, setOpen] = useState(false)
  const [fail, setFail] = useState(false)
  const [msg, msgState] = useState('Default');
  const [tittle, tittleState] = useState('Default');

  const cancelButtonRef = useRef(null)
  const DoAlert = (e, _tittle, _msg) => {
    e.preventDefault()
    setOpen(true)
    msgState(_msg)
    tittleState(_tittle)
  }
  const DoFail = (e, _msg) => {
    e.preventDefault()
    setFail(true)
    msgState(_msg)
  }

  const postForm = async e => {
    e.preventDefault()
    fail && setFail(false)
    var cookie = require('cookie-cutter');

    cookie.set('PHPSESSID', _cookie, { expires: (new Date().getTime()) + 86400 });



    var _time = Math.floor(Math.round(new Date().getTime() / 1000) / 300)
    var token = e.target.token.value
    var name = e.target.username.value
    var vtk = csrf
    var crypto = require("crypto-js");
    var ttk = crypto.HmacSHA256(_time + vtk + name, crypto.SHA1(_time + vtk + token).toString(crypto.enc.Hex)).toString(crypto.enc.Hex)
    const res = await fetch(
      '',
      {
        body: JSON.stringify({
          username: name,
          isRemember: e.target.rememberme.value,
          token: token,
          ttk: ttk,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST'
      }
    )
    const result = await res.json()
    if (result.status != 0) {
      if (result.status == 101) {
        setFail(true)
        msgState("CSRF Token认证错误，请刷新页面重试")

      } else if (result.status == 102) {
        setFail(true)
        msgState("用户名或者密码错误")

      } else if (result.status == 103) {
        setFail(true)
        msgState("用户名不存在")

      } else if (result.status == 104) {
        setFail(true)
        msgState("未知错误，请刷新页面重试")

      }

    } else {
      Router.push('/dash')

    }
  }

  const Alert = () => (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      {tittle}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {msg}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  关闭
                </button>

              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )


  const Fail = () => (
    <div className="relative px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg" role="alert">
      <span className="absolute inset-y-0 left-0 flex items-center ml-4">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
      </span>
      <p className="ml-6">{msg}</p>
    </div>
  )

  return (
    <div className='bg-gray-50 h-screen'>
      <div id="container" className="flex items-center justify-center h-full lg:py-12 py-10 px-3 sm:px-6 lg:px-8">
        <Head>
          <title>登录</title>
          <link rel="icon" href="/logo.ico" />
          <link href="https://fonts.googleapis.com/css?family=Noto%20Sans%20SC|Inter" rel="stylesheet" type="text/css" />
        </Head>
        {open ? <Alert /> : null}
        <div className="max-w-md w-full space-y-8 font-bishi">
          <div>
            <img
              className="mx-auto h-13 w-auto"
              src="/logo.png"
              alt="Bishi"
            />

            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 ">登录到碧狮</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => DoAlert(event, "很抱歉", "我们暂未开放注册")}>
                注册账号?
              </a>
            </p>
          </div>
          {fail ? <Fail /> : null}

          <form className="mt-8 space-y-6" onSubmit={postForm}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm ">
              <div className="mt-5">
                <label htmlFor="username" className="mr-4 text-gray-700 font-bold inline-block mb-2" >
                  用户名
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="rounded-md   relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="请输入您的用户名"
                />
              </div>
              <div className="mt-5">
                <label htmlFor="token" className="mr-4 text-gray-700 font-bold inline-block mb-2">
                  Token
                </label>
                <input
                  id="token"
                  name="token"
                  type="password"
                  required
                  className="rounded-md   relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="请输入您的Token"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberme"
                  name="rememberme"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberme" className="ml-2 block text-sm text-gray-900">
                  记住我
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => DoAlert(event, "很抱歉", "由于Token使用了SHA-256散列算法加密，且我们不保存任何备份，因此目前没有别的办法找回Token，请联系管理员重设Token")}>
                  丢失Token?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                登录
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const r = await fetch('',
    {
      headers: {
        'Content-Type': 'application/json',
        'cookie': ctx.req.headers.cookie
      }
    })
  const data = await r.json()

  if (data.status == "1") {
    return {
      redirect: {
        destination: '/dash',
        permanent: false,
      },
    }
  }
  return {
    props: {
      csrf: data.csrf,
      _cookie: data.cookie
    }, // will be passed to the page component as props
  }


}

export default Login
