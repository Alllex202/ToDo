import React from "react";
import classNames from 'classnames';
import axios from 'axios';

import Badge from "../Badge";

import removeSVG from '../../assets/img/remove.svg';

import './List.scss';

const List = ({items, isRemovable, onClick, onRemove}) => {

    const removeList = (list) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios
                .delete('http://localhost:3001/lists/' + list.id)
                .then(() => {
                    onRemove(list.id);
                });
        }
    }

    return (
        <ul onClick={onClick} className={'list'}>
            {items.map((item, ind) => {
                return (<li key={ind} className={classNames(item.className, {active: item.active})}>
                    <i>{(item.icon) ? item.icon : <Badge color={item.color.name}/>}</i>
                    <span>{item.name}</span>
                    {isRemovable &&
                    <img
                        src={removeSVG}
                        alt="remove icon"
                        className={'list__remove-icon'}
                        onClick={() => removeList(item)}
                    />}
                </li>)
            })}
        </ul>
    );
}

export default List;