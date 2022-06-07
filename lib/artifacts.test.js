// @ts-check
import assert from 'node:assert'
// @ts-ignore
import test from 'node:test'
import Artifacts from './artifacts.js'

test('new Artifacts()', async (t) => {
  await t.test('should create a new instance without error', () => {
    new Artifacts() // eslint-disable-line no-new
  })

  const expectedMethods = [
    'exclude',
    'expireIn',
    'exposeAs',
    'name',
    'paths',
    'public',
    'reports',
    'untracked',
    'when'
  ]

  for (const m of expectedMethods) {
    await t.test(`should have a ${m} method`, () => {
      const a = new Artifacts()
      assert.notEqual(a[m], undefined)
    })
  }
})

test('exclude', async (t) => {
  await t.test('should create exclude array', () => {
    const a = new Artifacts()
    a.exclude(['123', '435'])

    const expected = {
      exclude: ['123', '435']
    }

    assert.deepEqual(a.toJSON(), expected)
  })

  await t.test('should support multiple calls', () => {
    const a = new Artifacts()
    a.exclude(['123', '435'])
    a.exclude(['777'])

    const expected = {
      exclude: ['123', '435', '777']
    }

    assert.deepEqual(a.toJSON(), expected)
  })
})

test('expireIn', async (t) => {
  await t.test('should set expire_in value', () => {
    const a = new Artifacts()
    a.expireIn('1 month')

    const expected = {
      expire_in: '1 month'
    }

    assert.deepEqual(a.toJSON(), expected)
  })
})

test('exposeAs', async (t) => {
  await t.test('should set expose_as value', () => {
    const a = new Artifacts()
    a.exposeAs('the mask')

    const expected = {
      expose_as: 'the mask'
    }

    assert.deepEqual(a.toJSON(), expected)
  })
})

test('name', async (t) => {
  await t.test('should set name value', () => {
    const a = new Artifacts()
    a.name('spoderman')

    const expected = {
      name: 'spoderman'
    }

    assert.deepEqual(a.toJSON(), expected)
  })
})

test('paths', async (t) => {
  await t.test('should set paths value', () => {
    const a = new Artifacts()
    a.paths(['garden', 'village'])

    const expected = {
      paths: ['garden', 'village']
    }

    assert.deepEqual(a.toJSON(), expected)
  })

  await t.test('should allow multiple calls', () => {
    const a = new Artifacts()
    a.paths(['garden', 'village'])
    a.paths(['career'])

    const expected = {
      paths: ['garden', 'village', 'career']
    }

    assert.deepEqual(a.toJSON(), expected)
  })
})

test('public', async (t) => {
  await t.test('should set public value', () => {
    const a = new Artifacts()
    a.public(true)

    const expected = {
      public: true
    }

    assert.deepEqual(a.toJSON(), expected)
  })

  await t.test('should throw if setting a non-boolean', async (t) => {
    const cases = ['a', 1, { a: 'b' }, [1, 2, 3]]
    for (const c of cases) {
      const a = new Artifacts()

      assert.throws(() => a.public(c))
    }
  })
})

test('reports', async (t) => {
  await t.test('should set reports value', () => {
    const a = new Artifacts()
    a.reports({
      classroom: 'report.card',
      credit: {
        coverage_format: 'cobertura',
        path: 'path/to/cobertura'
      }
    })

    const expected = {
      reports: {
        classroom: 'report.card',
        credit: {
          coverage_format: 'cobertura',
          path: 'path/to/cobertura'
        }
      }
    }

    assert.deepEqual(a.toJSON(), expected)
  })
})

test('untracked', async (t) => {
  await t.test('should set untracked value', () => {
    const a = new Artifacts()
    a.untracked(true)

    const expected = {
      untracked: true
    }

    assert.deepEqual(a.toJSON(), expected)
  })

  await t.test('should throw if setting a non-boolean', async (t) => {
    const cases = ['a', 1, { a: 'b' }, [1, 2, 3]]
    for (const c of cases) {
      const a = new Artifacts()

      assert.throws(() => a.untracked(c))
    }
  })
})

test('when', async (t) => {
  await t.test('should set when value', () => {
    const a = new Artifacts()
    a.when('on_success')

    const expected = {
      when: 'on_success'
    }

    assert.deepEqual(a.toJSON(), expected)
  })

  await t.test('should throw when provided invalid value', () => {
    const a = new Artifacts()

    assert.throws(() => a.when('right_now'))
  })
})
