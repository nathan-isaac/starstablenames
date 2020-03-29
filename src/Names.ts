import axios from '~/node_modules/axios'

export class Name {
  private _uid: string
  private _fullName: string
  private _firstName: string
  private _lastName: string
  static instance: Names

  constructor(
    uid: string,
    fullName: string,
    firstName: string,
    lastName: string
  ) {
    this._uid = uid
    this._fullName = fullName
    this._firstName = firstName
    this._lastName = lastName
  }

  get lastName(): string {
    return this._lastName
  }

  get firstName(): string {
    return this._firstName
  }

  get fullName(): string {
    return this._fullName
  }

  get uid(): string {
    return this._uid
  }
}

export interface NameListGateway {
  getAll(): Promise<Name[]>
}

export class HttpNameListGateway implements NameListGateway {
  getAll(): Promise<Name[]> {
    return axios.get('/data/names.json').then(({ data }) => {
      return data.slice(0, 30).map((name: any) => {
        return new Name(
          name.uid,
          name.full_name,
          name.first_name,
          name.last_name
        )
      })
    })
  }
}

interface ViewName {
  uid: string
  fullName: string
  liked: boolean
  used: boolean
}

interface ViewModel {
  names: ViewName[]
}

export interface LikesGateway {
  hasLike(uid: string): Promise<boolean>
  toggleLike(uid: string): Promise<void>
}

export class InMemoryLikesGateway implements LikesGateway {
  protected likes: object

  constructor(likes: string[] = []) {
    this.likes = {}

    likes.forEach((uid) => {
      this.likes[uid] = uid
    })
  }

  hasLike(uid: string): Promise<boolean> {
    const hasLike = !!this.likes[uid]

    return Promise.resolve(hasLike)
  }

  toggleLike(uid: string): Promise<void> {
    if (this.likes[uid]) {
      delete this.likes[uid]
    } else {
      this.likes[uid] = uid
    }

    return Promise.resolve()
  }
}

export class Names {
  private nameListGateway: NameListGateway
  private likesGateway: LikesGateway

  constructor(nameListGateway: NameListGateway, likesGateway: LikesGateway) {
    this.likesGateway = likesGateway
    this.nameListGateway = nameListGateway
  }

  async load(): Promise<ViewModel> {
    const allNames = await this.nameListGateway.getAll()
    const names = await Promise.all(
      allNames.map(async (name) => {
        return {
          uid: name.uid,
          fullName: name.fullName,
          liked: await this.likesGateway.hasLike(name.uid),
          used: true
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

  toggleUsed(uid: string): Promise<ViewModel> {}

  static make(): Names {
    if (!Name.instance) {
      Name.instance = new Names(
        new HttpNameListGateway(),
        new InMemoryLikesGateway()
      )
    }

    return Name.instance
  }
}
