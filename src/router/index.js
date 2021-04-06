import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/rsvp/:recordId",
    props: true,
    name: "Junto",
    component: () => import("../views/Junto.vue")
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
