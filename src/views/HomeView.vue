<template>

    <v-data-table :headers="headers" :items="list" sort-by="calories" class="elevation-1" :keyword="keyword">

        <template #top>
            <v-toolbar flat>
                <v-toolbar-title>간단한 게시판</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <!-- <v-text-field
                    v-model="keyword"
                    append-icon="mdi-magnify"
                    label="검색"
                    single-line
                    hide-details  @keydown.enter="searchPlace"
                ></v-text-field> -->
                <v-text-field 
                    append-icon="mdi-magnify"
                    label="검색"
                    single-line
                    hide-details  @keydown.enter="popModalSearch"
                ></v-text-field>
                <v-spacer></v-spacer> 
                <!-- 자세히 보기 alert -->
                <v-dialog v-model="dialgDetail" max-width="375">
                    <v-card
                        max-width="375"
                        class="mx-auto"
                    >
                        <div id="map" class="map"></div> 
                        <v-card-subtitle>
                            <span class="text-h6">{{ selectedItem.place_name }}</span>
                        </v-card-subtitle>
 
                        <v-list-item>
                            <v-list-item-icon>
                            <v-icon color="indigo">
                                mdi-phone
                            </v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                            <v-list-item-title>{{ selectedItem.phone }}</v-list-item-title>
                            <v-list-item-subtitle>Work</v-list-item-subtitle>
                            </v-list-item-content>

                  
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item>
                            <v-list-item-action></v-list-item-action>

                            <v-list-item-content>
                            <v-list-item-title>웹사이트</v-list-item-title>
                            <v-list-item-subtitle>Work</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-divider inset></v-divider>

                        <v-list-item>
                            <v-list-item-icon>
                            <v-icon color="indigo">
                                mdi-map-marker
                            </v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                            <v-list-item-title>{{ selectedItem.address_name }}</v-list-item-title>
                    
                            </v-list-item-content>
                        </v-list-item>
                        </v-list>
                    </v-card> 
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDetail"> 확인 </v-btn>
                    </v-card-actions>
                </v-dialog>
                <v-dialog v-model="dialgSearch" max-width="600">
                    <v-card
                        class="mx-auto"
                        max-width="600"
                        tile
                    >
                        <v-list shaped>
                        <v-subheader>
                         <v-text-field
                            v-model="keyword"
                            append-icon="mdi-magnify"
                            label="검색"
                            single-line
                            hide-details  @keydown.enter="searchPlace"
                        ></v-text-field>
                            </v-subheader>
                        <v-list-item-group
                            v-model="selectedItem"
                            color="primary"
                        >
                            <v-list-item
                            v-for="(item, i) in items"
                            :key="i"
                            >
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>


        <template #item.place_name ="{ item }">
            <span style="cursor: pointer;" @click="popDetailModal(item)">
                {{item.place_name }} 
           
            </span>
        </template>

    </v-data-table>
    
</template>

<script>
  import axios from "axios";
  import { mapGetters } from "vuex";


  export default {
    name: 'Home',
      data: () => ({
      keyword:'',
      list : [],
      list_meta : [],
      dialgDetail : false,
      dialgSearch : false,
      //테이블 헤더.
            headers: [
                { text: "카테고리", value: "category_name" },
                { text: "상호명", value: "place_name" },
                { text: "위치", value: "road_address_name" },
                { text: "전화번호", value: "phone" },
           
            ],
        selectedIndex: -1,
        selectedItem: {
            x: "",
            y: "",
            phone:"",
            address_name:"",
            place_name:"",
            distance:"",
    
        },
        defaultItem: {
            x: "",
            y: "",
            phone:"",
            address_name:"",
            place_name:"",
            distance:"",            
        },
        //최근 검색
        items: [
        { text: '주변', icon: 'mdi-map-marker' },
        { text: 'Audience', icon: 'mdi-map-marker' },
        { text: 'Conversions', icon: 'mdi-map-marker' },
        
      ],
 
    }),

    methods: {
  

    searchPlace () {
        // if (this.keyword == "") {
        //   alert('검색어를 입력하세요');
		// 	    this.$refs.cursor.focus();
        //   return false;
        // }
        this.dialgSearch = false;
        console.log(this.currentY);
/////////////////////////////////////////////////
        axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?y=37.514322572335935&x=127.06283102249932&radius=20000&query=${this.keyword}`, {
            headers : {
                Authorization:`KakaoAK ${process.env.VUE_APP_KAKAO_KEY}`
            }
        }).then(repsonse => {         
            this.list = repsonse.data.documents;
            this.list_meta= repsonse.data.meta;
            //console.log(repsonse.data.meta);
        }).catch(error => {
            console.error(error);
        }) 
      },
      //현재 위치 가져오기
    //   currGeolocation () {
    //     if (navigator.geolocation) {
            
    //         // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    //         navigator.geolocation.getCurrentPosition(function(position) {
                
    //             var lat = position.coords.latitude, // 위도
                
    //                 lon = position.coords.longitude; // 경도
         
    //             var currentY =lon;
    //             var currentX = lat;
              
                 
                           
    //         });         
    //     } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다          
    //        // var locPosition = new kakao.maps.LatLng(33.450701, 126.570667) 
    //     }
       
    //   },

      //검색창
      popModalSearch() {
             this.dialgSearch = true;
      },
        // 상세정보 보기 모달 창 on
    popDetailModal(item) {

        this.selectedIndex = this.list.indexOf(item);
        this.selectedItem = Object.assign({}, item);
        

        const script = document.createElement('script');

        script.onload = () => kakao.maps.load(this.initMap);
        script.src =  `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP}&libraries=services` ;
    
        document.head.appendChild(script);

        this.dialgDetail = true;
    },

    initMap() {    
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
            center: new kakao.maps.LatLng(this.selectedItem.y, this.selectedItem.x), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
            };
        var map = new kakao.maps.Map(mapContainer, mapOption);
            // 마커가 표시될 위치입니다 
        var markerPosition  = new kakao.maps.LatLng(this.selectedItem.y, this.selectedItem.x); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map)
            
    },
            // 글 상세 정보 모달 닫기
    closeDetail() {
        this.dialgDetail = false;
        this.clearSelectedItem();
    },
        // SelectedItem 관련 필드 초기화
    clearSelectedItem(){
        this.selectedItem = Object.assign({}, this.defaultItem);
        this.selectedIndex = -1;
    },

    },
    components: {
      
    },
  }
</script>
<style scoped>
#map {
  height: 300px;
 
}
</style>