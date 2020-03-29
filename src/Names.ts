import {
  HttpNameListGateway,
  Name,
  NameListGateway
} from '~/src/gateways/names'
import {
  InMemoryUsedGateway,
  LocalStorageUsedGateway,
  UsedGateway
} from '~/src/gateways/used'
import {
  InMemoryLikesGateway,
  LikesGateway,
  LocalStorageLikesGateway
} from '~/src/gateways/likes'

interface ViewName {
  uid: string
  fullName: string
  liked: boolean
  used: boolean
}

interface ViewModel {
  names: ViewName[]
}

interface Page {
  startIndex: number
  endIndex: number
  numberOfPages: number
}

export class Names {
  private nameListGateway: NameListGateway
  private likesGateway: LikesGateway
  private usedGateway: UsedGateway
  private allNames: Name[]
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

  async load(page: number = 1): Promise<ViewModel> {
    console.log(page)
    this.allNames = await this.nameListGateway.getAll()

    const itemLength = this.allNames.length
    const itemsPerPage = 10

    const numberOfPages = Math.round(itemLength / itemsPerPage)
    const offset = (page - 1) * itemsPerPage + 1;

    console.log(offset, offset + itemsPerPage - 1)

    const names = await Promise.all(
      this.allNames
        .slice(offset - 1, offset - 1 + itemsPerPage)
        .map(async (name) => {
          return {
            uid: name.uid,
            fullName: name.fullName,
            liked: await this.likesGateway.hasLike(name.uid),
            used: await this.usedGateway.isUsed(name.uid)
          }
        })
    )

    return Promise.resolve({
      names,
      pagination: {
        currentPage: page,
        previousPage: page - 1 > 1 ? page - 1 : 1,
        nextPage: page + 1 < numberOfPages ? page + 1 : page,
        totalPages: numberOfPages,
        offsetStart: offset,
        offsetEnd: offset + itemsPerPage - 1
      }
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
        new LocalStorageLikesGateway(),
        new LocalStorageUsedGateway()
      )
    }

    return Names.instance
  }
}
