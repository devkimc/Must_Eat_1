import { axiosPost } from './config'

/**
 * 로그인
 */
export const Login = (userId, userPw) => {
  return axiosPost('/auth/login', {
    USER_ID: userId,
    USER_PW: userPw
  })
}
