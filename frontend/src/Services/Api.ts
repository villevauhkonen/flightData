import axios from 'axios'

export const GetRequest = async (url: string, queryString: string) => {
  const result = await axios.get(url + queryString)
  return result
}
