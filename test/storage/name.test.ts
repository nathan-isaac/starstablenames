import * as assert from 'assert'
import { ColumnName, NameGateway, QueryOrder, Sqlite3NameGateway } from '../../src/storage/name'
import { Database } from 'sqlite3'

describe('Sqlite3NameGateway', function () {
  const sqlite3 = require('sqlite3').verbose();
  let nameGateway: Sqlite3NameGateway
  let db: Database

  beforeEach(() => {
    db = new sqlite3.Database(':memory:');
    nameGateway = new Sqlite3NameGateway(db)
    nameGateway.createTable()
  });

  afterEach(() => {
    db.close()
  })

  describe('create()', function () {
    it('it should create new name', async function () {
      const name = await nameGateway.create('first', 'last')

      assert.strictEqual(name.nameId, '1')
      assert.strictEqual(name.first, 'first')
      assert.strictEqual(name.last, 'last')
      assert.strictEqual(name.liked, false)
      assert.strictEqual(name.used, false)

      const names = await nameGateway.allRawNames()

      assert.strictEqual(names.length, 1);
      assert.notStrictEqual(names[0], {
        name_id: 1,
        first: 'first',
        last: 'last',
        liked: 0,
        used: 0,
      })
    });

    it('it should create two names', async function () {
      await nameGateway.create('first', 'last')
      const name = await nameGateway.create('example', 'name')

      assert.strictEqual(name.nameId, '2')
      assert.strictEqual(name.first, 'example')
      assert.strictEqual(name.last, 'name')
      assert.strictEqual(name.liked, false)
      assert.strictEqual(name.used, false)

      const names = await nameGateway.allRawNames()

      assert.strictEqual(names.length, 2);
    });
  });

  describe('getPaginated()', function() {
    it('should get no results by default', async () => {
      const names = nameGateway.getPaginated(1, 1, ColumnName.name, QueryOrder.descending);

      // assert.strictEqual()
    })
  })
});

// id, first, last, liked, used, created_at, updated_at

// name is unique
// a name can have multiple types
// a group of names can be liked or marked a used/taken

// name: id, name, search_name, is_first, is_last
// combined_name: id, first_name_id, last_name_id, liked, used, created_at, updated_at
