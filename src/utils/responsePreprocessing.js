import { Modal } from 'antd'

const responsePreprocessing = function (res, silent = false, errorMap = {}) {
  return new Promise((resolve, reject) => {
    const resData = res.data
    if (resData.errno === 0) {
      // response ok
      resolve(resData.data)
    } else {
      // response with error
      const message = errorMap[resData.errno] || resData.errmsg

      switch (resData.errno) {
        case 1001:
          // not login
          Modal.error({
            title: '错误',
            content: '未登录，3秒后跳转至登录页面…',
            okButtonProps: { style: { display: 'none' } },
            cancelButtonProps: { style: { display: 'none' } }
          })

          setTimeout(() => {
            window.location.href = '/login/'
          }, 3000)
          break

        default:
          // default error
          if (!silent) {
            Modal.error({
              title: '错误',
              content: message || '发生错误…'
            })
          }
          break
      }

      reject(new Error(message))
    }
  })
}

export default responsePreprocessing
