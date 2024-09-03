<template>
  <div class="pt-8 pl-2 pr-2 pb-2">
    <b-btn @click="logoutUser">
      <img :src="logout" alt="info">
      </b-btn>
    <h2>Xoş gəlmisiniz</h2>
  </div>
</template>



<script>
import * as chartConfigs from '@/components/Charts/config';
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';

import BaseProgress from '@/components/BaseProgress';
import StatsCard from '@/components/Cards/StatsCard';
import SocialTrafficTable from './Dashboard/SocialTrafficTable';
import PageVisitsTable from './Dashboard/PageVisitsTable';
import logoutIcon from '@/assets/img5.svg'

export default {
  components: {
    LineChart,
    BarChart,
    BaseProgress,
    StatsCard,
    PageVisitsTable,
    SocialTrafficTable,
  },
  data() {
    return {
      data: null,
      file: null, 
      imageBase64: '',
      images: null,
      newImages:null,
      logout:logoutIcon,
      texts:'',
      fileData: { logo: '', bgImage: '' },  
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40]
        ],
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: 'Performance',
              data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      redBarChart: {
        chartData: {
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Sales',
            data: [25, 20, 30, 22, 17, 29]
          }]
        },
        extraOptions: chartConfigs.blueChartOptions
      }
    };
  },
  methods: {
          logoutUser() {
          this.clearCookie('authToken');
          this.clearCookie('tokenExpire');
          this.$router.push('/asanlogin');
          console.log('User logged out, cookies cleared.');
        },

        clearCookie(name) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
          console.log(`Cookie ${name} cleared.`);
        },
  
  },
  mounted() {

  }
};
</script>
<style scoped>
.container_card{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.file-uploader {
  display: flex;
  align-items: center;
  background-color: #d7d2dc; 
  border-radius: 4px;
  margin-top:20px ;
  

}

.file-label, .browse-btn {
  color: white;
  cursor: pointer;
  background-color: #07b664; 
  padding: 2px 10px;
  border-radius: 4px;
  margin: 0 auto;
  transition: background-color 0.3s ease;
}
.upload-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  background-color: #07b664;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.file-label {
  background-color: transparent;
}

.browse-btn:hover, .upload-btn:hover {
  background-color: #9B30FF;
}

.file-input {
  display: none; 
}

.upload-btn {
  border: none;
}
</style>

