export interface DataUtils {
  beginTransaction: () => Promise<void>
  commitTransaction: () => Promise<void>
  rollbackTransaction: () => Promise<void>
}
