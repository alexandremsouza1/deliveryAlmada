<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{this.seller.score}}</h1>
          <div class="title">Avaliação geral</div>
          <div class="rank">Maior do que as empresas vizinhas{{this.seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">Atitude de serviço</span>
            <star :size="36" :score="this.seller.serviceScore"></star>
            <span class="score">{{this.seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">Classificação do produto</span>
            <star :size="36" :score="this.seller.foodScore"></star>
            <span class="score">{{this.seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">tempo de entrega</span>
            <span class="delivery">{{this.seller.deliveryTime}}minuto</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type = "selectType" :only-content = "onlyContent" :ratings="this.ratings" @select="selectRating" @toggle="toggleContent"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType, rating.text)" v-for="(rating,index) in ratings" class="rating-item" :key="index">
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <q-icon name="thumb_up"/>
                <!--<span class="icon-thumb_up"></span> -->
                <span class="item" v-for="item in rating.recommend" :key="item.name">{{item}} </span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
    </div>
    </div>
  </div>
</template>

<script>
import star from 'src/components/Star'
import BScroll from 'better-scroll'
import split from 'src/components/Split'
import ratingselect from 'src/components/Ratingselect'
import {formatDate} from '../common/js/date'
import axios from 'axios'
const ALL = 2
const ERR_OK = 0
export default {
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created () {
        this.ratings = this.$ratings
        // this.$nextTick(() => {
        //   this.scroll = new BScroll(this.$refs.ratings, {
        //     click: true
        //   })
        // })
  },
  components: {
    star,
    split,
    ratingselect
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    selectRating (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  }
}
</script>

<style lang='stylus' rel="stylesheet/stylus">
 @import '../common/stylus/mixin'
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 90px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px) // 设计稿是根据i6的，这里媒体查询为了适配i5等小屏幕
          padding-left: 6px
          .star
            margin: 0 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            line-height: 12px
            font-size: 10px
            margin-bottom: 4px
            color: rgb(7,17,27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            font-size: 12px
            line-height: 18px
            color: rgb(7,17,27)
            margin-bottom: 8px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0,160,220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7,17,27,0.1)
              border-radius: 1px
              color: rgb(147,153,159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 16px
            font-size: 10px
            color: rgb(147,153,159)
</style>
