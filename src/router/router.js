import Vue from "vue";
import Router from "vue-router";
import Layout from "../views/layout/index.vue";
import Dashboard from "../views/dashboard/index.vue";
import Login from "../views/login/index.vue";
// views
import SysPosition from "../views/sys-config/position/index.vue";
import SysTitle from "../views/sys-config/title/index.vue";
import SysDepartment from "../views/sys-config/department/index.vue";
import User from "../views/user/index.vue";
import StaffBasic from "../views/staff/basic/index.vue";
import SalaryMonth from "../views/salary/month/index.vue";
import SalaryTable from "../views/salary/table/index.vue";

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
    path: "/sys-config",
    component: Layout,
    name: "sys-config",
    meta: { title: "系统配置", icon: "el-icon-star-on" },
    redirect: "/sys-config/position",
    alwaysShow: true,
    children: [
      {
        path: "position",
        name: "position",
        component: SysPosition,
        meta: {
          title: "职位管理",
          icon: "el-icon-star-on",
          roles: ["admin"]
        }
      },
      {
        path: "title",
        name: "title",
        component: SysTitle,
        meta: {
          title: "职称管理",
          icon: "el-icon-star-on",
          roles: ["admin"]
        }
      },
      {
        path: "config-list",
        name: "ConfigList",
        component: SysDepartment,
        meta: {
          title: "部门管理",
          icon: "el-icon-star-on",
          roles: ["admin"]
        }
      }
    ]
  },
  {
    path: "/user",
    component: Layout,
    name: "user",
    meta: { title: "用户管理", icon: "el-icon-star-on" },
    redirect: "/user/manager",
    alwaysShow: true,
    children: [
      {
        path: "manager",
        name: "user-manager",
        component: User,
        meta: {
          title: "用户管理",
          icon: "el-icon-star-on",
          roles: ["admin"]
        }
      }
    ]
  },
  {
    path: "/staff",
    component: Layout,
    name: "staff",
    meta: { title: "员工管理", icon: "el-icon-star-on" },
    redirect: "/staff/basic",
    alwaysShow: true,
    children: [
      {
        path: "basic",
        name: "staff-basic",
        component: StaffBasic,
        meta: {
          title: "基资资料",
          icon: "el-icon-star-on",
          roles: ["admin"]
        }
      }
    ]
  },
  {
    path: "/salary",
    component: Layout,
    name: "salary",
    meta: { title: "薪资管理", icon: "el-icon-star-on" },
    redirect: "/salary/table",
    alwaysShow: true,
    children: [
      {
        path: "table",
        name: "salary-table",
        component: SalaryTable,
        meta: {
          title: "薪资套餐",
          icon: "el-icon-star-on",
          roles: ["admin"]
        }
      },
      {
        path: "month",
        name: "salary-month",
        component: SalaryMonth,
        meta: {
          title: "员工薪资",
          icon: "el-icon-star-on",
          roles: ["admin"]
        }
      }
    ]
  }
];
