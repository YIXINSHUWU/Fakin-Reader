<template>
  <div class="header">
    <span class="header-txt">
      Fakin小说
    </span>
    <router-link to="/mybooks">
    <div class="header-sj" >
      <i class="fa fa-book"></i>
      <span>书架</span>
    </div>
    </router-link>
    <div class="header-tab">
      <router-link tag="a" class="tab-item" to="/home">首页</router-link>
      <router-link tag="a" class="tab-item" to="/categories">分类</router-link>
      <router-link tag="a" class="tab-item" to="/rank">排行</router-link>
      <router-link tag="a" class="tab-item" to="/bookLists" >书单</router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{

  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .header
    position relative
    .header-txt
      display inline-block
      font-size 35px
      color #409EFF
      font-weight 600
      padding 30px 15px
    .header-sj
      position absolute
      right 15px
      top 40px
      font-size 25px
      color #409EFF
      i
        vertical-align top
    .header-tab
      display flex
      .tab-item
        flex 1
        font-size 25px
        text-align center
        line-height 80px
        background #409EFF
        color #d6d6d6
      .router-link-active
        color #fff

</style>
