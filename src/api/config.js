import axios from 'axios'
import qs from 'qs'

const host = `${location.protocol}//${process.env.R_URL}`
const kakaoMapHost = 'https://place.map.kakao.com/main/v/1968272068'

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

export const axiosPostKaKaoMap = (params) => {
  return new Promise(function (resolve, reject) {
    axios
      .get(kakaoMapHost)
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        console.log(err)
      })
  })
}
