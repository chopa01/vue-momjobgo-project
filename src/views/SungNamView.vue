<template>

<v-data-table :headers="headers" :items="list" sort-by="calories" class="elevation-1">   
     <template #top> 

        <v-row>
    
            <!-- <button @click="callSungNam">성남</button> -->
            <v-col   class="d-flex"  cols="12"  sm="6">
 
            <v-select
            :items="guItems"
            label="구"  
            outlined   item-text="text"     v-model="guData" 
            ></v-select>
           <v-select  
            label="동" 
            outlined
            ></v-select>


            <v-btn color="primary" dark class="mb-2" @click="callSungNam">
            검색
            </v-btn>
             </v-col>


        </v-row> 
        
        <v-card  max-width="800" class="mx-auto">
 
        <div id="map" class="map"></div> 
        </v-card>

    </template> 
        <template #item.val004 ="{ item }">
            <span style="cursor: pointer;" @click="searchAddress(item)">
                {{item.val004 }}           
            </span>
        </template>
        <!-- 데이터 없을때 화면 -->
        <template #no-data>
            <v-btn color="primary" @click="initialize"> 새로고침 </v-btn>
        </template>
 </v-data-table>
 
</template>
<script>
  import axios from "axios";
  import { mapGetters } from "vuex";
  
  export default {
        data : () => ({ 
            list : [],
            guData:"",
            guItems:[
                 { text: "수정구" },
                 { text: "중원구" },
                 { text: "분당구" },
            ] ,
            dongData:[

            ],
                  //테이블 헤더.
            headers: [
                { text: "카테고리", value: "val003" },
                { text: "상호명", value: "val004" },
                { text: "전화번호", value: "val005" },
                { text: "주소", value: "val006" },
                { text: "결제", value: "val007" },
           
            ],  
            selectedItem: {
            val003: "",
            val004: "",
            val006:"",
            val005:"",
            val007:""
        },
 
        }), 
        created() {
            this.initialize();
        },

        mounted() {
                
            if (window.kakao && window.kakao.maps) {
                this.initMap();
            } else {
                const script = document.createElement('script');
        
                script.onload = () => kakao.maps.load(this.initMap);
                script.src =  `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP}&libraries=services` ;
            
                document.head.appendChild(script);
        
            }
        },

        methods: {
            initialize() {
              this.callSungNam(); 
            },
            initMap() {
            // var infowindow = new kakao.maps.InfoWindow({zIndex:1});
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                    center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
                    level: 3, // 지도의 확대 레벨
                    };
                var map = new kakao.maps.Map(mapContainer, mapOption);
                this.map= map;
                
            },

            async callSungNam() {
              console.log(this.guData);
              await  axios.get('https://devcury.kr/api/api/sungnam', {
                    params : {
                        serviceKey:'+CV9cAjGWIP4RDgeoi0WYbtAb2U4Y6nGspRxdEAWmiAbN4uSzonWXR4k1+G22bdJtqHyYCFYXEw/fQsV26yc0Q==',
                        pageNo:1,
                        numOfRows:50,
                        gu:'수정구',
                        dong:'수진2동'
                    }
                }).then(repsonse => {
                    this.list =repsonse.data.response.body.items.item;
          
                   
             }).catch(error => {
                 console.log(error);
             })
               
               this.searchAddress(this.list[0]);
             },

             searchAddress(item) { 
             //지도 생성
             this.selectedItem = Object.assign({}, item);
       
          // console.log(item);
             const ps = new kakao.maps.services.Geocoder();
                     ps.addressSearch(this.selectedItem.val006, (result, status) => {
                         if (status === kakao.maps.services.Status.OK) {
                             
                            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                            //////// 결과값으로 받은 위치를 마커로 표시합니다
                           this.disPlayMarker(coords,item);
                            /////////////////////                
                         }
                })
             },

             disPlayMarker(coords,item) {
                this.selectedItem = Object.assign({}, item); 
                var marker = new kakao.maps.Marker({
                    map: this.map,
                    position: coords
                });
                
                //console.log(this.map);
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">'+ this.selectedItem.val004 +'</div>'
                });
                infowindow.open(this.map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                this.map.setCenter(coords);   
             },
          
    
         }
   }
</script>
<style scoped>
#map {
 
  height: 200px;
 
}
</style>