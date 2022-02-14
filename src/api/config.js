import axios from 'axios'
import qs from 'qs'

const host = 'http://localhost:9000'

// 사용자 에러 처리
export const axiosPost = (url, params) => {
  return new Promise(function (resolve, reject) {
    axios
      .post(host + url, qs.stringify(params))
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        console.log(err)
      })
  })
}

export const axiosGet = (url, resType) => {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'GET',
      url: host + url,
      responseType: resType
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        console.log(err)
      })
  })
}
