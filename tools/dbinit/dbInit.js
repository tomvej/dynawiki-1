import server, {CREATE, DELETE, GET_ALL} from '../../src/server';

const clean = () => server.pagenode[GET_ALL]().then(
    (response) => Promise.all(response.map(({_id}) => server.pagenode[DELETE](_id)))
);

export default (tree) => {
    const idMap = {};
    const pushNode = (node) => server.pagenode[CREATE]({
        type: node.type,
        text: node.text,
        children: node.children.map((child) => idMap[child]),
    }).then(({_id}) => {
        idMap[node.id] = _id;
    });
    const exit = (id) => {
        const parentId = tree[id].parent;
        if (parentId || parentId === 0) {
            const parent = tree[parentId];
            const index = parent.children.indexOf(id);
            if (index < parent.children.length - 1) {
                enter(parent.children[index + 1]);
            } else {
                pushNode(parent).then(() => exit(parentId));
            }
        }
    };
    const enter = (id) => {
        const node = tree[id];
        if (!node.children || !node.children.length) {
            pushNode(node).then((newId) => exit(id));
        } else {
            enter(node.children[0]);
        }
    };

    clean().then(() => enter(0));
};
