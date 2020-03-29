import { Name, NameListGateway, Names } from '~/src/Names'

class NameListGatewaySub implements NameListGateway {
  getAll(): Promise<Name[]> {
    return Promise.resolve([
      new Name('uid', 'full name', 'first name', 'last name')
    ])
  }
}

it('it should get a single name', async () => {
  const nameGateway = new NameListGatewaySub()

  const names = new Names(nameGateway)

  const viewModel = await names.load()

  expect(viewModel.names).toEqual([
    {
      uid: 'uid',
      fullName: 'full name',
      liked: false,
      used: false
    }
  ])
})
