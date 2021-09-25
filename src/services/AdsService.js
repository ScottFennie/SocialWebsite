import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AdsService {
  async getAds() {
    AppState.ads = []
    const res = await api.get('api/ads')
    logger.log('post res', res)
    AppState.ads = res.data
  }
}

export const adsService = new AdsService()
