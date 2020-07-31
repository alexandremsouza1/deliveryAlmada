<template>
  <div id="q-app">
     <v-header :seller="seller"></v-header>
    <!--:seller是缩写，用于接收header抛出啦seller-->
      <q-tabs  class="tab" switch-indicator>
      <q-route-tab
        class="tab-item"
        icon="menu_book"
        to="/goods"
        exact
      />
      <q-route-tab
        class="tab-item"
        icon="thumbs_up_down"
        to="/ratings"
        exact
      />
       <q-route-tab
        class="tab-item"
        icon="storefront"
        to="/seller"
        exact
      />
    </q-tabs>
    <!--路由外链-->
    <router-view :seller="seller"></router-view>
    <!--<div class="content">
      I am content
    </div>-->
  </div>
</template>
<script>
  import header from 'src/components/Header.vue';
  const ERR_OK = 0;

  export default {
    // data()和created()函数都是vue-resource中的语法
    data () {
      return {
        seller: {
          id: (() => {
            // 这里的id指的是每个商家的id
            let queryParam = 1;
            return queryParam;
          })()
        }
      };
    },
    created () {
      this.seller = Object.assign({}, this.seller, this.$seller);
    },
    components: {
      'v-header': header
    }
  }
  
</script>

<style>
  /*vue-loader会自动帮我们解决浏览器中的兼容问题*/
  .tab {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-top: 1px solid rgba(7,17,27,0.1);
      border-bottom: 1px solid rgba(7,17,27,0.1);
  }

  .tab .tab-item {
      flex: 1;
      font-size: 14px;
      text-align: center;
  }  
  .tab .tab-item .active {
      color: rgb(240,20,20);
  }  
  ul {
    list-style-type: none;
    padding: 0;
  }
</style>
