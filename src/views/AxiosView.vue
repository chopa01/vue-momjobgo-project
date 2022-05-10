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
        `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP}&&libaries=services` ;
        
        document.head.appendChild(script);
   
    }
},
methods: {
    initMap() {
        var infowindow = new kakao.maps.InfoWindow({zIndex:1});
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
            center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption);
        
    },
    searchMap() {
                // axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${this.search}`, {
                //     headers : {
                //         Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_KEY}`
                //     }
                // }).then(repsonse => {
                //     console.log(repsonse);
                //     this.list = repsonse.data.documents;
                // }).catch(error => {
                //     console.error('=========='+error);
                // }) 
                // 장소 검색 객체를 생성합니다
                  var infowindow = new kakao.maps.InfoWindow({zIndex:1});
                var ps = new kakao.maps.services.Place(map);
                var keyword = '이태원맛집';

                // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
                ps.keywordSearch( keyword, function(data, status, pagination) {
                    if (status === kakao.maps.services.Status.OK) {
                        // 데이터 확인
                        console.log(data);
                    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
                        alert('검색 결과가 존재하지 않습니다.');
                        return;
                    } else if (status === kakao.maps.services.Status.ERROR) {
                        alert('검색 결과 중 오류가 발생했습니다.');
                        return;
                    }
                });
        }
    }  
 
}
 
</script>
<style scoped>
#map {
 
  height: 600px;
 
}
</style>