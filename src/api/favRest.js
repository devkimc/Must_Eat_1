import { axiosPost } from './config'

/**
 * 즐겨찾기 맛집 조회
 */
 export const getFavRestInfo = (userId) => {
  return axiosPost('/fav-rest/info', {
    USER_ID : 'TEST_ID'
  })
}

/**
 * 즐겨찾기 맛집 추가 삭제
 */
export const procFavRest = (restId, restNm, addr, cateId, cateNm, latCdnt, lngCdnt, userId, insYn) => {
  return axiosPost('/fav-rest/proc', {
    REST_ID  : restId,
    REST_NM  : restNm,
    ADDR     : addr,
    CATE_ID  : cateId,
    CATE_NM  : cateNm,
    LAT_CDNT : latCdnt,
    LNG_CDNT : lngCdnt,
    USER_ID  : 'TEST_ID',
    INS_YN   : insYn
  })
}
