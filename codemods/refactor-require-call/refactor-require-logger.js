export default function transform(file, { jscodeshift: j }, options) {
    const source = j(file.source);
    
    const loggerRequire = source
        .find(j.Identifier)
      .filter(path => (
        path.node.name === 'require'
        && path.parentPath.node.type === 'CallExpression'
        && path.parentPath.node.arguments[0].type === 'Literal'
        && path.parentPath.node.arguments[0].value === 'logger'
      ));
    
    loggerRequire.forEach((requireCall) => {
      const requireExpression = requireCall.parentPath.parentPath;
      const root = requireExpression.parentPath.parentPath;
      
      const newLoggerFactoryDeclaration = j.variableDeclaration(
        'const',
        [j.variableDeclarator(j.identifier('loggerFactory'), requireCall.parentPath.node)]
      );
      
      const newLoggerDeclaration = j.variableDeclaration(
        'const',
        [j.variableDeclarator(j.identifier('logger'), j.callExpression(j.identifier('loggerFactory'), []))]
      );
      
      root.push(newLoggerFactoryDeclaration, newLoggerDeclaration);
    });
    
  
    return source.toSource(options.printOptions);
  }