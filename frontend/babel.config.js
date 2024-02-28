module.exports = {
    presets: [
        '@babel/preset-typescript',
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
    plugins: ['@babel/plugin-proposal-class-properties'],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-modules-commonjs'],
        },
    },
};

