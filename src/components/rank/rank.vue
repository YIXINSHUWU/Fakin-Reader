<template>
  <div>
    <m-header></m-header>
    <div class="rank-wrapper">
      <div class="rank-section" v-show="maleRank.length">
        <h4>男生</h4>
        <div class="rank-item" v-for="item in maleRank" @click="goRankDetail(item)">
          <img :src="url+item.cover" alt="">
          <span>{{item.title}}</span>
        </div>

      </div>
      <div class="rank-section" v-show="femaleRank.length">
        <h4>女生</h4>
        <div class="rank-item" v-for="item in femaleRank" @click="goRankDetail(item)">
          <img :src="url+item.cover" alt="">
          <span>{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  import {rankCategory} from '../../api/api'
  import {Indicator} from 'mint-ui'
  export default{
    data(){
      return {
        url: 'http://statics.zhuishushenqi.com/',
        femaleRank: [],
        maleRank: []
      }
    },
    created(){
      this.getRanking()
    },
    methods: {
      getRanking(){
        Indicator.open('加载中...');
        rankCategory().then((res) => {
          if (res.data.ok) {
            this.femaleRank = res.data.female.slice(0, 6);
            this.maleRank = res.data.male.slice(0, 6)
            Indicator.close()
          }
        }, (error) => {
          Indicator.close();
          Indicator.open('网络错误');
          setTimeout(() => {
            Indicator.close();
          }, 1500)
        })
      },
      goRankDetail(item){
        this.$router.push({
          path: `/rank/${item._id}`,
          query: {title: item.title}
        });
        this.setRank(item)
      },
      ...mapMutations({
        setRank: 'SET_RANK'
      }),
    }

  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .rank-wrapper
    .rank-section
      h4
        line-height 100px
        padding 0 20px
        color #666
        font-weight normal
      .rank-item
        display flex
        height 100px
        align-items center
        padding-left 20px
        img
          width 70px
          height 70px

        span
          flex 1
          margin-left 20px
          line-height 50px
          font-size 25px
          border-bottom 1px solid #f5f5f5
          padding 20px 0
          box-sizing content-box
</style>
