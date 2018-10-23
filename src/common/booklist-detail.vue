<template>
  <div class="booklist-item">
    <mt-header title="书单详情" class="book-header">
      <router-link to="/bookLists" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="author" v-show="author.nickname">
      <div class="author-top">
        <img :src="img+author.avatar" alt="">
        <div class="top-right">
          <div class="name">{{author.nickname}}</div>
          <div class="lastTime">{{upDate <= 0 ? '刚刚更新' : `${upDate}小时前更新`}}
          </div>
        </div>
      </div>
      <div class="author-des">
        <h1>{{title}}</h1>
        <div class="desc">{{desc}}</div>
      </div>
    </div>
    <div class="item" v-show="booklist.length>0">
      <ul>
        <li @click="goBooks(item.book._id)" v-for="item in booklist">
          <div class="book-info">
            <div class="img">
              <img :src="imgEscpe(item.book.cover)"
                   alt="">
            </div>
            <div class="book-right">
              <h1>{{item.book.title}}</h1>
              <div class="book-data">
                <span>{{item.book.author}}</span> | <span>{{item.book.cat}}</span> | <span
                class="c-rq">{{latelyFollower(item.book.latelyFollower)}}</span>万人气
              </div>

            </div>

          </div>
          <div class="book-comment">{{item.comment}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {bookListsInfo} from '../api/api'
  export default{
    data(){
      return {
        booklist: [],
        title: '',
        desc: '',
        author: {},
        img: 'http://statics.zhuishushenqi.com',
        upDate: ''
      }
    },
    computed: {},
    created(){
      this.getBooksList(this.$route.params.id)
    },
    methods: {
      latelyFollower (lately) {
        return (lately / 10000).toFixed(1)
      },
      imgEscpe(url){
        return unescape(url.replace("/agent/", ""));

      },
      goBooks(id){
        this.$router.push({
          path: `/book/${id}`
        });
      },
      getBooksList(id){
        bookListsInfo(id).then((res)=>{
            console.log(res)
          this.upDate = this._time(res.data.bookList.updated);
          this.author = res.data.bookList.author;
          this.desc = res.data.bookList.desc;
          this.title = res.data.bookList.title;
          this.booklist = res.data.bookList.books
        })
      },
      _unEscape(arr){
        for (let i = 0; i < arr.length; i++) {
          arr[i].cover = unescape(arr[i].cover);
          arr[i].cover = arr[i].cover.replace("/agent/", "")
        }
        return arr
      },
      _time(time){
        let currentTime = Math.round(new Date() / 1000);
        this.upDate = time.replace("T", ' ').replace("Z", ' ');
        this.upDate = Date.parse(new Date(this.upDate)) / 1000;
        return Math.floor((currentTime - this.upDate) % 86400 / 3600)
      },
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .booklist-item
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    width 100%
    z-index 100
    background #fff
    overflow-y scroll
    max-width: 750px; /*no*/
    margin: 0 auto;
    .book-header
      height 100px
      line-height 100px
      font-size 25px
      background #409eff
      width 100%
    .author
      padding 30px
      position relative
      box-sizing border-box
      border-bottom 1px solid #ebebeb; /*no*/
      .author-top
        height 80px
        img
          width 70px
          height 70px
          position absolute
          left 30px
          top 30px
        .top-right
          margin-left 80px
          .name
            margin-bottom 10px

      .author-des
        h1
          line-height 80px;
          height 80px
          font-size 25px
        .desc
          line-height 40px
          color #999
    .item
      .book-info
        padding 30px
        display flex

        box-sizing border-box
        .img
          height 140px
          width 100px
          margin-right 30px
          overflow hidden
          background url('../assets/images/default.jpg') no-repeat
          background-position 50%
          background-size 100%
          img
            max-width 100%
        .book-right
          flex 1
          h1
            line-height 80px
            height 80px
            font-size 25px
          .book-data
            color #999
          .c-rq
            color red
      .book-comment
        line-height 40px
        padding 0 30px 30px 30px
        border-bottom 1px solid #ebebeb
        color #999
</style>
