import {
  HttpNameListGateway,
  Name,
  NameListGateway
} from '~/src/gateways/names'
import { LocalStorageUsedGateway, UsedGateway } from '~/src/gateways/used'
import { LikesGateway, LocalStorageLikesGateway } from '~/src/gateways/likes'

interface ViewName {
  uid: string
  fullName: string
  liked: boolean
  used: boolean
}

export interface ViewModel {
  names: ViewName[]
  pagination: {
    currentPage: number
    previousPage: number
    nextPage: number
    totalPages: number
    offsetStart: number
    offsetEnd: number
  }
}

export class Names {
  static instance: Names
  private nameListGateway: NameListGateway
  private likesGateway: LikesGateway
  private usedGateway: UsedGateway
  private allNames: Name[]
  private currentPage: number

  constructor(
    nameListGateway: NameListGateway,
    likesGateway: LikesGateway,
    usedGateway: UsedGateway
  ) {
    this.nameListGateway = nameListGateway
    this.likesGateway = likesGateway
    this.usedGateway = usedGateway
    this.allNames = []
    this.currentPage = 1
  }

  async load(page: number = 1): Promise<ViewModel> {
    this.currentPage = page

    this.allNames = await this.nameListGateway.getAll()

    const itemLength = this.allNames.length
    const itemsPerPage = 10

    const numberOfPages = Math.round(itemLength / itemsPerPage)
    const offset = (page - 1) * itemsPerPage + 1

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
      return this.load(this.currentPage)
    })
  }

  toggleUsed(uid: string): Promise<ViewModel> {
    return this.usedGateway.toggleUsed(uid).then(() => {
      return this.load(this.currentPage)
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
