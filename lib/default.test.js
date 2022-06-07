// @ts-check
import assert from 'node:assert'
// @ts-ignore
import test from 'node:test'
import Default from './default.js'

test('new Default()', async (t) => {
  await t.test('should create a new instance without error', () => {
    new Default() // eslint-disable-line no-new
  })

  const expectedMethods = [
    'afterScript',
    'artifacts',
    'beforeScript',
    // 'cache',
    'image',
    // 'interruptible',
    // 'retry',
    // 'services',
    // 'tags',
    // 'timeout',
    'toJSON'
  ]

  for (const m of expectedMethods) {
    await t.test(`should have a ${m} method`, () => {
      const d = new Default()
      assert.notEqual(d[m], undefined)
    })
  }
})

test('should be able to chain methods', () => {
  const c = new Default()

  c.image('banksy')
    .beforeScript([
      'echo hi',
      'echo bye'
    ])

  const expected = {
    image: 'banksy',
    before_script: [
      'echo hi',
      'echo bye'
    ]
  }

  assert.deepEqual(c.toJSON(), expected)
})

test('toJSON', async (t) => {
  await t.test('should return correct values from toJSON', () => {
    const c = new Default()
    c.image('monalisa')
    const expected = {
      image: 'monalisa'
    }

    assert.deepEqual(c.toJSON(), expected)
  })
})

test('beforeScript', async (t) => {
  await t.test('should allow setting before_script', () => {
    const c = new Default()
    c.beforeScript(['one', 'two', 'action'])
    const expected = {
      before_script: [
        'one',
        'two',
        'action'
      ]
    }

    assert.deepEqual(c.toJSON(), expected)
  })

  await t.test('should support calling multiple times', () => {
    const c = new Default()
    c.beforeScript(['one'])
    c.beforeScript(['two'])
      .beforeScript(['action'])

    const expected = {
      before_script: [
        'one',
        'two',
        'action'
      ]
    }

    assert.deepEqual(c.toJSON(), expected)
  })
})

test('nested builders', async (t) => {
  await t.test('should allow building nested artifacts', () => {
    const d = new Default()
    d.artifacts(a => {
      a.name('foo')
      a.paths(['path_life'])
        .when('on_success')
    })

    const expected = {
      artifacts: {
        name: 'foo',
        paths: ['path_life'],
        when: 'on_success'
      }
    }

    // need to actually stringify `toJSON` output to trim the nested
    // state properties
    assert.deepEqual(JSON.stringify(d.toJSON()), JSON.stringify(expected))
  })
})
