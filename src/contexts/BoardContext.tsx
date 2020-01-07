import React from 'react';
import BoardType from '../types/BoardType';

const defaultBoards:BoardType[] = [];

const BoardContext = React.createContext(defaultBoards);

export default BoardContext;