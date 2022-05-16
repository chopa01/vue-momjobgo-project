<template>
    <v-data-table :headers="headers" :items="list" sort-by="calories" class="elevation-1" :keyword="keyword">

        <template #top>
            <v-toolbar flat>
                <v-toolbar-title>간단한 게시판</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                    v-model="keyword"
                    append-icon="mdi-magnify"
                    label="검색"
                    single-line
                    hide-details @keydown.enter="searchPlace"
                ></v-text-field>
                <v-spacer></v-spacer> 
        <!-- 자세히 보기 alert -->
        <v-dialog v-model="dialgDetail" max-width="500px">

            <v-card>
                <v-card-title>
                    <span class="text-h5"></span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                  
                    </v-container>
                </v-card-text>

            </v-card>
        </v-dialog>
            </v-toolbar>
        </template>
        <template #item.place_name ="{ item }">
            <span style="cursor: pointer;" @click="popDetailModal()">
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
      //테이블 헤더.
            headers: [
                { text: "상호명", value: "place_name" },
 
                { text: "위치", value: "road_address_name" },
                { text: "전화번호", value: "phone" },
           
            ],
    }),

 
    watch: {
  
      
    },
    methods: {
     searchPlace () {
      
        if (this.keyword == "") {
          alert('검색어를 입력하세요');
			    this.$refs.cursor.focus();
          return false;
        }
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
        // 상세정보 보기 모달 창 on
      popDetailModal() {
 
          this.dialgDetail = true;
      },

    },
    components: {
      
    },
  }
</script>