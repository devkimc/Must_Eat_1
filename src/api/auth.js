import { axiosPost } from './config'

/**
 * 로그인
 */
export const login = (userId, userPw) => {
  return axiosPost('/auth/login', {
    USER_ID : userId,
    USER_PW : userPw
  })
}

/**
 * 토큰 유효성 검사
 */
export const checkToken = () => {
  const token = localStorage.getItem('jwt')
  return axiosPost('/auth/token', {}, 
    {
      headers: {
        Authorization: token
      }
    }
  )
}