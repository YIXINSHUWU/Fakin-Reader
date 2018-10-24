<template>
  <div class="bookLists">
    <mt-header :title="title" class="book-header">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="load-more" ref="load">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="false"
                   :bottom-all-loaded="allLoaded">
        <div class="book-list">
          <book-list :book="book" v-for="(book,index) in bookLists" :key="book._id" :isSearch="isSearch"
                     :isLoadMore="isLoadMore"></book-list>
          <div class="loading-container" v-show="!bookLists.length">
            <div style="text-align: center;margin-top: 10px;">没有找到更多书籍</div>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import BookList from 'common/book-list'
  import {Indicator} from 'mint-ui'
  import {search} from  '../../api/api'
  export default{
    data(){
      return {
        title: '',
        bookLists: [],
        allLoaded: false,
        currentLoadPage: 1,
        isSearch: true,
        isLoadMore: false
      }
    },
    computed: {
      ...mapGetters([
        'search'
      ]),
    },
    created(){
    },
    methods: {
      _getBookLists(val){
        Indicator.open('加载中');
        search(val).then((res) => {
          if (res.data.ok) {
            this.bookLists = this._unEscape(this.normalizeBooks(res.data.books.slice(0, 20)))
            if (this.bookLists <= 20 || this.bookLists.length === res.data.books.length) {
              this.allLoaded = true
            }
            Indicator.close();

          }
        })
      },
      _unEscape(arr){
        for (let i = 0; i < arr.length; i++) {
          arr[i].cover = unescape(arr[i].cover);
          arr[i].cover = arr[i].cover.replace("/agent/", "")
        }
        return arr
      },
      loadBottom(){
        this.isLoadMore = true;
        Indicator.open('加载中');
        search(this.$route.query.val).then((res) => {
          if (res.data.ok) {
            if (this.bookLists <= 20 || this.bookLists.length === res.data.books.length) {
              this.allLoaded = true
            }
            this.bookLists = this._unEscape(this.normalizeBooks(res.data.books.slice(0, this.currentLoadPage * 20 + 20)));
            this.currentLoadPage++;
            setTimeout(() => {
              Indicator.close();
              this.isLoadMore = false;
            }, 350)
          }


        });
        this.$refs.loadmore.onBottomLoaded()

      }
    },
    components: {
      BookList,
    },
    beforeRouteEnter(to, from, next){
      next(vm => {
        vm.title = `跟"${vm.$route.query.val}"有关的书籍`;
        vm._getBookLists(vm.$route.query.val)
      })
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
      text-align center
      flex 1
      line-height 100px
      padding 0 20px
      font-size 25px
    }
    .book-list {
      width 100%
      background #fff
    }
    .load-more
      padding-top 100px
      overflow-y scroll
      height 100vh
      box-sizing border-box
    .active {
      color #409eff
      border-bottom 1px solid #409eff; /* no*/
    }
</style>
