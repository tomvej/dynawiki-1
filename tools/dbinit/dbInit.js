import server, {CREATE, DELETE, GET_ALL} from '../../src/server';

const clean = () => server.pagenode[GET_ALL]().then(
    (response) => Promise.all(response.map(({_id}) => server.pagenode[DELETE](_id)))
);

/*
 * Uses stack-less DFS to insert the whole tree structure into database.
 * Node is only inserted when it is exited, i.e. when all its children have ids.
 */
export default (tree) => {
    /* map from input (temporary) id to server id */
    const idMap = {};
    /* inserts node and updates id map */
    const insertNode = (node) => server.pagenode[CREATE]({
        type: node.type,
        text: node.text,
        children: node.children.map((child) => idMap[child]),
    }).then(({_id}) => {
        idMap[node.id] = _id;
    });

    /* exits node and sees whether it can exit its parent */
    const exit = (id) => insertNode(tree[id]).then(() => {
        const parentId = tree[id].parent;
        if (parentId || parentId === 0) {
            const parent = tree[parentId];
            const index = parent.children.indexOf(id);
            if (index < parent.children.length - 1) {
                enter(parent.children[index + 1]);
            } else {
                exit(parentId);
            }
        }
    });
    const enter = (id) => {
        const node = tree[id];
        if (!node.children || !node.children.length) {
            exit(id);
        } else {
            enter(node.children[0]);
        }
    };

    clean().then(() => enter(0));
};
