window.onload = function(){
    // 区域滚动效果
    // 条件：一个容器装着一个容器的html结构
    // 找到大容器
  
    new IScroll(document.querySelector('.jd_cateLeft'),{
        scrollX: false,
        scrollY: true
    });
      // 子容器需大于父容器  这里设置jd_cateRight_box的width为101%，此时可以向左右滑动
    new IScroll(document.querySelector('.jd_cateRight'),{
        scrollX: true,
        scrollY: true
    });
}