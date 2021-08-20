module.exports = {
    reactStrictMode: true,
    async redirects() {
        return [
          {
            source: '/',
            destination: '/post',
            permanent: true,
          },
        ]
    },
}