export interface LikesGateway {
  hasLike(uid: string): Promise<boolean>;

  toggleLike(uid: string): Promise<void>;
}

export class InMemoryLikesGateway implements LikesGateway {
  protected likes: Set<string>;

  constructor(likes: string[] = []) {
    this.likes = new Set(likes);
  }

  hasLike(uid: string): Promise<boolean> {
    return Promise.resolve(this.likes.has(uid));
  }

  toggleLike(uid: string): Promise<void> {
    if (this.likes.has(uid)) {
      this.likes.delete(uid);
    } else {
      this.likes.add(uid);
    }

    return Promise.resolve();
  }
}

export class LocalStorageLikesGateway implements LikesGateway {
  protected likes: Set<string>;
  private storage: Storage;
  private storageKey: string;

  constructor() {
    this.storageKey = "liked_names";
    this.storage = window.localStorage;
    this.likes = new Set(
      JSON.parse(this.storage.getItem(this.storageKey) || "[]")
    );
  }

  hasLike(uid: string): Promise<boolean> {
    return Promise.resolve(this.likes.has(uid));
  }

  toggleLike(uid: string): Promise<void> {
    if (this.likes.has(uid)) {
      this.likes.delete(uid);
    } else {
      this.likes.add(uid);
    }

    this.storage.setItem(
      this.storageKey,
      JSON.stringify(Array.from(this.likes.values()))
    );

    return Promise.resolve();
  }
}
