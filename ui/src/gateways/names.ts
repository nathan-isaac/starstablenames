import axios from '~/node_modules/axios'

export interface Name {
  uid: string
  fullName: string
}

export interface NameListGateway {
  getAll(): Promise<Name[]>
}

export class HttpNameListGateway implements NameListGateway {
  getAll(): Promise<Name[]> {
    return axios.get('/data/names.json').then(({ data }) => {
      return data.map((name: any) => {
        return {
          uid: name.uid,
          fullName: name.full_name
        }
      })
    })
  }
}
