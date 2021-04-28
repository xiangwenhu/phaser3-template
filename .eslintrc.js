const resolveConfig = require("./webpack/resolve");

module.exports = {
	extends: ["airbnb-base"],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
				paths: ["src"]
			},
			webpack: {
				config: {
					resolve: resolveConfig
				}
			}
		}
	},
	rules: {
		/*
         typescript 规则
         https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
        */
		// any
		"@typescript-eslint/no-explicit-any": "warn",
		// 不使用的变量
		"@typescript-eslint/no-unused-vars": "warn",
		// 显示申明function返回类型
		"@typescript-eslint/explicit-function-return-type": "off",
		// 显式的访问 get set
		"@typescript-eslint/explicit-member-accessibility": "off",
		//
		"@typescript-eslint/no-var-requires": "warn",
		// export默认返回值
		"import/prefer-default-export": "warn",
		// indent
		"@typescript-eslint/indent": "off",

		"@typescript-eslint/no-non-null-assertion": "off",

		/*
          普通规则
          https://github.com/airbnb/javascript
          https://eslint.org/docs/rules/
        */
		// 多余的空格
		"no-multi-spaces": 1,
		"linebreak-style": "off",
		// 缩进
		indent: "off",
		// 注释后面加空格
		"spaced-comment": "warn",
		// 单引号
		quotes: "off",
		// 对象后面加,
		"comma-dangle": "off",
		// 属性缩写
		"object-shorthand": "warn",
		// 驼峰写法
		camelcase: "warn",
		// 单个箭头函数参数加()
		"arrow-parens": "off",
		"no-console": "off",
		// continue语句
		"no-continue": "off",
		// class memer之间有空格
		"lines-between-class-members": "warn",
		// video中必须包含track
		"jsx-a11y/media-has-caption": "off",
		"max-len": [
			"error",
			{
				code: 300
			}
		],
		"object-curly-newline": "off",
		"operator-linebreak": "off",
		"implicit-arrow-linebreak": "off",
		"no-bitwise": "off",
		"no-else-return": "off",
		"no-tabs": "off",
		// "no-restricted-syntax": "off",
		"import/extensions": "off",
	},
	globals: {
		document: false,
		window: false
	}
};
