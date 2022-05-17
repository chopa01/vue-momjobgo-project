
<template>
    <v-data-table :headers="headers" :items="list" sort-by="calories" class="elevation-1" :keyword="keyword">
        <template #top>
            <v-tabs
                fixed-tabs
                background-color="indigo"
                dark>
                <v-tab @click="kakaoCategory('AD5')">숙박 </v-tab>
                <v-tab @click="kakaoCategory('FD6')">음식점</v-tab>
                <v-tab @click="kakaoCategory('AT4')">관광명소</v-tab>
                <v-tab @click="kakaoCategory('CT1')">문화시설</v-tab>
            </v-tabs>
            <v-toolbar flat>
                <v-toolbar-title>간단한 게시판</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field 
                    append-icon="mdi-magnify"
                    label="검색" v-model="keyword"
                    single-line
                    hide-details  @click="popModalSearch($event)" @keydown.enter="searchPlace"
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
                       
                    </v-card> 
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDetail"> 확인 </v-btn>
                    </v-card-actions>
                </v-dialog>
                <!--검색창-->
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
                            hide-details  @keydown.enter="searchPlace" ref="cursor"
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
                                <v-list-item-title v-text="item.text" @click="searchPlace2(item.text)"></v-list-item-title>
                            </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                        </v-list>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>

        <template #item.category_name ="{ item }">
            <span style="cursor: pointer;" @click="popDetailModal(item)">
                {{item.category_name }} 
           
            </span>
        </template>

        <template #item.place_name ="{ item }">
            <span style="cursor: pointer;" @click="popDetailModal(item)">
                {{item.place_name }} 
           
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
  import VueGeolocationApi from 'vue-geolocation-api';

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
            id:"",
    
        },
        defaultItem: {
            x: "",
            y: "",
            phone:"",
            address_name:"",
            place_name:"",
            distance:"",  
            id:"",          
        },
        //최근 검색
        items: [
        { text: '주변', icon: 'mdi-map-marker' },
        { text: '이태원 맛집', icon: 'mdi-map-marker' },
        { text: '판교 맛집', icon: 'mdi-map-marker' },
      ],
      currentX:"",
      currentY:""
    }),
    
    mounted() {
        this.currentX = "127.06283102249932", //기본값 셋팅
        this.currentY="37.514322572335935",
        this.kakaoCategory('AD5');
    },
    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            this.kakaoCategory('AD5');
        },
       create () {   
        this.items.push({
            icon : 'mdi-map-marker',
            text: this.keyword,
        })
      },    

    kakaoSearch (p_search) {
        axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json?y=37.514322572335935&x=127.06283102249932&radius=20000&query=${p_search}`, {
            headers : {
                Authorization:`KakaoAK ${process.env.VUE_APP_KAKAO_KEY}`
            }
        }).then(repsonse => {         
            this.list = repsonse.data.documents;
            this.list_meta= repsonse.data.meta;
            //console.log(repsonse.data.documents);
        }).catch(error => {
            console.error(error);
        }) 
        this.clearSelectedItem();
        this.keyword="";
    },

    kakaoCategory(p_code) {
        //console.log(this.currentY);
        axios.get(`https://dapi.kakao.com/v2/local/search/category.json?category\_group\_code=${p_code}&radius=20000&y=${this.currentY}&x=${this.currentX}`, {
            headers : {
                Authorization:`KakaoAK ${process.env.VUE_APP_KAKAO_KEY}`
            }
        }).then(repsonse => {         
            this.list = repsonse.data.documents;
            this.list_meta= repsonse.data.meta;
           // console.log(repsonse.data.documents);
        }).catch(error => {
            console.error(error);
        }) 
        this.clearSelectedItem();
    },



    searchPlace () {
        if (this.keyword == "") {
            alert('검색어를 입력하세요');
			this.$refs.cursor.focus();
          return false;
        }
        this.create();
        this.dialgSearch = false;
///////////////////////////////////////////////
        this.kakaoSearch(this.keyword);
      },

    searchPlace2 (p_search) {

        if(p_search =="주변") {  
            navigator.geolocation.getCurrentPosition(pos => {
            this.currentY = pos.coords.latitude;
            this.currentX = pos.coords.longitude;
            }, err => {   
            console.error(error);
            })

            this.kakaoCategory('AD5');
        }else {
            this.kakaoSearch(p_search);
        }
        this.dialgSearch = false;
 
        
      },



      //검색창
      popModalSearch(event) {
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