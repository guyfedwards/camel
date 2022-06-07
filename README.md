# camel (WIP)
> CI Yaml = camel
Tool to generate .gitlab-ci.yml using javascript

## Usage
```js
import Camel from 'camel'

const camel = new Camel()

camel.default()
  .image()
  .services([{
    name: '',
    command: ['']
  }])
  .beforeScript([
    "docker login -u $CI_REGISTRY_USER",
    ...
  ])
  .artifacts(a => {
    a.name('holy grail')
      .paths(['a_cave'])
  })


camel.job('foo')
  .image(...)
  .services(...)
  .artifacts(a => {
    a.name('foo')
  })

camel.variables([{
  FF_NETWORK_PER_BUILD: 1
}])

const apis = ['api-1', 'api-2', 'api-3']
const webs = ['web-1', 'web-2']

for (const a of apis) {
  camel.job(a)
    .image(...)
    .services(...)
    .script(...)
}

camel.writeFile(__dirname + '/.gitlab-ci.yml')
```

