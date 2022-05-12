<template>
   <v-container style="max-width: 900px">
 
        <v-text-field v-model="keyword" @keydown.enter="searchPlace" ref="cursor">
        <template v-slot:label>
          검색어를 입력하세요<v-icon style="vertical-align: middle" @click="searchPlace">
            mdi-file-find
          </v-icon>
        </template>
      </v-text-field>

         <!-- <v-text-field   v-model="keyword" 
            placeholder="검색어를 입력하세요"
            solo  @keydown.enter="searchPlace"> </v-text-field>-->

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
       // var infowindow = new kakao.maps.InfoWindow({zIndex:1});
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
        if (this.keyword == "") {
          alert('검색어를 입력하세요');
			    this.$refs.cursor.focus();
          return false;
        }
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(this.keyword, (data, status, pagination) => {
           if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다npm
        
            var bounds = new kakao.maps.LatLngBounds();

            for (var i=0; i<data.length; i++) {
                  
                var iwContent = '<div style="padding:5px;z-index:-1;">'+ data[i].place_name +'</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                this.disPlayMarker(data[i].y, data[i].x,this.map,iwContent );
            
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            this.map.setBounds(bounds);
            } 
        });
        },

        disPlayMarker(xpos, ypos, map,iwContent) {
          var  marker = new kakao.maps.Marker({
                  position: new kakao.maps.LatLng(xpos, ypos) 
              });          
          marker.setMap(map);
          this.displayInfowindow(marker, iwContent,this.map);
        },

        displayInfowindow (marker, iwContent,map) {
          // 인포윈도우를 생성합니다
           var infowindow = new kakao.maps.InfoWindow({
                content : iwContent,
          
            });
            // 마커에 마우스오버 이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'mouseover', function() {
              // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                infowindow.open(map,marker);
            });

            // 마커에 마우스아웃 이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'mouseout', function() {
                // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
                infowindow.close();
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