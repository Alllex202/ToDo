import React from "react";
import Badge from "../Badge";
import classNames from 'classnames';

import './List.scss';

const List = ({items, isRemovable, onClick}) => {


    return (
        <ul onClick={onClick} className={'list'}>
            {items.map((item,ind) => {
                return (<li key={ind} className={classNames(item.className, {active: item.active})}>
                    <i>{(item.icon) ? item.icon : <Badge color={item.color}/>}</i>
                    <span>{item.name}</span>
                </li>)
            })}
        </ul>
    );
}

export default List;