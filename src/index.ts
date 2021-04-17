import { AnyAction, Middleware } from 'redux'

/** Keeps track of Redux actions dispatched to a store in a log. */
export class ReduxActionsLog {
  /** @member actions Array that stores Redux actions. */
  private actions: Array<AnyAction> = []

  /** "Private" method that pushes Redux action onto actions member. */
  _push(action: AnyAction): void {
    this.actions.push(action)
  }

  /** Get logged actions that were dispatched to a Redux store. */
  getActions(): Array<AnyAction> {
    return this.actions
  }

  /** Remove all Redux actions from the log. */
  clearActions(): void {
    this.actions.splice(0, this.actions.length)
  }
}

/** Setup Redux actions log. */
const setupReduxActionsLog = (): [Middleware, ReduxActionsLog] => {
  const log = new ReduxActionsLog()

  /** redux-actions-log Redux middleware */
  const reduxActionsLogMiddleware: Middleware = () => (next) => (action) => {
    log._push(action)
    return next(action)
  }

  return [reduxActionsLogMiddleware, log]
}

export default setupReduxActionsLog
