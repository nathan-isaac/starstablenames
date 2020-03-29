import { HttpNameListGateway, NameListGateway } from '~/src/gateways/names'
import { InMemoryUsedGateway, UsedGateway } from '~/src/gateways/used'
import { InMemoryLikesGateway, LikesGateway } from '~/src/gateways/likes'

interface ViewName {
  uid: string
  fullName: string
  liked: boolean
  used: boolean
}

interface ViewModel {
  names: ViewName[]
}

export class Names {
  private nameListGateway: NameListGateway
  private likesGateway: LikesGateway
  private usedGateway: UsedGateway
  static instance: Names

  constructor(
    nameListGateway: NameListGateway,
    likesGateway: LikesGateway,
    usedGateway: UsedGateway
  ) {
    this.nameListGateway = nameListGateway
    this.likesGateway = likesGateway
    this.usedGateway = usedGateway
  }

  async load(): Promise<ViewModel> {
    const allNames = await this.nameListGateway.getAll()
    const names = await Promise.all(
      allNames.map(async (name) => {
        return {
          uid: name.uid,
          fullName: name.fullName,
          liked: await this.likesGateway.hasLike(name.uid),
          used: await this.usedGateway.isUsed(name.uid)
        }
      })
    )

    return Promise.resolve({
      names
    })
  }

  toggleLike(uid: string): Promise<ViewModel> {
    return this.likesGateway.toggleLike(uid).then(() => {
      return this.load()
    })
  }

  toggleUsed(uid: string): Promise<ViewModel> {
    return this.usedGateway.toggleUsed(uid).then(() => {
      return this.load()
    })
  }

  static make(): Names {
    if (!Names.instance) {
      Names.instance = new Names(
        new HttpNameListGateway(),
        new InMemoryLikesGateway(),
        new InMemoryUsedGateway()
      )
    }

    return Names.instance
  }
}
