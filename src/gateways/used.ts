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
