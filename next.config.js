module.exports = {
    reactStrictMode: true,
    // async rewrites() {
    //     return [
    //         {
    //             source: 'login',
    //             destination: `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/:path*`
    //         },
    //     ]
    // }
    async rewrites() {
        return {
          fallback: [
            {
              source: '/:path*',
              destination: `http://localhost:4000/:path*`,
            },
          ],
        }
      },
}