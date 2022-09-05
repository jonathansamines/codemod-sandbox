export default function transform(file, { jscodeshift: j }, options) {
  const source = j(file.source);

  const imports = source
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === 'my-module');

  const newImportSpecifier = j.importSpecifier(j.identifier('baz'));

  imports.forEach((moduleImport) => {
    console.log(moduleImport);
    moduleImport.replace(
      j.importDeclaration([...moduleImport.node.specifiers, newImportSpecifier], moduleImport.node.source),
    );
  });

  return source.toSource(options.printOptions);
}