module.exports = function(hljs) {
    return {
        case_insensitive: true, // language is case-insensitive
        keywords: 'endif and body context def derive else endif endpackage false if implies in init inv invalid let not null or package post pre self static then true xor',
        literal: 'false true null',
        contains: [
            {
                className: 'string',
                begin: '"', end: '"'
            },
            {
                className: 'string',
                begin: '\'', end: '\''
            },
            hljs.COMMENT(
                '/\\*', // begin
                '\\*/', // end
                {
                    contains: [
                        {
                            className: 'doc', begin: '@\\w+'
                        }
                    ]
                }
            )
        ]
    };
};