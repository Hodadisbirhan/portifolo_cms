import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'
import graphql from "@rollup/plugin-graphql"
export default defineNuxtConfig({

    vite: {
        plugins: [ graphql(),
          svgLoader({
          
          }),
          
        ]
      },
      build:{
      
          transpile: [
            '@apollo/client','@vue/apollo-composable',
            'ts-invariant/process',
            "graphql"
          ],
        
        postcss:{
            postcssOptions:{
               plugins: {
                   tailwindcss: {},
                   autoprefixer: {},
                 },
            }
        }
    },css: [
      '@/assets/css/main.css',
    ],
    runtimeConfig:{
      public:{
apiendpoint:process.env.API_ENDPOINT


}

    }
})
