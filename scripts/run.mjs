#!/usr/bin/env node
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const [scriptName, ...args] = process.argv.slice(2)

if (!scriptName) {
	console.error('Usage: pnpm scripts <script-name> [args...]')
	console.error('Example: pnpm scripts coverage-i18n --verbose')
	process.exit(1)
}

const scriptPath = join(__dirname, `${scriptName}.ts`)

// Use tsx to run TypeScript files (Node 20 cannot natively execute .ts)
const tsxPath = resolve(__dirname, '../node_modules/.bin/tsx')

const child = spawn(
	tsxPath,
	[scriptPath, ...args],
	{
		stdio: 'inherit',
	},
)

child.on('exit', (code) => {
	process.exit(code ?? 0)
})
