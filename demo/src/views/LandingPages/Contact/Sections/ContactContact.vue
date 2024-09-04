
<template>
  <section class="py-lg-5">
    <div class="container">
      <div class="row">
        <div class="col">
            <div class="wrapper">
                  <img class="mainLogo" :src="logo" alt="email"/>
              <div class="panel-centered">
                
                  <div class="card-body pt-1">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        
                        <RouterLink
                            :to="{ name: 'login' }"
                            class="dropdown-item border-radius-md"
                            >
                          <div class="panel-buttons" v-for="(header, index) in headers" :key="index" >
                           
                              <div class="panel-left">
                              <img :src="header.path" :alt="header.text">
                              <p class="button-title">{{ header.text }}</p>

                            </div>
                            <div class="login_tabs_rigth">
                              <div class="info_icon">
                                <img :src="loginIcon" alt="info">
                              </div>
                            </div>
                          </div>
                        </RouterLink>

                      </div>
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



// tooltip

export default {
  setup() {
    return { bgContact,emailIcon,phoneIcon };
  },
  data() {
    return {
      fullName:null,
      email:null,
      token:null,
      message:null,
      headers: [
        { text: 'SİMA Rəqəmsal İmza ilə', path: sima, id: 1, pathRout: '/login' },
        { text: 'Asan imza ilə', path: asanImza, id: 2, pathRout: '/login' },
        { text: 'SİMA Token (Elektron İmza) ilə', path: simaToken, id: 3, pathRout: '/login' },
        { text: 'İdentifikasiya nömrəsi ilə', path: fin, id: 4, pathRout: '/login' },
        { text: 'BSXM Elektron İmza ilə', path: bsxm, id: 5, pathRout: '/login' }
      ],
      loginIcon:loginTypesInfo,
      logo:logoMain
    };
  },
   methods: {
    generateToken() {
      return [...Array(100)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
    },
    setCookie(name, value, days) {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; secure; samesite=strict";
    },
  },
  mounted() {
    this.token = this.generateToken();
    this.setCookie('authToken', this.token, 7);
    console.log('Token set in cookie:', this.token);
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
form .form-row .input-data{
  width: 100%;
  height: 40px;
  margin: 0 20px;
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