/// <reference types="vite/client" />

declare module '*.png' {
  const src: string
  export default src
}

declare global {
  interface Window {
    viewer: any
  }
}

declare module '*.js'
