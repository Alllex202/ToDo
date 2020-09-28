import React from "react";

import editSVG from '../../assets/img/edit.svg';

import './Tasks.scss';

const Tasks = ({list}) => {
    console.log(list)
    return (
        <div className="tasks">
            <h2 className="tasks__title">
                {list.name}
                <img src={editSVG} alt="edit icon"/>
            </h2>

            <div className="tasks__items">
                {
                    list.tasks.map(task => {
                        return (
                            <div key={task.id} className="tasks__items-row">
                                <div className="checkbox">
                                    <input id={'task' + task.id} type="checkbox" defaultChecked={task.completed}/>
                                    <label htmlFor={'task' + task.id}>
                                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5"
                                                  strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </label>
                                </div>
                                <p>{task.text}</p>
                            </div>
                        );
                    })
                }


            </div>
        </div>
    );
}

export default Tasks;