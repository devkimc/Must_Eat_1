import { axiosPostKaKaoMap } from './config'

/**
 * 로그인
 */
export const getRestInfo = (placeId) => {
  return axiosPostKaKaoMap({
    cid: placeId
  })
}
