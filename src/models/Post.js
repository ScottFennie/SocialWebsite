export class Post {
  constructor(data) {
    this.creatorId = data.creatorId
    this.imgUrl = data.imgUrl
    this.body = data.body
    this.creator = data.creator || {}
    this.likes = data.likes
    this.likeIds = data.LikeIds
  }
}
