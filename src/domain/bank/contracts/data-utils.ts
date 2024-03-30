export interface DataUtils {
  beginTransaction: () => Promise<void>
  executeOperation: (operation: unknown) => Promise<void>
  commitTransaction: () => Promise<void>
  rollbackTransaction: () => Promise<void>
}
