import { Middleware } from 'redux'

interface ReduxAction {
  [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
  type: string
}

/** Keeps track of Redux actions in a log. */
class ActionsLog {
  /** @member actions Array that stores Redux actions. */
  private actions: Array<ReduxAction> = []

  /**
   * "Private" method that pushes Redux action onto actions member.
   * @param action Redux action
   */
  _push(action: ReduxAction) {
    this.actions.push(action)
  }

  /** Get logged actions. */
  getActions() {
    return this.actions
  }

  /** Remove all actions. */
  clearActions() {
    this.actions.splice(0, this.actions.length)
  }
}

/** Setup actions log. */
const setupActionsLog = (): [Middleware, ActionsLog] => {
  const log = new ActionsLog()

  /** redux-actions-log Redux middleware */
  const reduxActionsLogMiddleware: Middleware = () => (next) => (action) => {
    log._push(action)
    return next(action)
  }

  return [reduxActionsLogMiddleware, log]
}

export default setupActionsLog
