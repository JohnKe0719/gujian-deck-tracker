const path = require('path')
const colors = require('vuetify/es5/util/colors').default

const messages = require('./locales')

module.exports = {
    mode: 'spa',
    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },
    router: {
        // extendRoutes(routes, resolve) {
        //     console.log(routes)
        //     const index = routes.findIndex(route => route.name === 'main')
        //     routes[index] = {
        //         ...routes[index],
        //         components: {
        //         default: routes[index].component,
        //             top: resolve(__dirname, 'components/mainTop.vue')
        //         },
        //         chunkNames: {
        //             top: 'components/mainTop'
        //         }
        //     }
        // }
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {
        color: '#005CB9'
    },
    /*
    ** Global CSS
    */
    css: [
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
      
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/vuetify'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        [
            'nuxt-i18n',
            {
                seo: true,
                locales: [
                    {
                        code: 'en',
                        iso: 'en-US'
                    },
                    {
                        code: 'tw',
                        iso: 'zh-TW'
                    },
                    {
                        code: 'cn',
                        iso: 'zh-CN'
                    }
                ],
                defaultLocale: 'en',
                vueI18n: {
                    fallbackLocale: 'en',
                    messages: messages
                }
            }
        ]
    ],
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            options: {
                customProperties: true
            },
            primary: '#005CB9',
            grey: '#595757',
            'sc-blue': '#005CB9',
            'sc-pink': '#FF615F',
            'sc-gray': '#595757',
            'sc-light-gray': '#F8F8F8',
            'sc-text-gray': '#4D4D4D',
            'sc-gray-bgc': '#FAFBFF'
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {}
    },
    generate: {
        dir: path.resolve(__dirname, 'dists')
    }
}
