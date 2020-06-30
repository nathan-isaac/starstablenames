export interface Name {
  uid: string;
  fullName: string;
}

export interface NameListGateway {
  getAll(): Promise<Name[]>;
}

export class InMemoryNameListGateway implements NameListGateway {
  constructor(protected names: Name[] = []) {}

  getAll(): Promise<Name[]> {
    return Promise.resolve(this.names);
  }
}

export class HttpNameListGateway implements NameListGateway {
  getAll(): Promise<Name[]> {
    return fetch("/data/names.json").then(async response => {
      const data = await response.json();

      return data.map((name: any) => {
        return {
          uid: name.uid,
          fullName: name.full_name
        };
      });
    });
  }
}
