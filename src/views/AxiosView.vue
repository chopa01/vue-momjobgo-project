<template>
   <v-container style="max-width: 800px">
 
        <v-text-field v-model="keyword" @keydown.enter="searchPlace">
        <template v-slot:label>
          검색어를 입력하세요<v-icon style="vertical-align: middle" @click="searchPlace">
            mdi-file-find
          </v-icon>
        </template>
      </v-text-field>

         <!-- <v-text-field   v-model="keyword" 
            placeholder="검색어를 입력하세요"
            solo  @keydown.enter="searchPlace"> </v-text-field>
          <v-btn  elevation="2" @click="searchPlace">검색</v-btn> -->
   
 

  <div id="map" class="map"></div>  
 </v-container>
</template>
 
<script>

import axios from "axios";

export default {
    data: () => ({
    keyword:'',

    }),
   mounted() {
         
    if (window.kakao && window.kakao.maps) {
        this.initMap();
    } else {
        const script = document.createElement('script');
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        
        script.src =
        `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP}&libraries=services` ;
        
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
        this.map= map;
            // console.log(map)
    },
    searchPlace(){  


        var infowindow = new kakao.maps.InfoWindow({zIndex:1});     
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch("분당", (data, status, pagination) => {
           if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        
            var bounds = new kakao.maps.LatLngBounds();
            for (var i=0; i<data.length; i++) {
            
                  var  marker = new kakao.maps.Marker({
                    //map: this.map,
                    position: new kakao.maps.LatLng(data[i].y, data[i].x) ,
                    clickable: true  
                });
              
            marker.setMap(this.map);
          
            var iwContent = '<div style="padding:5px;z-index:-1;">'+ data[i].place_name +'</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
               // iwPosition = new kakao.maps.LatLng(data[i].y, data[i].x), //인포윈도우 표시 위치입니다
                iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

            // 인포윈도우를 생성하고 지도에 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
             //   map: this.map, // 인포윈도우가 표시될 지도
               //  position : iwPosition, 
                content : iwContent,
                removable : iwRemoveable
            });
infowindow.open(this.map, marker);
               // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다  
    
                infowindow.open(this.map, marker);
            })

            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
           

            
            }       


            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            this.map.setBounds(bounds);
            } 
        });
        },
 
        }
 
}
 
</script>
<style scoped>
#map {
 
  height: 600px;
 
}
</style>