import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProfileService {
  async getPostsById(id, page = 1) {
    AppState.posts = []
    const res = await api.get(`api/profiles/${id}/posts` + `?page=${page}`)
    AppState.posts = res.data.posts

    // This is the current page number
    const ps1 = res.data.page.charAt(0)
    AppState.currentpage = Number(ps1)
    // This is the total page numbers
    const ps2 = res.data.page
    const last = ps2.charAt(ps2.length - 1)
    AppState.totalpages = Number(last)
    logger.log('appstate total number prof', res.data.page)
  }

  async getProfileById(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.profile = res.data
    logger.log('this is the profile we got', res)
  }
}

export const profileService = new ProfileService()
