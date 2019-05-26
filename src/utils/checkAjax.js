const checkAjax = function (res, errorMap = {}) {
  return new Promise((resolve, reject) => {
    if (res.errno === 0) {
      resolve(res.data)
    } else {
      reject({ message: errorMap[res.errno] || res.errmsg })
    }
  })
}

export default checkAjax
