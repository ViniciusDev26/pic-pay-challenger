export interface DataUtil {
  performTransaction: (actions: Array<Promise<void>>) => Promise<void>
}
