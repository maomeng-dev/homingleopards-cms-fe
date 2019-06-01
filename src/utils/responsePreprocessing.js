import { Modal } from 'antd'

const responsePreprocessing = function (res, silent = false, errorMap = {}) {
  return new Promise((resolve, reject) => {
    let resData = res.data
    if (resData.errno === 0) {
      resolve(resData.data)
    } else {
      let message = errorMap[resData.errno] || resData.errmsg

      if (!silent) {
        Modal.error({
          title: '错误',
          content: message || '发生错误…'
        })
      }

      reject({ message })
    }
  })
}

export default responsePreprocessing
