// 官方的元件
import Vue from 'vue';
import VueRouter from 'vue-router';

// 自訂的分頁元件
import Home from '@/components/HelloWorld';
import Page from '@/components/pages/page';
import child1 from '@/components/pages/child';
import child2 from '@/components/pages/child2';
import child3 from '@/components/pages/child3';
import Menu from '@/components/pages/menu';

Vue.use(VueRouter);

export default new VueRouter({
    // mode:'history',//去除符號 #，但是需前後端配合
    linkActiveClass:'active',//按不同分頁時，針對標籤className的替換
    routes:[
        {
            name:'首頁',// 元件呈現的名稱
            path:'/index',// 對應的虛擬路徑
            component:Home,// 對應的元件
        },
        {
            // name:'分頁',// 元件呈現的名稱，因為下面有children的path是空白，所以這行可以拿掉
            path:'/page',// 對應的虛擬路徑
            // component:Page,// 對應的元件
            components:{
                default:Page,
                menu:Menu,
            },
            children:[
                {
                    name:'卡片1',// 元件呈現的名稱
                    path:'',// 對應的虛擬路徑
                    component:child1,// 對應的元件
                }, 
                {
                    name:'卡片2',// 元件呈現的名稱
                    path:'child2',// 對應的虛擬路徑
                    component:child2,// 對應的元件
                }, 
                // {
                //     name:'卡片3',// 元件呈現的名稱
                //     path:'child/:id',// 對應的虛擬路徑
                //     component:child3,// 對應的元件
                // }
                {
                    name:'卡片3',// 元件呈現的名稱
                    path:'child3',// 對應的虛擬路徑
                    component:child3,// 對應的元件
                }
            ]
        }
    ],
})