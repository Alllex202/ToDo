import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddTasksForm from "./AddTaskForm";
import Task from "./Task";

import editSVG from '../../assets/img/edit.svg';

import './Tasks.scss';

const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask }) => {

    const editTitle = (e) => {
        const newTitle = window.prompt('Новое название списка', list.name);
        if (newTitle) {
            axios
                .patch('http://localhost:3001/lists/' + list.id, {
                    name: newTitle
                })
                .then(() => onEditTitle(list.id, newTitle))
                .catch(() => {
                    alert('Не удалось изменить название списка');
                });
        }
    };

    return (
        <div className="tasks">
            <h2 className="tasks__title">
                <Link to={`/lists/${list.id}`}>
                    <span style={{ color: list.color.hex }}>{list.name}</span>
                </Link>
                <img onClick={editTitle} src={editSVG} alt="edit icon" />
            </h2>
            <div className="tasks__items">
                {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks.map(task => {
                    return (
                        <Task
                            key={task.id}
                            {...task}
                            list={list}
                            onRemove={onRemoveTask}
                            onEdit={onEditTask}
                            onComplete={onCompleteTask}
                        />
                    );
                })}
                <AddTasksForm
                    key={list.id}
                    list={list}
                    onAddTask={onAddTask}
                />
            </div>
        </div>
    );
}

export default Tasks;