import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostsService {
  async getPosts(query = {}) {
    AppState.posts = []
    logger.log('query', query)
    const res = await api.get('api/posts')
    logger.log('post res', res)
    AppState.posts = res.data.posts
  }
}

export const postsService = new PostsService()
