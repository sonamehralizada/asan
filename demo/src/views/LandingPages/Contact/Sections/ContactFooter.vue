
<template>
  <section class="py-lg-5">
    <div class="container">
        <div class="col">
            <div class="wrapper">
                  <img class="mainLogo" :src="logo" alt="email"/>
              <div class="panel-centered">
                
                  <div class="card-body pt-1">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        
                        <form @submit.prevent="onSubmit" class="form_container">
                         
                        <button @click="backAsan"
                            class="back-button" >
                            <img :src="back" alt="info" class="btn-arrow">
                            <span class="btn-text">Geri</span>
                        </button>
                          <h4>İdentifikasiya nömrəsi ilə giriş</h4>
                         <div class="form-items">
                          <div class="form-item">
                            <label class="input-text">İdentifikasiya nömrəsi
                            </label>
                            <div class=" input-wrapper">
                            <input 
                              type="text"
                              v-model="pin"
                              required
                            />
                            <span class="icon icon-alert-circle" >
                              <img :src="info" alt="password"/>

                            </span>
                          </div>
                          </div>
                          <div class="form-item">
                            <label class="input-text">Şifrə</label>
                            <div class=" input-wrapper">
                           
                           <input
                             type="password"
                             v-model="password"
                             required
                           />
                           <span class="icon icon-alert-circle" >
                            <img :src="show" alt="password"/>
                           </span>

                         </div>
                          </div>
                         
                        </div>
                            <button type="submit" class="submit-button" @click="onSubmit">Göndər</button>
                            <button type="text" class="register-button" @click="onSubmit">Qeydiyyatdan keç</button>

                    </form>
                     </div>

                      </div>
                    </div>
                  
              </div>
            </div>
        </div>
  </section>
</template>
<script>
import axios from 'axios';
//Vue Material Kit 2 components

import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
// image
import bgContact from "@/assets/img/examples/blog2.jpg";
import phoneIcon from '@/assets/img/phone.png';
import emailIcon from '@/assets/img/email.png';
import sima from '@/assets/sima.svg';
import asanImza from '@/assets/asan-imza.svg';
import simaToken from '@/assets/sima-token.svg';
import fin from '@/assets/fin.svg';
import bsxm from '@/assets/bsxm.svg';
import loginTypesInfo from '@/assets/loginTypesInfo.svg';
import logoMain from '@/assets/CDSSO_LOGO.svg';
import backIcon from '@/assets/newBack.svg';
import showIcon from '@/assets/eye_open.svg';
import infoIcon from '@/assets/icons8-info.svg';



// tooltip

export default {
  setup() {
    return { bgContact,emailIcon,phoneIcon };
  },
  data() {
    return {
      fullName:null,
      email:null,
      message:null,
      pin:null,
      password:null,
      back:backIcon,
      headers: [
        { text: 'SİMA Rəqəmsal İmza ilə', path: sima, id: 1, pathRout: '/fin' },
        { text: 'Asan imza ilə', path: asanImza, id: 2, pathRout: '/fin' },
        { text: 'SİMA Token (Elektron İmza) ilə', path: simaToken, id: 3, pathRout: '/fin' },
        { text: 'İdentifikasiya nömrəsi ilə', path: fin, id: 4, pathRout: '/fin' },
        { text: 'BSXM Elektron İmza ilə', path: bsxm, id: 5, pathRout: '/fin' }
      ],
      loginIcon:loginTypesInfo,
      logo:logoMain,
      info:infoIcon,
      show:showIcon,
    };
  },
methods: {
    backAsan(){
       this.$router.push('/asanlogin');
      },
    getCookie(name) {
      let cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='));
    if (cookieValue) {
      cookieValue = cookieValue.split('=')[1];
    }
    return cookieValue ? decodeURIComponent(cookieValue) : null;

    },
    setCookie(name, value, expires) {
    const expireTime = expires.toUTCString();
    document.cookie = `${name}=${value}; expires=${expireTime}; path=/`;
  },
    async onSubmit() {
      console.log('cliked')
        try {
          const token = this.getCookie('authToken');
          const response = await axios.post('http://localhost:5000/users/asanLogin', {
            pin: this.pin,
            password: this.password
          }, {
            headers: { 'token': token }
          });

          console.log('Login Response:', response.data);

          if (response.data.status === 200) {
            this.specificToken = response.data.token;
            localStorage.setItem('user', JSON.stringify(response.data));
            this.setCookie('authToken', response.data.token, new Date(response.data.expiresAt));
            this.setCookie('tokenExpire', new Date(response.data.expiresAt), new Date(response.data.expiresAt));
            await this.$router.push('/');
          } else {
            alert('Login failed!');
          }
        } catch (error) {
          console.error('Error occurred:', error);
        }
      },


  },
  mounted() {
    console.log('Specific token:', this.specificToken);
  },
    
  
};
</script>

