import { Database } from 'sqlite3'

type NameId = string

enum ColumnName {
  name,
  liked,
  used
}

enum QueryOrder {
  ascending,
  descending
}

interface Name {
  nameId: NameId
  first: string
  last: string
  liked: boolean
  used: boolean
}

export interface NameGateway {
  create(first: string, last: string): Promise<Name>;
  toggleLike(nameId: NameId): Promise<Name>;
  toggleUsed(nameId: NameId): Promise<Name>;
  getPaginated(currentPage: number, perPage: number, orderColumn: ColumnName, order: QueryOrder): Promise<Name[]>;
}

export class Sqlite3NameGateway implements NameGateway {
  constructor(protected db: Database) {}

  createTable() {
    this.db.serialize(() => {
      const schema = `create table names (
          name_id integer not null
            constraint names_pk
            primary key autoincrement,
          first text not null,
          last text not null,
          liked integer default 0 not null,
          used integer default 0 not null
      );`;

      this.db.run(schema);
    });
  }

  async create(first: string, last: string): Promise<Name> {
    const lastID = await this.insert(first, last);
    return await this.findById(lastID);
  }

  insert(first: string, last: string): Promise<NameId> {
    return new Promise((resolve, reject) => {
      this.db.run("INSERT INTO names (first, last) VALUES (?, ?)", [first, last], function (err) {
        if (err) {
          return reject(err)
        }

        return resolve(`${this.lastID}`);
      });
    });
  }

  findById(nameId: NameId): Promise<Name|undefined> {
    return new Promise((resolve, reject) => {
      this.db.get('select * from names where name_id = ?', [Number(nameId).valueOf()], function(err, row) {
        if (err) {
          return reject(err);
        }

        if (!row) {
          return undefined;
        }

        resolve({
          nameId: `${nameId}`,
          first: row.first,
          last: row.last,
          liked: Boolean(row.liked).valueOf(),
          used: Boolean(row.used).valueOf(),
        });
      });
    });
  }

  getPaginated(currentPage: number, perPage: number, orderColumn: ColumnName, order: QueryOrder): Promise<Name[]> {
    return Promise.resolve([])
  }

  toggleLike(nameId: NameId): Promise<Name> {
    return Promise.resolve(undefined)
  }

  toggleUsed(nameId: NameId): Promise<Name> {
    return Promise.resolve(undefined)
  }

  allRawNames(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all('select * from names', (err, rows) => {
        if (err) {
          return reject(err)
        }

        return resolve(rows);
      })
    });
  }
}
