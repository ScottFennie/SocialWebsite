import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { convertToQuery } from '../utils/Query'

class PostsService {
  async getPosts(query = {}) {
    AppState.posts = []
    logger.log('query', query)
    const res = await api.get('api/posts' + convertToQuery(query))
    logger.log('post res', res)
    AppState.posts = res.data.posts
  }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    logger.log('this is the new post', res)
    AppState.posts.unshift(res.data)
  }

  async likePost(id) {
    const res = await api.post(`api/posts/${id}/like`)
    logger.log('this is the like', res)
  }
}

export const postsService = new PostsService()