<style scoped>
.flex-direction{
  display: flex;
  flex-direction: column;

}
.panel-centered{
    display: flex;
    max-width: 640px;
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    margin-top: 30px;
    padding: 35px 10px;
    background-color: #fff;
    border: 1px solid #dae2ff;
}
.wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.panel-buttons {
    width: 100%;
    cursor: pointer;
    text-align: left;
    height: 60px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    transition: background-color .8s;
    border: 1.173px solid #dae2ff;
}
.panel-left{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
}

.panel-left img {
    width: 45px;
    height: 45px;
}

.submit-button{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    background-color: #3a55a6;
    color: #fff;
    border-radius: 10px;
    font-size: 16px;
    width: 100%;
    cursor: pointer;
    border: none;
    outline: none;
    margin-top: 1rem;
}
.register-button{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    background-color: #fff;
    color:  #3a55a6;
    border-radius: 10px;
    font-size: 16px;
    width: 100%;
    cursor: pointer;
    border: none;
    outline: none;
    margin-top: 10px;
    font-weight: bold;
}
.button-title{
    width: 100%;
    margin: 0;
    margin-left: 20px;
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    color: #0d55cf;
}
.info_icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    margin-right: 0 !important;
}
.login_tabs_rigth {
    margin-left: 40px;
    display: flex;
    align-items: center;
}
.container form .form-row{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;
}
.mainLogo{
    width: 120px;
    cursor: pointer;
    transition: 33ms;
    margin-bottom: 0;
}
.form_container{
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin: 20px;
}
.back-button{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90px;
    border-radius: 10px;
    border: 1px solid #cacdd5;
    padding: 16px;
    cursor: pointer;
    height: 48px;
    color: #525c76;
    font-weight: 700;
    margin-bottom: 1rem;
}
.back-button img {
  vertical-align: middle;
  border-style: none;
}
.form-items{
width: 100%;
}
.form-item{
  margin: 1rem 0;
}
.input-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    border: 1px solid #dae2ff;
    background: #fff;
    border-radius: 10px;
    padding: 0 16px 0 0;
}
.input-txt{
    color: #525c76;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    margin-top: 15px;
}
input{
    border: none;
    height: 100%;
    width: 100%;
    border-right: 1px solid #dae2ff;
    margin-right: 16px;
    font-size: 14px;
    padding-left: 16px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: #e8f0fe;
    outline: none;
}
label {
    display: inline-block;
    margin-bottom: .5rem;
}
span.icon{
    cursor: pointer;
}
[class*=" icon-"]:before, [class^=icon-]:before {
    font-family: asan-login !important;
    font-style: normal !important;
    font-weight: 400 !important;
    font-variant: normal !important;
    text-transform: none !important;
    speak: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
form .form-row .input-data{
  width: 100%;
  height: 40px;
  position: relative;
}
form .form-row .textarea{
  height: 70px;
}
.input-data input,
.textarea textarea{
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 17px;
  border-bottom: 2px solid rgba(0,0,0, 0.12);
}
.input-data input:focus ~ label, .textarea textarea:focus ~ label,
.input-data input:valid ~ label, .textarea textarea:valid ~ label{
  transform: translateY(-20px);
  font-size: 14px;
  color: #3498db;
}
.textarea textarea{
  resize: none;
  padding-top: 10px;
}
.input-data label{
  position: absolute;
  pointer-events: none;
  bottom: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
}
.textarea label{
  width: 100%;
  bottom: 40px;
  background: #fff;
}
.input-data .underline{
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
}
.btn_label{
  z-index: 10000;
}
.input-data .underline:before{
  position: absolute;
  content: "";
  height: 2px;
  width: 100%;
  background: #3498db;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}
.input-data input:focus ~ .underline:before,
.input-data input:valid ~ .underline:before,
.textarea textarea:focus ~ .underline:before,
.textarea textarea:valid ~ .underline:before{
  transform: scale(1);
}
.submit-btn .input-data{
  overflow: hidden;
  height: 45px!important;
  width: 25%!important;
}
.submit-btn .input-data .inner{
  height: 100%;
  width: 300%;
  position: absolute;
  left: -100%;
  background: -webkit-linear-gradient(right, #56d8e4, #9f01ea, #56d8e4, #9f01ea);
  transition: all 0.4s;
}
.submit-btn .input-data:hover .inner{
  left: 0;
}
.submit-btn .input-data input{
  background: none;
  border: none;
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
.icon-img{
  width: 30px;
  margin-right: 5px;
}
@media (max-width: 700px) {
  .container .text{
    font-size: 30px;
  }
  .container form{
    padding: 10px 0 0 0;
  }
  .container form .form-row{
    display: block;
  }
  form .form-row .input-data{
    margin: 35px 0!important;
  }
  .submit-btn .input-data{
    width: 40%!important;
  }
}</style>