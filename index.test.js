import assert from 'node:assert'
import test from 'node:test'
import Camel from './index.js'

// strip whitespace from beginning of es6 string
function strfmt (str) {
  return str.replace(/^\n/, '')
    .replace(/\s+$/, '\n')
}

test('new Camel()', async (t) => {
  await t.test('should create a new instance without error', () => {
    new Camel()
  })

  const expectedMethods = [
    'toString',
    'stage',
    'toYaml',
    'default'
  ]

  for (const m of expectedMethods) {
    await t.test(`should have a ${m} method`, () => {
      const c = new Camel()
      assert.notEqual(c[m], undefined)
    })
  }
})

test('stages', async (t) => {
  await t.test('should allow adding multiple stages', () => {
    const c = new Camel()
    c.stage('main')
      .stage('albert hall')
      .stage('west end')

    const expected = {
      stages: ['main', 'albert hall', 'west end']
    }

    assert.deepEqual(c.state, expected)
  })
})

test('toYaml', async (t) => {
  await t.test('should return a yaml string', () => {
    const c = new Camel()
    c.default()
      .image('fooimage')

    const expected = strfmt(`
default:
  image: fooimage
`)

    assert.equal(c.toYaml(), expected)
  })

  await t.test('should add a comment at the top', { todo: true })

  await t.test('should handle arrays ', () => {
    const c = new Camel()
    c.default()
      .image('monet')
      .beforeScript(["echo i'm", 'echo batman'])

    const expected = strfmt(`
default:
  image: monet
  before_script:
    - echo i'm
    - echo batman
`)

    assert.equal(c.toYaml(), expected)
  })
})

test('formatting', async (t) => {
  await t.test('should correctly format quotes ', { todo: true })
  await t.test('should correctly handle single vs double quotes', { todo: true })
  await t.test('should correctly handle environment variables inside quote', { todo: true })
  await t.test('should handle multiline scripts', { todo: true })
})

test('full example', async (t) => {
  const c = new Camel()

  c.default()
    .image('monet')
    .beforeScript(["echo i'm", 'echo batman'])
    .artifacts(a => {
      a.name('robin')
        .paths(['nyc'])
    })

  assert.deepEqual(c.toYaml(), strfmt(`
default:
  image: monet
  before_script:
    - echo i'm
    - echo batman
  artifacts:
    name: robin
    paths:
      - nyc
  `))
})
