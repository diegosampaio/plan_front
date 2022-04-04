<template>
  <div class="submit-form">
    <div v-if="!submitted">
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="name">Nome</label>
          <input type="text" class="form-control" id="name" required v-model="usuario.name" />
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" class="form-control" id="email" required v-model="usuario.email" />
        </div>      
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="senha">Senha</label>
          <input type="password" class="form-control" id="senha" minlength="8" required v-model="usuario.password" />
        </div>
      </div>
      <div class="col">
       <div class="form-group">
          <label for="fone">Telefone</label>
          <input type="text" class="form-control" id="fone" required v-model="usuario.phone" />
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="foto">Foto</label>
          <input type="file" class="form-control" id="foto" required />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col text-right">
        <button @click.prevent="addUsuario" class="btn btn-success">Cadastrar</button>
      </div>
    </div>
      
    </div>
    <div v-else>
      <h4>Usuário cadastrado com sucesso!</h4>
      <button class="btn btn-success" @click="novoUsuario">Add</button>
    </div>
  </div>
</template>
<script>
import UsuarioDataService from "../services/UsuarioDataService";
import { useToast } from 'vue-toastification'

export default {
  name: "add-usuario",
  data() { 
    return {
      usuario: {
        id: null,
        name: "",
        email: "",
        password: "",
        phone: "",
        photo: "",
      },
      file: "",
      submitted: false,
      toast: useToast(),
    };
  },
  methods: {
    addUsuario() {
     
      const imageFile = document.querySelector('#foto')

      console.log(imageFile.files[0])

      // trata upload
      let formData = new FormData()
      formData.append('name', this.usuario.name)
      formData.append('email',  this.usuario.email)
      formData.append('password', this.usuario.password)
      formData.append('phone', this.usuario.phone)
      formData.append('photo', imageFile.files[0])
      

      UsuarioDataService.create(formData)
        .then(response => {
          this.usuario.id = response.data.id
          console.log(response.data)
          this.submitted = true
          this.toast.success('Usuário cadastrado com sucesso!');
          this.$router.push({ name: "usuarios" })
        })
        .catch(e => {
          console.log('error', e)
          this.toast.error('Ops! Houve uma falha ao cadastrar usuário, por favor tente novamente!');
        });
    }
  }
}
</script>
<style>
.submit-form {
  margin: auto;
}
</style>