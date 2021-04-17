import { AnyAction, applyMiddleware, createStore, Store } from 'redux'
import setupReduxActionsLog, { ReduxActionsLog } from '../src'

const testReducer = (state = null) => state

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTestAction = (payload?: any) => {
  const testAction: AnyAction = {
    type: 'CREATE_TEST_ACTION',
  }

  if (payload !== undefined) {
    testAction.payload = payload
  }

  return testAction
}

const setupTestStoreAndLog = (): [Store, ReduxActionsLog] => {
  const [middleware, log] = setupReduxActionsLog()
  const store = createStore(testReducer, applyMiddleware(middleware))
  return [store, log]
}

describe('Redux Actions Log Middleware', () => {
  it('Log starts with empty actions', () => {
    const [, log] = setupTestStoreAndLog()
    expect(log.getActions()).toHaveLength(0)
  })

  it('Log logs 1 action', () => {
    const [store, log] = setupTestStoreAndLog()
    const action = createTestAction()
    store.dispatch(action)

    const actions = log.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toBe(action)
  })

  it('Log logs 2 actions', () => {
    const [store, log] = setupTestStoreAndLog()
    const action1 = createTestAction()
    const action2 = createTestAction('foo')
    store.dispatch(action1)
    store.dispatch(action2)

    const actions = log.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0]).toBe(action1)
    expect(actions[1]).toBe(action2)
  })

  it('Log logs 3 actions', () => {
    const [store, log] = setupTestStoreAndLog()
    const action1 = createTestAction()
    const action2 = createTestAction('foo')
    const action3 = createTestAction('bar')
    store.dispatch(action1)
    store.dispatch(action2)
    store.dispatch(action3)

    const actions = log.getActions()
    expect(actions).toHaveLength(3)
    expect(actions[0]).toBe(action1)
    expect(actions[1]).toBe(action2)
    expect(actions[2]).toBe(action3)
  })

  it("Log with 0 actions doesn't change when it is cleared", () => {
    const [, log] = setupTestStoreAndLog()
    const actions = log.getActions()
    expect(actions).toHaveLength(0)
    log.clearActions()
    expect(actions).toHaveLength(0)
  })

  it('Log logs 1 action and then clears it', () => {
    const [store, log] = setupTestStoreAndLog()
    const action = createTestAction()
    store.dispatch(action)

    const actions = log.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toBe(action)

    log.clearActions()
    expect(actions).toHaveLength(0)
  })

  it('Log logs 2 actions and then clears them', () => {
    const [store, log] = setupTestStoreAndLog()
    const action1 = createTestAction()
    const action2 = createTestAction('foo')
    store.dispatch(action1)
    store.dispatch(action2)

    const actions = log.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0]).toBe(action1)
    expect(actions[1]).toBe(action2)

    log.clearActions()
    expect(actions).toHaveLength(0)
  })

  it('Log logs 3 actions and then clears them', () => {
    const [store, log] = setupTestStoreAndLog()
    const action1 = createTestAction()
    const action2 = createTestAction('foo')
    const action3 = createTestAction('bar')
    store.dispatch(action1)
    store.dispatch(action2)
    store.dispatch(action3)

    const actions = log.getActions()
    expect(actions).toHaveLength(3)
    expect(actions[0]).toBe(action1)
    expect(actions[1]).toBe(action2)
    expect(actions[2]).toBe(action3)

    log.clearActions()
    expect(actions).toHaveLength(0)
  })

  it('fails lol', () => {
    expect('foo').toBe('bar')
  })
})
