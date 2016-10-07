const NAME = 'core-server-methods';

// TODO ideally, we would use symbols, but they do not seem to work in node
export const GET_ONE = `${NAME}/GET_ONE`;
export const GET_ALL = `${NAME}/GET_ALL`;
export const CREATE = `${NAME}/CREATE`;
export const EDIT = `${NAME}/EDIT`;
export const DELETE = `${NAME}/DELETE`;

export default [GET_ONE, GET_ALL, CREATE, EDIT, DELETE];
