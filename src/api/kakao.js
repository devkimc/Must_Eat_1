import { axiosPost } from './config'

/**
 *  카카오 플레이스 장소 조회 (place.map.kakao API)
 */
export const getKakaoPlaceInfo = (placeId) => {
  return axiosPost('/kakao/place/info', {
    PLACE_ID : placeId,
  })
}
