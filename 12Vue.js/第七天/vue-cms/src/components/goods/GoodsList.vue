<template>
    <!-- <router-link class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ this.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥ {{item.sell_price}}</span>
                    <span class="old">¥ {{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span> 
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </router-link> -->


    <!-- 在网页中有两种跳转方式： -->
    <!-- 方式1：使用a标签的形式叫做标签跳转 -->
    <!-- 方式2：使用window.location.href的形式，叫做编程式导航 -->
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ this.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥ {{item.sell_price}}</span>
                    <span class="old">¥ {{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span> 
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>


<script>
export default {
    data(){
        return{
            pageindex: 1,
            goodslist: []
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
                if(result.body.status === 0){
                    // this.goodslist = result.body.message;
                    this.goodslist = this.goodslist.concat(result.body.message);
                }
            })
        },
        getMore(){
            this.pageindex++
            this.getGoodsList
        },
        goDetail(id){
            // 使用JS的形式进行路由导航
            // 1.最简单的
            // this.$router.push('/home/goodsinfo/' + id);
            // 2.传递对象
            // this.$router.push({path: '/home/goodsinfo/' + id});
            // 3.传递命名的路由
            this.$router.push({name: "goodsinfo", params: {id}});
        }
    }
}
</script>


<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;  //网速慢时解决会挤一块儿的问题
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }

            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 0;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell{  
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>


