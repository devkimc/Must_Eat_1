import { axiosPost } from './config'

/**
 * 맛집 추가 삭제
 */
export const procFavRest = (restId, restNm, addr, cateId, cateNm, latCdnt, lngCdnt, userId, favRestYn) => {
  return axiosPost('/fav-rest/proc', {
    REST_ID     : restId,
    REST_NM     : restNm,
    ADDR        : addr,
    CATE_ID     : cateId,
    CATE_NM     : cateNm,
    LAT_CDNT    : latCdnt,
    LNG_CDNT    : lngCdnt,
    USER_ID     : userId,
    FAV_REST_YN : favRestYn
  })
}
