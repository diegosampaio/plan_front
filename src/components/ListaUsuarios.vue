<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Usuários cadastrados</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(usuario, index) in usuarios"
          :key="index"
          @click="setActiveUsuario(usuario, index)"
        >
          {{ usuario.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentUsuario">
        <h4>Usuário</h4>
        <div>
          <img :src="currentUsuario.photo" class="img-responsive">
        </div>
        <div>
          <label><strong>Nome:</strong></label> {{ currentUsuario.name }}
        </div>
        <div>
          <label><strong>E-mail:</strong></label> {{ currentUsuario.email }}
        </div>
        <div>
          <label><strong>Telefone:</strong></label> {{ currentUsuario.phone }}
        </div>
       
        <router-link :to="'/usuario/' + currentUsuario.id" class="badge badge-warning">Editar</router-link>
      </div>
      <div v-else>
        <br />
        <p>Por favor clique em um usuário...</p>
      </div>
    </div>
  </div>
</template>
<script>
import UsuarioDataService from "../services/UsuarioDataService";
import { useToast } from 'vue-toastification'
export default {
  name: "lista-usuarios",
  data() {
    return {
      usuarios: [],
      currentUsuario: null,
      currentIndex: -1,
      title: "",
      toast: useToast()
    };
  },
  methods: {
    retrieveUsuarios() {
      UsuarioDataService.getAll()
        .then(response => {
          this.usuarios = response.data;
          console.log(response.data);

        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveUsuarios();
      this.currentUsuario = null;
      this.currentIndex = -1;
    },
    setActiveUsuario(usuario, index) {
      this.currentUsuario = usuario;
      this.currentUsuario.photo = 'http://localhost:8000/storage/photos/' + usuario.photo
      this.currentIndex = usuario ? index : -1;
      console.log(usuario);
    },
  },
  mounted() {
    this.retrieveUsuarios();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.list-group-item {
  cursor: pointer;
}
img {
  max-width: 300px;
  max-height: 300px;
  border: 1px solid #ccc;
  padding: 4px;
  border-radius: 10px;
}
</style>