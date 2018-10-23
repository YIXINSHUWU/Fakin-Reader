<template>
  <div class="myBooks">
    <mt-header title="我的书架" class="book-header">
      <router-link to="/home" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" @click="showCheck" class="btn" ref="Btn" v-show="books.length">编辑</mt-button>
    </mt-header>
    <div class="addBooks" v-show="books.length<8">
      <mt-button type="primary" @click="goAdd">去添加</mt-button>
    </div>
    <div class="book-list">
      <div class="book-item" v-for="(book,index) in books" @click="goReadBooks(book.id)">
        <mt-checklist :options="[option[index]]" v-model="value" ref="checklist" style="display: none" class="check">
        </mt-checklist>
        <div class="cover">
          <img :src="_unEscape(book.cover)">
        </div>
        <p class="name">{{book.title}}</p>
      </div>
    </div>
    <div class="delete" ref="delete" style="opacity: 0">
      <mt-button type="primary" class="deleteBtn" ref="deleteBtn" @click="deleteBooks">删除({{value.length}})
      </mt-button>
      <mt-button type="default" class="deleteBtn" ref="qxBtn" @click="hideCheck">取消</mt-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        books: [],
        option: [],
        value: [],
        isShowCheck: false
      }
    },
    created(){
      this.getBooks();
    },
    methods: {
      goAdd(){
        this.$router.push({
          path: '/categories'
        })
      },
      getBooks(){
        let bookIdArray = [];
        let localShelf = JSON.parse(window.localStorage.getItem('book')) ? JSON.parse(window.localStorage.getItem('book')) : {};
        for (let i in localShelf) {
          localShelf[i].cover = this._unEscape(localShelf[i].cover)
          this.books.push(localShelf[i])
          bookIdArray.push(i)

        }
        this.option = bookIdArray;
      },
      _unEscape(str){
        str = unescape(str).replace("/agent/", "")
        return str
      },
      showCheck(){
        this.isShowCheck = true;
        let check = this.$refs.checklist;
        this.$refs.delete.style.opacity = 1;
        for (let i = 0; i < check.length; i++) {
          check[i].$el.style.display = 'block'
        }
      },
      hideCheck(){
        let check = this.$refs.checklist;
        this.$refs.delete.style.opacity = 0;
        for (let i = 0; i < check.length; i++) {
          check[i].$el.style.display = 'none'
        }
        this.isShowCheck = false
      },
      deleteBooks(){
        let arr = this.value;
        let storage = window.localStorage;
        let localShelf = JSON.parse(storage.getItem('book')) ? JSON.parse(storage.getItem('book')) : {};
        arr.forEach((item, index) => {
          delete localShelf[arr[index]]
        });
        storage.setItem('book', JSON.stringify(localShelf))
        window.location.reload()
      },
      goReadBooks(id){
        if (this.isShowCheck) {
          return
        }
        this.$router.push({
          path: `/readBook/${id}`
        })


      }
    },
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

  @import '../../assets/style/my-mint.styl'
  .myBooks
    position fixed
    width 100%
    height 100%
    top 0
    left 0
    right 0
    bottom 0
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
      z-index 10
    .addBooks
      position absolute
      width 200px
      height 80px
      left 50%
      top 60%
      z-index 200
      background #409eff
      margin-left -100px
      margin-top -80px
      font-size 25px
      border-radius 15px
      button
        width 100%
        height 100%
    .book-list
      padding 20px
      box-sizing border-box
      overflow hidden
      .book-item
        float left
        width 25%
        overflow hidden
        padding-right 15px
        box-sizing border-box
        text-align center
        margin-bottom 20px
        position relative
        &:nth-child(4n)
          padding-right 0
        .cover
          width 100%
          background: url('../../assets/images/default.jpg') no-repeat
          background-position 50%
          background-size 100%
          img
            width 100%
            height 200px
        .name
          width 100%
          margin-top 10px
          font-size 25px
          white-space nowrap
          overflow hidden
          text-overflow ellipsis

  .btn
    margin-right 10px

  .check
    position absolute
    left 0
    top 0
    width 100%;
    height 100%
    text-align left

  .delete
    position absolute
    width 100%
    height 80px
    bottom 0
    left 0
    display flex
    .deleteBtn
      flex 1
      height 80px
      box-sizing border-box

</style>
