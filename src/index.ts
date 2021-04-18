import { AnyAction, Middleware } from 'redux'

/** Keeps track of Redux actions dispatched to a store in a log. */
export class ReduxActionsLog {
  /** @member actions Array that stores Redux actions. */
  private actions: Array<AnyAction> = []

  /** @member logAll Option that controls whether or not log all functionality is enabled or not */
  private logAll = false

  /** Creates an instance of ReduxActionsLog with a given log all setting. */
  constructor(logAll = false) {
    if (logAll) this.logAll = logAll
  }

  /** "Private" method that pushes Redux action onto actions member. */
  _push(action: AnyAction): void {
    if (
      this.logAll ||
      (typeof action === 'object' &&
        action !== null &&
        action.type !== undefined)
    ) {
      this.actions.push(action)
    }
  }

  /** Get logged actions that were dispatched to a Redux store. */
  getActions(): Array<AnyAction> {
    return this.actions
  }

  /** Remove all Redux actions from the log. */
  clearActions(): void {
    this.actions.splice(0, this.actions.length)
  }

  /** Enable or disable log all option. */
  setLogAll(logAll: boolean): void {
    this.logAll = logAll
  }

  /** Get current log all option. */
  getLogAll(): boolean {
    return this.logAll
  }
}

/** Setup Redux actions log with a given log all setting. */
const setupReduxActionsLog = (
  logAll = false
): [Middleware, ReduxActionsLog] => {
  const log = new ReduxActionsLog(logAll)

  /** redux-actions-log Redux middleware */
  const reduxActionsLogMiddleware: Middleware = () => (next) => (action) => {
    log._push(action)
    return next(action)
  }

  return [reduxActionsLogMiddleware, log]
}

export default setupReduxActionsLog
