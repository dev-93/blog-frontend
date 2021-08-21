module.exports = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
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