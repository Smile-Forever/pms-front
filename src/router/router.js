import Vue from "vue";
import Router from "vue-router";
import Layout from "../views/layout/index.vue";
import Dashboard from "../views/dashboard/index.vue";
import ConfigList from "../views/rate-limiter/config-list/index.vue";
import DowngradeConfigList from "../views/downgrade/downgrade.vue";
import Monitor from "@/views/rate-limiter/exceed-history/index.vue";
import Login from "../views/login/index.vue";
Vue.use(Router);

export const constantRouterMap = [
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { title: "仪表盘", icon: "el-icon-menu", roles: ["admin"] }
      }
    ]
  },
  {
    path: "/login",
    component: Login,
    hidden: true
  }
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: "/rate-limiter",
    component: Layout,
    name: "rate-limiter",
    meta: { title: "限流", icon: "el-icon-star-on" },
    redirect: "/rate-limiter/config-list",
    alwaysShow: true,
    children: [
      {
        path: "config-list",
        name: "ConfigList",
        component: ConfigList,
        meta: {
          title: "限流配置",
          icon: "el-icon-star-on",
          roles: ["admin"]
        }
      },
      {
        path: "exceed-history",
        name: "ExceedHistory",
        component: Monitor,
        meta: {
          title: "超额记录",
          icon: "el-icon-star-on",
          roles: ["admin", "editor"]
        }
      }
    ]
  },
  {
    path: "/api-downgrade",
    component: Layout,
    name: "api-downgrade",
    meta: { title: "API降级", icon: "el-icon-star-on" },
    redirect: "/api-downgrade/config-list",
    alwaysShow: true,
    children: [
      {
        path: "config-list",
        name: "downgrade-config-list",
        component: DowngradeConfigList,
        meta: {
          title: "降级配置",
          icon: "el-icon-star-on",
          roles: ["admin"]
        }
      }
    ]
  }
];
