import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/c/:hash",
    props: true,
    name: "Claim",
    component: () => import("../views/Claim.vue")
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("../views/NotFound.vue")
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
