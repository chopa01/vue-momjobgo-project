<template>

<v-data-table :headers="headers" :items="list" sort-by="calories" class="elevation-1">   
     <template #top> 

        <v-row>
    
            <!-- <button @click="callSungNam">성남</button> -->
            <v-col   class="d-flex"  cols="12"  sm="6">
 
            <v-select
            :items="guItems"
            label="구"  
            outlined   item-text="text"     v-model="guData" v-on:change="selectDongItem"
            ></v-select>
           <v-select  
            label="동"  :items="dongItems" item-text="text"  v-model="dongData"   outlined
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
            dongData:"",
            guData:"",
            guItems:[
                 { text: "수정구" },
                 { text: "중원구" },
                 { text: "분당구" },
            ] ,
            dongItems:[],
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
              //this.callSungNam(); 
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
            // console.log(this.guData);
            // console.log(this.dongData);
            if(this.guData == "") {
                alert('구를 선택하세요');
                return false;
            }
              await  axios.get('https://devcury.kr/api/api/sungnam', {
                    params : {
                        serviceKey:'+CV9cAjGWIP4RDgeoi0WYbtAb2U4Y6nGspRxdEAWmiAbN4uSzonWXR4k1+G22bdJtqHyYCFYXEw/fQsV26yc0Q==',
                        pageNo:1,
                        numOfRows:50,
                        gu:this.guData,
                        dong:this.dongData
                    }
                }).then(repsonse => {
                    this.list =repsonse.data.response.body.items.item;
                    //console.log(repsonse.data.response.body);
                  //  console.log(repsonse.data.response.body.totalCount);
          
                   
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
            //동 데이터 가져오기
            selectDongItem () {  
                this.dongItems=[];
                if (this.guData == "수정구") {
                this.dongItems.push(
                { text :"신흥1동"}, {text :"신흥2동"},{text :"신흥3동"},{text :"태평1동"}, {text :"태평2동"},{text :"태평3동"}, {text :"태평4동"},{text :"수진1동"}, {text :"수진2동"},
                {text :"단대동"}, {text :"산성동"},{text :"양지동"}, {text :"복정동"}, {text :"위례동"}, {text :"신촌동"})
                } else if (this.guData == "중원구") {
                this.dongItems.push(
                { text :"성남동"}, {text :"중앙동"},{text :"금광1동"},{text :"금광2동"}, {text :"은행1동"},{text :"은행2동"}, {text :"상대원1동"},{text :"상대원2동"}, {text :"상대원3동"},
                {text :"하대원동"}, {text :"도촌동"})
                }else if (this.guData == "분당구") {
                this.dongItems.push(
                { text :"분당동"}, {text :"수내1동"},{text :"수내2동"},{text :"수내3동"}, {text :"정자동"},{text :"정자1동"}, {text :"정자2동"},{text :"정자3동"}, {text :"서현1동"},
                {text :"서현2동"}, {text :"이매1동"},{text :"이매2동"}, {text :"야탑1동"}, {text :"야탑2동"}, {text :"야탑3동"},{text :"금곡동"}, {text :"구미동"},{text :"구미1동"}, {text :"판교동"}, {text :"삼평동"}, 
                {text :"백현동"},{text :"운중동"})
                } else {}
            }
         }
   }
</script>
<style scoped>
#map {
 
  height: 200px;
 
}
</style>