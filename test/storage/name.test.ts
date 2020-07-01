import * as assert from 'assert'
import { NameGateway, Sqlite3NameGateway } from '../../src/storage/name'
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
});

