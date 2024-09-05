
<template>
    <section class="py-lg-5">
      <div class="container">
        <h2>Xoş gəlmisiniz</h2>

        <button @click="logoutUser">
            <img :src="logout" alt="info">
        </button>
      </div>
    </section>
  </template>
  <script>
  //Vue Material Kit 2 components
  
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
  import logoMain from '@/assets/CDSSO_LOGO.svg'
  import logoutIcon from '@/assets/img5.svg';
  import axios from 'axios'

  
  
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
        logout:logoutIcon,
        user:null,

        headers: [
          { text: 'SİMA Rəqəmsal İmza ilə', path: sima, id: 1, pathRout: '/fin' },
          { text: 'Asan imza ilə', path: asanImza, id: 2, pathRout: '/fin' },
          { text: 'SİMA Token (Elektron İmza) ilə', path: simaToken, id: 3, pathRout: '/fin' },
          { text: 'İdentifikasiya nömrəsi ilə', path: fin, id: 4, pathRout: '/fin' },
          { text: 'BSXM Elektron İmza ilə', path: bsxm, id: 5, pathRout: '/fin' }
        ],
        loginIcon:loginTypesInfo,
        logo:logoMain
      };
    },
    methods: {
      async logoutUser() {
          try {
              const response = await axios.post(`${import.meta.env.VITE_API_KEY}/users/logoutAsan`, {
                  loggedIn: false
              });

              if (response.data.redirect) {
                  this.$router.push(response.data.redirect);
                  console.log('Redirecting to login page.');
              } else {
                  console.log('Logout handled without redirect:', response.data);
              }
          } catch (error) {
              console.error('Error during logout:', error);
          } finally {
              // Clear cookies and local storage
              this.clearCookie('authToken');
              this.clearCookie('tokenExpire');
              localStorage.removeItem("user");
              console.log('User logged out, cookies cleared, and storage cleaned.');
          }
      }

      ,

        clearCookie(name) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          console.log(`Cookie ${name} cleared.`);
        },
        logout(){
        this.clearCookie('authToken');
        this.$router.push('/asanlogin');
    },
      getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        console.log('value',value)
        console.log('parts',parts)


        if (parts.length === 2) {
          return parts.pop().split(';').shift();
        }
        return null;
      },

      setCookie(name, value, expires) {
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
      },

      clearCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      },
      
      async validToken() {
        try {
            const userStored = localStorage.getItem("user");
            const userData = JSON.parse(userStored);
            const pin = userData.user.pin; 
            if (userStored) {
                const user = JSON.parse(userStored);
                console.log(user.expiresAt)
                console.log('User pin:', pin); 

                const expires = this.getCookie('tokenExpire'); 
                const response = await axios.post(`${import.meta.env.VITE_API_KEY}/users/check-token`, {
                  expires: expires,
                  pin:pin 
                });

                if (response.data.valid) {
                    console.log('Token is valid:', response.data);
                } else {
                    console.log('Token is not valid');
                    this.logoutUser();  
                }
            } else {
                console.log('No user data found in local storage.');
            }
        } catch (error) {
            console.error('Error during token validation:', error);
        }
      },

  
  },
    async mounted() {
      this.user = localStorage.getItem("user");
       await this.validToken();
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