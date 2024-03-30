import tsconfigPaths from 'vite-tsconfig-paths'
const vitest = import('vitest/config')

export default vitest.then(vi => {
  return vi.defineConfig({
    test: {},
    plugins: [
      tsconfigPaths()
    ]
  })
})
