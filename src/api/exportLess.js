import { post } from '../utils/request'

export default {
  set: data => post('http://localhost:3030/exportLess', data)
}
