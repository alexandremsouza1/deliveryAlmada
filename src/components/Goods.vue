<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)" :key="item.name">
                        <span class="text">
                            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                            {{item.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul>
                    <li v-for="item in goods" class="food-list" ref="foodList" :key="item.name">
                        <h1 class="title">{{item.name}}</h1>
                        <ul>
                            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)" :key="food.name">
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon" alt="">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol :food="food" @add="addFood"></cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="this.$seller.deliveryPrice" :min-price="this.$seller.minPrice"></shopcart>
        </div>
        <!--v-ref='food'可以允许父组件调用子组建的方法-->
        <food @add="addFood" :food="selectedFood" ref="food"></food>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import shopcart from 'src/components/Shopcart';
    import cartcontrol from 'src/components/CartControll';
    import food from 'src/components/Food';
    const ERR_OK = 0;
    export default {
      props: {
        seller: {
          type: Object
        }
      },
      data () {
        return {
          goods: [],
          classMap: [],
          listHeight: [], // 用于标记左侧菜单栏的高度
          scrollY: 0,
          selectedFood: {}
        }
      },
      created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.goods = this.$goods;
            // $nextTick：拿到数据以后在进行下一步的操作
            this.$nextTick(() => {
              this._initScroll();// 滑动
              this._calculateHeight();// 计算高度
            })
      },
      computed: {
        currentIndex () { // 用于对应和比较左侧菜单栏与右侧商品栏的高度
          for (let i = 0; i < this.listHeight.length; i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
              return i;
            }
          }
          return 0;
        },
        selectFoods () {
          let foods = [];
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food)
              }
            })
          })
          return foods;
        }
      },
      methods: {
        selectMenu (index, event) {
          // 在初始化时click: true，会派发一个click事件，这将导致pc端将会响应两次，移动端响应一次，若不设置click: true，pc端只会响应一次，而移动端则不会响应
          if (!event._constructed) { // 浏览器原生的事件中，是不存在_constructed这个属性的，这是BScroll派发出来的事件
            return
          }
          let foodList = this.$refs.foodList;
          let el = foodList[index];
          this.foodsScroll.scrollToElement(el, 300);
        },
        selectFood (food, event) {
          if (!event._constructed) { // 浏览器原生的事件中，是不存在_constructed这个属性的，这是BScroll派发出来的事件
            return
          }
          this.selectedFood = food;
          // 调用子组建food的show方法
          this.$refs.food.show();
        },
        addFood (target) {
          this._drop(target);
        },
        _drop (target) {
          // 体验优化,异步执行下落动画
          this.$nextTick(() => {
            // this.$refs.shopcart表示调用子组建的方法
            this.$refs.shopcart.drop(target);
          });
        },
        _initScroll () {
          this.menuScroll = new BScroll(this.$refs.menuWrapper, {
            click: true // 允许点击事件
          });

          this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
            probeType: 3, // 相当于一个探针的效果，告诉实时滚动的位置
            click: true // 允许点击事件
          });

          this.foodsScroll.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
          });
        },
        _calculateHeight () {
          let foodList = this.$refs.foodList;
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i];
            height += item.clientHeight;
            this.listHeight.push(height);
          }
        }
      },
      components: {
        shopcart,
        cartcontrol,
        food
      }
    };
</script>

<style lang='stylus' rel="stylesheet/stylus">
  @import "../common/stylus/mixin"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 90px
      width: 10px
      height: 0px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        font-size: 0
        padding: 0 12px
        &.current
          position: relative
          margin-top: -1px
          z-index: 10
          background: #fff
          .text
            border-none()
            font-weight: 700
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          font-size: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('../assets/decrease_3')
          &.discount
            bg-image('../assets/discount_3')
          &.guarantee
            bg-image('../assets/guarantee_3')
          &.invoice
            bg-image('../assets/invoice_3')
          &.special
            bg-image('../assets/special_3') 
        .text
          display: table-cell
          font-size: 12px
          width: 56px
          vertical-align: middle
          border-1px(rgba(7,17,27,0.1))
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147,153,159)
        background: #f3f5f7
      .food-item
        display: flex
        padding: 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
        .icon
          flex: 0 0 57px
          width: 57px
          margin-right: 10px
        .content
          flex: 1
          position: relative
          .name
            font-size: 14px
            line-height: 14px
            margin: 2px 0 8px 0
            color: rgb(7,17,27)
          .desc, .extra
            font-size: 10px
            color: rgb(147,153,159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            .count
              margin-right: 12px
              line-height: 10px
          .price
            font-weight: 700
            line-height:24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240,20,20)
            .old
              font-size: 10px
              color: rgb(147,153,159)
              text-decoration: line-through
          .cartcontroll-wrapper
            position: absolute
            right: 0
            bottom: -6px
</style>
