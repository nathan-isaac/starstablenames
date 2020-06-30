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

export class LocalStorageUsedGateway implements UsedGateway {
  protected used: Set<string>
  private storage: Storage
  private storageKey: string

  constructor() {
    this.storage = window.localStorage
    this.storageKey = 'used_names'
    this.used = new Set(
      JSON.parse(this.storage.getItem(this.storageKey) || '[]')
    )
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

    this.storage.setItem(
      this.storageKey,
      JSON.stringify(Array.from(this.used.values()))
    )

    return Promise.resolve()
  }
}
