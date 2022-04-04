import http from '../http-common'

class UsuarioDataService {

  getAll() {
    return http.get('/users')
  }

  getUser(id) {
    return http.get(`/users/${id}`)
  }

  create(data) {
    return http.post('/users', data)
  }

  update(id, data) {
    return http.post(`/users/${id}`, data)
  }

  deleteUser(id) {
    return http.delete(`/users/${id}`)
  }

}

export default new UsuarioDataService()
