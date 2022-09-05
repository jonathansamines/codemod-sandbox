export default function transform(file, { jscodeshift: j }, options) {
  const source = j(file.source);

  const imports = source
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === 'my-module');

  console.log(imports);

  return source.toSource(options.printOptions);
}