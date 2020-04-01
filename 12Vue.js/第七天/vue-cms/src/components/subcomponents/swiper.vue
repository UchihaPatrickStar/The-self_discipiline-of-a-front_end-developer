<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 在组件中使用v-for循环的话，一定要绑定key -->
            <!-- 将来谁使用此轮播图组件，谁为我们传递lunbotuList -->
            <!-- 此时，lunbotuList应该是父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
                <img :src="item.img" alt="" :class="{'full': isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>


    <!-- 分析：为什么商品评论中的轮播图name丑 -->
    <!-- 1.首页中的图片，它的宽和高设置的都是100%的宽度 -->
    <!-- 2.在商品详情页面中，轮播图的图片，如果也使用宽高为100%的话，页面不好看 -->
    <!-- 3.商品详情页面中的轮播图，期望高度是100%，但是宽度为自适应 -->
    <!-- 4.经过分析，得到问题的原因，首页中的额轮播图和详情中的轮播图，分歧点到底是100%还是自适应 -->
    <!-- 5.既然这两个轮播图，其他方面都是没有冲突的，只是宽度有分歧，那么，我们可以定义一个熟悉，让使用轮播图的调用者，手动指定是否为100%的宽度 -->
</template>


<script>
export default {
    props: ["lunbotuList","isfull"],
}
</script>

<style lang="scss" scoped>
    .mint-swipe{
    height: 200px;
        .mint-swipe-item{
            text-align: center;
            // &:nth-child(1){
            //     background-color: red;
            // }
            // &:nth-child(2){
            //     background-color: blue;
            // }
            // &:nth-child(3){
            //     background-color: cyan;
            // }
            img{
                // width: 100%;
                height: 100%;
            }
        }
    }

    .full{
        width: 100%;
    }
</style>