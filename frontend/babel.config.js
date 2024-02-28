module.exports = {
    presets: [
        '@babel/preset-typescript',
        '@babel/preset-flow',
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: 'last 2 versions',
                },
                modules: 'cjs',
            },
        ],
    ],
    plugins: ['transform-class-properties'],
    env: {
        test: {
            plugins: ['transform-es2015-modules-commonjs'],
        },
    },
}
