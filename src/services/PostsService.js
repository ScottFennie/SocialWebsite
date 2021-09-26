import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { convertToQuery } from '../utils/Query'
import { Post } from '../models/Post'

class PostsService {
  async getPosts(query = {}, page = 1) {
    // AppState.posts = []
    logger.log('query', query)
    const res = await api.get('api/posts' + convertToQuery(query) + `?page=${page}`)
    logger.log('post res', res)
    AppState.posts = res.data.posts
    // This is the current page number
    const ps1 = res.data.page.charAt(0)
    AppState.currentpage = Number(ps1)
    // This is the total page numbers
    const ps2 = res.data.page
    const last = ps2.charAt(ps2.length - 1)
    AppState.totalpages = Number(last)
    logger.log('appstate total number', AppState.totalpages)
  }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    logger.log('this is the new post', res)
    AppState.posts.unshift(res.data)
  }

  async likePost(id) {
    const res = await api.post(`api/posts/${id}/like`)
    const i = AppState.posts.findIndex(p => p.id === id)
    AppState.posts.splice(i, 1, res.data)
    AppState.posts = [...AppState.posts]
    logger.log('this is the like', res)
  }

  async findPosts(query) {
    const res = await api.get(`api/posts?query=${query}`)
    AppState.posts = res.data.posts
  }

  async deletePost(id) {
    const res = await api.delete(`api/posts/${id}`)
    logger.log('deleted res', res)
    AppState.posts = AppState.posts.filter(p => p.id !== id)
  }
}

export const postsService = new PostsService()
