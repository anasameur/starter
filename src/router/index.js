import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layouts/default';

// import Okta Vue SDK
import Auth from '@okta/okta-vue';

// import okta callback
import implicitCallback from '@/components/boilerplate/implicitCallback';

// import error page
import errorPage from '@/components/boilerplate/errorPage';

// set Okta Configuration
Vue.use(Auth, {
  issuer: process.env.OKTA_ISSUER,
  client_id: process.env.OKTA_CLIENT_ID,
  redirect_uri: process.env.OKTA_REDIRECT_URL,
  scope: 'openid profile email',
  response_type: 'id_token',
});

Vue.use(Router);

const RouteContainer = () => import('@/layouts/routeContainer.vue');
const PageHome = () => import(/* webpackChunkName: "Home" */ '@/pages/Home.vue');
const PageNotFound = () => import(/* webpackChunkName: "NotFound" */ '@/pages/NotFound.vue');

/*
                  (!!!!!!!!!!!!!!!!!! must set !!!!!!!!!!!!!!!!!!!!!)
* name:'router-name'             the name is used by <router-link> ':to' directive
                                 the value of the 'to' prop will be passed to router.push()
                                 us name route not specific path for handling nested route
                                 (!!!!!!!!!!!!!!!!!! must set !!!!!!!!!!!!!!!!!!!!!)
* meta : {
    title: 'title'               the name show in submenu (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
*/

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/implicit/callback',
      component: implicitCallback,
    },
    {
      path: '/error',
      name: 'error',
      component: errorPage,
    },
    {
      path: '*',
      name: 'AllPath',
      redirect: {
        path: '/404',
      },
    },
    {
      path: '/404',
      name: 'NotFound',
      component: PageNotFound,
    },
    {
      path: '/',
      name: 'Root',
      component: Layout,
      redirect: {
        name: 'home',
      },

      // Activate Protected Route
      // Routes are protected by the authRedirectGuard, which verifies
      // there is a valid accessToken or idToken stored.
      // To ensure the user has been authenticated before accessing your route,
      // activate the requiresAuth metadata:

      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: PageHome,
          meta: {
            title: 'home',
            icon: 'home',
          },
        },
        {
          path: 'site',
          name: 'site',
          component: PageHome,
          meta: {
            title: 'site',
            icon: 'location_on',
          },
        },
        {
          path: 'items',
          name: 'items',
          component: RouteContainer,
          meta: {
            title: 'item',
            icon: 'assessment',
          },
          children: [
            {
              path: 'item',
              name: 'item',
              component: PageHome,
              meta: {
                title: 'item',
                icon: 'assessment',
              },
            },
            {
              path: 'nested-item',
              name: 'nested-item',
              component: RouteContainer,
              meta: {
                title: 'nested_item',
                icon: 'sync',
              },
              children: [
                {
                  path: 'very-nested-item',
                  name: 'very-nested-item',
                  component: PageHome,
                  meta: {
                    title: 'very_nested_item',
                    icon: 'sync',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
