<template>
   <v-container style="max-width: 800px">
 
        <v-col  md="4">
         <v-text-field    v-model="search"
            placeholder="검색어를 입력하세요"
            solo  @keydown.enter="searchMap"> </v-text-field>
          <v-btn  elevation="2" @click="searchMap">검색</v-btn>
        </v-col>
 

  <div id="map" class="map"></div>  
 </v-container>
</template>
 
<script>

import axios from "axios";

export default {
    data: () => ({
        search:''
    }),
   mounted() {
         
    if (window.kakao && window.kakao.maps) {
        this.initMap();
    } else {
        const script = document.createElement('script');
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        
        script.src =
        `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP}` ;
        document.head.appendChild(script);
      
    }
},
methods: {
    initMap() {
    
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
            center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption);
        
    },
    searchMap() {
                axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${this.search}`, {
                    headers : {
                        Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_KEY}`
                    }
                }).then(repsonse => {
                    console.log(repsonse);
                    this.list = repsonse.data.documents;
                }).catch(error => {
                    console.error('=========='+error);
                }) 
                
        }
    }  
 
}
 
</script>
<style scoped>
#map {
 
  height: 600px;
 
}
</style>