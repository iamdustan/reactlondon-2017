const camelCase = str => str ? str.replace(/-([a-z])/g, g => g[1].toUpperCase()) : '';

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.JSXAttribute, {
      name: {name: 'style'}
    })
  .forEach(path => {
    if (path.value.value.type === 'Literal') {
      path.value.value = j.objectExpression(
          path.value.value.value.split(/\s*;\s*/)
          .filter(Boolean)
          .map(segment => {
            const parts = segment.split(/\s*:\s*/);
            return j.property(
              'init',
              j.identifier(camelCase(parts[0])),
              j.literal(parts[1])
            );
          })
        );
    }
  })
  .toSource();
}

