export interface LikesGateway {
  hasLike(uid: string): Promise<boolean>

  toggleLike(uid: string): Promise<void>
}

export class InMemoryLikesGateway implements LikesGateway {
  protected likes: Set<string>

  constructor(likes: string[] = []) {
    this.likes = new Set(likes)
  }

  hasLike(uid: string): Promise<boolean> {
    return Promise.resolve(this.likes.has(uid))
  }

  toggleLike(uid: string): Promise<void> {
    if (this.likes.has(uid)) {
      this.likes.delete(uid)
    } else {
      this.likes.add(uid)
    }

    return Promise.resolve()
  }
}
