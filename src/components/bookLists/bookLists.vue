<template>
  <div class="bookLists">
    <mt-header title="主题书单" class="book-header">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="select">
      <ul class="select-bar">
        <li v-for="(item,index) in largeTypes" :class="{'active':index===largeTypeIndex}"
            @click="setLargeType(item.type,index,item.duration)">{{item.name}}
        </li>
      </ul>
      <ul class="select-bar">
        <li v-for="(item,index) in smallTypes" :class="{'active':index===smallTypeIndex}"
            @click="setSmallType(item.minor,index)">{{item.name}}
        </li>
      </ul>
    </div>
    <div class="load-more">
      <mt-loadmore class="loadmore" :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore" :auto-fill="false"
                   :bottom-all-loaded="allLoaded">
        <div class="book-list">
          <book-list :book="book" v-for="book in bookLists" :key="book._id" :isBookList="isBookList"
                     :isLoadMore="isLoadMore"></book-list>
        </div>
      </mt-loadmore>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import BookList from 'common/book-list'
  import {Indicator} from 'mint-ui'
  import {bookLists} from  '../../api/api'

  export default{
    data(){
      return {
        largeTypeIndex: 0,
        smallTypeIndex: 0,
        type: 'collectorCount',
        duration: 'last-seven-days',
        minor: '',
        gender: '',
        start: 0,
        currentPage: 1,
        largeTypes: [
          {
            type: 'collectorCount',
            name: '本周最热',
            duration: 'last-seven-days'
          },
          {
            type: 'created',
            name: '最新发布',
            duration: 'all'
          },
          {
            type: 'collectorCount',
            name: '最多收藏',
            duration: 'all'
          }
        ],
        smallTypes: [
          {
            minor: '',
            name: '全部'
          },
          {
            minor: 'male',
            name: '男生',
          },
          {
            minor: 'female',
            name: '女生'
          }
        ],
        bookLists: [],
        allLoaded: false,
        isBookList: true,
        isLoadMore: false
      }
    },
    created(){
      this._getBookLists(this.type, this.duration, this.start, this.gender)
    },
    methods: {
      setLargeType(type, index, duration){
        this.largeTypeIndex = index;
        this.type = type;
        this.duration = duration;
        this._getBookLists(this.type, this.duration, this.start, this.gender)
      },
      setSmallType(minor, index){
        this.smallTypeIndex = index;
        this.minor = minor;
        this.gender = '&gender=' + minor;
        this.currentPage = 1;
        this._getBookLists(this.type, this.duration, this.start, this.gender)
      },
      _getBookLists(type, dur, start, gender){
        Indicator.open('加载中');
        bookLists(type, dur, start, gender).then((res)=>{
            if(res.data.ok){
              this.bookLists = this._unEscape(this.normalizeBooks(res.data.bookLists))
              Indicator.close();
            }
        },(error)=>{
          Indicator.close();
          Indicator.open('网络错误');
           setTimeout(()=>{
             Indicator.close();
           },1500)
        })
//        api.get(`/booklists?sort=${type}&duration=${dur}&start=${start}${gender}`, {}, (res) => {
//          this.bookLists = this._unEscape(this.normalizeBooks(res.bookLists))
//          Indicator.close();
//        })


      },
      _unEscape(arr){
        for (let i = 0; i < arr.length; i++) {
          arr[i].cover = unescape(arr[i].cover);
          arr[i].cover = arr[i].cover.replace("/agent/", "")
        }
        return arr
      },
      loadBottom(){
        //加载更多
        this.isLoadMore = true;
        Indicator.open('加载中');
        api.get(`/booklists?sort=${this.type}&duration=${this.duration}&start=${this.currentPage * 20}${this.gender}`, {}, (res) => {
          res.bookLists.cover = this._unEscape(this.normalizeBooks(res.bookLists));
          this.bookLists = [...this.bookLists, ...res.bookLists];
          this.currentPage++;
          setTimeout(() => {
            this.isLoadMore = false
            Indicator.close();
          }, 350)
        });
        this.$refs.loadmore.onBottomLoaded()
      },
      loadTop(){
        //下拉加载
        this._getBookLists(this.type, this.duration, this.start, this.gender);
        this.$refs.loadmore.onTopLoaded()
      }
    },
    components: {
      BookList,
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .bookLists
    .book-header
      height 100px
      line-height 100px
      font-size 25px
      background #409eff
      position absolute
      width 100%
      z-index 10
    .select {
      position absolute
      top 100px
      left 0
      background #fff
      z-index 10
      width 100%
    }
    .select-bar {
      display flex
      flex-direction row
      justify-content flex-start
      flex-wrap nowrap
      height 100px
      width 100%
      overflow-x auto
      overflow-y hidden
      border-bottom 1px solid #f2f2f2
    }
    .select-bar li {
      flex-shrink 0
      line-height 100px
      padding 0 20px
      font-size 25px
    }
    .active {
      color red
    }
    .book-list {
      width 100%
      background #fff
    }
    .load-more
      padding-top 300px
      overflow-y scroll
      height 100vh
      box-sizing border-box
    .active {
      color #409eff
    }
</style>
