import server, {CREATE, DELETE, GET_ALL} from '../../src/server';

const clean = () => server.pagenode[GET_ALL]().then(
    (response) => Promise.all(response.map(({_id}) => server.pagenode[DELETE](_id)))
);

const pushNode = (node, idMap) => server.pagenode[CREATE]({
    type: node.type,
    text: node.text,
    children: node.children.map((child) => idMap[child]),
}).then(({_id}) => Object.assign({}, idMap, {[node.id]: _id}));

const exit = (tree, id, idMap) => {
    const parentId = tree[id].parent;
    if (parentId || parentId === 0) {
        const parent = tree[parentId];
        const index = parent.children.indexOf(id);
        if (index < parent.children.length - 1) {
            visit(tree, parent.children[index + 1], idMap);
        } else {
            pushNode(parent, idMap).then((newIdMap) => exit(tree, parentId, newIdMap));
        }
    }
};

const visit = (tree, id, idMap) => {
    const node = tree[id];
    if (!node.children || !node.children.length) {
        pushNode(node, idMap).then((newIdMap) => exit(tree, id, newIdMap));
    } else {
        visit(tree, node.children[0], idMap);
    }
};

export default (tree) => {
    clean().then(() => visit(tree, 0, {}));
};
