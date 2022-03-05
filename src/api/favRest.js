import { axiosPost } from './config'

/**
 * 맛집 추가 삭제
 */
export const procFavRest = (restId, restNm, addr, latCdnt, lngCdnt, userId, restTp, favMenu, favRestYn) => {
  return axiosPost('/fav-rest/proc', {
    REST_ID     : restId,
    REST_NM     : restNm,
    ADDR        : addr,
    LAT_CDNT    : latCdnt,
    LNG_CDNT    : lngCdnt,
    USER_ID     : userId,
    REST_TP     : restTp,
    FAV_MENU    : favMenu,
    FAV_REST_YN : favRestYn
  })
}
