import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
	...nextCoreWebVitals,
	...nextTypescript,
	{
		rules: {
			"no-restricted-imports": [
				"error",
				{
					paths: [
						{
							name: "@/lib/env-config",
							importNames: ["BACKEND_URL"],
							message:
								"Use buildBackendUrl(path, params) for browser-facing backend URLs. BACKEND_URL is empty in proxy mode; importing it bypasses the single URL seam.",
						},
					],
					patterns: [
						{
							group: ["**/env-config", "**/env-config.ts"],
							importNames: ["BACKEND_URL"],
							message:
								"Use buildBackendUrl(path, params). Import BACKEND_URL only inside lib/env-config.ts.",
						},
					],
				},
			],
		},
	},
];

export default eslintConfig;
