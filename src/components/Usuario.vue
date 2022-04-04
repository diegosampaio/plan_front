<template>
  <div v-if="usuario" class="edit-form">
    <h4>Usuário</h4>
    <form>
      <div class="row">
        <div class="col">
          <img :src="usuario.photo" class="img-responsive">
           <div class="form-group">
              <label for="foto">Foto</label>
              <input type="file" class="form-control" id="foto" />
          </div>
        </div>
        <div class="col">
          <div class="form-group">
            <label for="name">Nome</label>
            <input type="text" class="form-control" id="name" required v-model="usuario.name" />
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" class="form-control" id="email" required v-model="usuario.email" />
          </div>
          <div class="form-group">
            <label for="senha">Senha</label>
            <input type="password" class="form-control" id="senha" v-model="usuario.password" />
          </div>
          <div class="form-group">
            <label for="fone">Telefone</label>
            <input type="text" class="form-control" id="fone" required v-model="usuario.phone" />
          </div>
         
        </div>
      </div>

      <div class="row">
        <div class="col text-right">
          <button class="btn btn-outline-danger mr-2"
                @click.prevent="deleteUsuario"
              >
            Delete
          </button>
          <button type="submit" class="btn btn-outline-success"
            @click.prevent="updateUsuario"
          >
            Update
          </button>
        </div>
      </div>
     
      
    </form>
    
    
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Usuário não localizado...</p>
  </div>
</template>
<script>
import UsuarioDataService from "../services/UsuarioDataService";
import { useToast } from 'vue-toastification'
export default {
  name: "show-usuario",
  data() {
    return {
      usuario: null,
      message: '',
      toast: useToast()
    };
  },
  methods: {
    getUsuario(id) {
      UsuarioDataService.getUser(id)
        .then(response => {
          this.usuario = response.data;
          this.usuario.photo = 'http://localhost:8000/storage/photos/' +  response.data.photo
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateUsuario() {
      const imageFile = document.querySelector('#foto')

      console.log(imageFile.files[0])

      // trata upload
      let formData = new FormData()
      formData.append('name', this.usuario.name)
      formData.append('email',  this.usuario.email)
      formData.append('password', this.usuario.password)
      formData.append('phone', this.usuario.phone)
      if (imageFile.files[0]) {
        formData.append('photo', imageFile.files[0])
      }
      formData.append('_method', 'put')

      UsuarioDataService.update(this.usuario.id, formData)
        .then(response => {
          console.log(response.data);
          this.toast.success('Usuário atualizado com sucesso!');
          this.getUsuario(this.usuario.id)

        })
        .catch(e => {
          console.log(e);
          this.toast.error('Ops! Houve uma falha ao atualizar usuário, por favor tente novamente!');
        });
    },
    deleteUsuario() {
      UsuarioDataService.deleteUser(this.usuario.id)
        .then(response => {
          console.log(response.data);
          this.toast.success('Usuário deletado com sucesso!');
          this.$router.push({ name: "usuarios" });
        })
        .catch(e => {
          console.log(e);
          this.toast.error('Ops! Houve uma falha ao deletar usuário, por favor tente novamente!');
        });
    }
  },
  mounted() {
    this.message = '';
    this.getUsuario(this.$route.params.id);
  }
};
</script>
<style>
img {
  max-width: 300px;
  max-height: 300px;
  border: 1px solid #ccc;
  padding: 4px;
  border-radius: 10px;
}
</style>