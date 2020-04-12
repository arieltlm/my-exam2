const namingPattern = /^-?[a-z0-9]+(-[a-z0-9]+)*$/

module.exports = {
    extends: 'stylelint-config-standard',
    plugins: [
        'stylelint-order',
        'stylelint-scss'
    ],
    rules: {
        'at-rule-no-vendor-prefix': true,
        'block-opening-brace-space-before': 'always-multi-line',
        'color-hex-length': 'long',
        'color-named': 'never',
        'declaration-block-no-duplicate-properties': true,
        'declaration-block-semicolon-newline-after': 'always',
        'declaration-block-semicolon-newline-before': 'never-multi-line',
        'declaration-colon-newline-after': null,
        'declaration-colon-space-after': 'always-single-line',
        'declaration-empty-line-before': ['never', {
            ignore: ['after-declaration'],
        }],
        'font-family-name-quotes': 'always-unless-keyword',
        'font-weight-notation': 'numeric',
        'function-max-empty-lines': 1,
        'function-url-quotes': 'always',
        indentation: [4, {
            // align multiline property values
            ignore: ['value'],
        }],
        'length-zero-no-unit': true,
        'max-empty-lines': 3,
        'max-line-length': 200,
        'max-nesting-depth': 10,
        'media-feature-name-no-vendor-prefix': true,
        'no-descending-specificity': null,
        'no-duplicate-selectors': true,
        'no-unknown-animations': true,
        'number-max-precision': 8,
        'number-no-trailing-zeros': true,
        'property-no-unknown': true,
        'rule-empty-line-before': ['always-multi-line', {
            except: ['first-nested'],
            ignore: ['after-comment'],
        }],
        'selector-attribute-quotes': 'always',
        'selector-class-pattern': namingPattern,
        'selector-id-pattern': namingPattern,
        'selector-max-compound-selectors': 10,
        // "id,class,type"
        'selector-max-specificity': '1,3,3',
        'selector-max-id': 1,
        'selector-max-universal': 0,
        'selector-no-vendor-prefix': true,
        'selector-pseudo-class-no-unknown': [true, {
            // :global is used by css modules
            ignorePseudoClasses: ['global']
        }],
        'string-quotes': 'double',
        'time-min-milliseconds': 100,
        'unit-blacklist': ['pt'],
        'value-keyword-case': 'lower',
        'value-list-comma-newline-before': 'never-multi-line',
        'value-no-vendor-prefix': true,
        'order/order': [
            [
                'custom-properties',
                'at-variables',
                'dollar-variables',
                'less-mixins',
                {
                    type: 'at-rule',
                    name: 'include'
                },
                'declarations',
                'rules',
            ],
            { unspecified: 'ignore' }
        ],
        // property order is defined in a separate file for legibility
        'order/properties-order': [
            require('./property-order.js'),
            { unspecified: 'bottomAlphabetical' }
        ],
        'at-rule-empty-line-before': ['always', {
            except: ['blockless-after-blockless', 'first-nested'],
            ignore: ['after-comment'],
            // allow @else to come on same line as closing @if brace
            ignoreAtRules: ['import', 'else'],
        }],
        'at-rule-no-unknown': [true, {
            ignoreAtRules: [
                // additional scss at-rules:
                'content', 'each', 'else', 'error', 'extend', 'for', 'function', 'if', 'include', 'mixin', 'return',
            ],
        }],
        'block-closing-brace-newline-after': ['always', {
            // allow @else to come on same line as closing @if brace
            ignoreAtRules: ['else', 'if'],
        }],
        'scss/at-extend-no-missing-placeholder': true,
        'scss/at-function-pattern': namingPattern,
        'scss/at-import-no-partial-leading-underscore': true,
        'scss/at-import-partial-extension-blacklist': ['scss'],
        // "scss/at-mixin-argumentless-call-parentheses": "always", // TODO: coming in next stylelint-scss release
        'scss/at-mixin-pattern': namingPattern,
        'scss/dollar-variable-no-missing-interpolation': true,
        'scss/dollar-variable-pattern': namingPattern,
        'scss/media-feature-value-dollar-variable': 'always',
        'scss/percent-placeholder-pattern': namingPattern,
        'scss/selector-no-redundant-nesting-selector': true,
    },
}
