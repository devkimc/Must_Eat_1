import axios from 'axios'
import qs from 'qs'

const host = `${location.protocol}//${process.env.R_URL}`

export const axiosPost = (url, params, config) => {
  return new Promise(function (resolve, reject) {
    axios
      .post(host + url, qs.stringify(params), config)
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        console.log(err)
      })
  })
}
