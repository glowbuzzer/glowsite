import { valueToEstree } from 'estree-util-value-to-estree';

export default () => (tree, file) => {
    console.log("tree", tree)
    const { data: {
        metadata,
    } } = file;

    tree.children.push({
        type: 'mdxjsEsm',
        data: {
            estree: {
                type: 'Program',
                body: [
                    {
                        type: 'ExportNamedDeclaration',
                        declaration: {
                            type: 'VariableDeclaration',
                            declarations: [
                                {
                                    type: 'VariableDeclarator',
                                    id: { type: 'Identifier', name: 'metadata' },
                                    // init: valueToEstree(metadata || {}),
                                    init: {foo: "bar"},
                                }
                            ],
                            kind: 'const'
                        },
                        specifiers: [],
                        source: null
                    }
                ],
                sourceType: 'module'
            }
        }
    });
}
