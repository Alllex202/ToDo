import React from "react";
import classNames from 'classnames';
import axios from 'axios';

import Badge from "../Badge";

import removeSVG from '../../assets/img/remove.svg';

import './List.scss';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
    const removeList = (list) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios
                .delete('http://localhost:3001/lists/' + list.id)
                .then(() => {
                    onRemove(list.id);
                });
        }
    }

    const handlerClick = (event, item) => {
        if (event.target.tagName === 'IMG') {
            return;
        }
        onClickItem(item);
    };

    return (
        <ul onClick={onClick} className={'list'}>
            {items.map((item, ind) => {
                return (
                    <li
                        key={ind}
                        className={classNames(item.className, {
                            active: item.active ? item.active : activeItem && activeItem.id === item.id,
                        })}
                        onClick={onClickItem ? (event) => handlerClick(event, item) : null}
                    >
                        <i>{(item.icon) ? item.icon : <Badge color={item.color.name} />}</i>
                        <span>
                            {item.name}
                            {item.tasks && ` (${item.tasks.length})`}
                        </span>
                        {isRemovable &&
                            <img
                                src={removeSVG}
                                alt="remove icon"
                                className={'list__remove-icon'}
                                onClick={() => removeList(item)}
                            />}
                    </li>
                )
            })}
        </ul>
    );
}

export default List;