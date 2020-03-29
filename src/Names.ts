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

export interface UsedGateway {
  isUsed(uid: string): Promise<boolean>
  toggleUsed(uid: string): Promise<void>
}

export class InMemoryUsedGateway implements UsedGateway {
  protected used: Set<string>

  constructor(used: string[] = []) {
    this.used = new Set<string>(used)
  }

  isUsed(uid: string): Promise<boolean> {
    return Promise.resolve(this.used.has(uid))
  }

  toggleUsed(uid: string): Promise<void> {
    if (this.used.has(uid)) {
      this.used.delete(uid)
    } else {
      this.used.add(uid)
    }

    return Promise.resolve()
  }
}

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

export class Names {
  private nameListGateway: NameListGateway
  private likesGateway: LikesGateway
  private usedGateway: UsedGateway

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
    if (!Name.instance) {
      Name.instance = new Names(
        new HttpNameListGateway(),
        new InMemoryLikesGateway(),
        new InMemoryUsedGateway()
      )
    }

    return Name.instance
  }
}
