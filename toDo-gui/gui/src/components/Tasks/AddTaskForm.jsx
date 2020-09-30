import React, { useState } from 'react';
import axios from 'axios';

import addSVG from '../../assets/img/add.svg';

import './Tasks.scss';

const AddTasksForm = ({ list, onAddTask }) => {
    const [visibleForm, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {
        const task = {
            listId: list.id,
            text: inputValue,
            completed: false,
        };
        setIsLoading(true);
        axios
            .post('http://localhost:3001/tasks', task)
            .then(({ data }) => {
                onAddTask(list.id, data);
                toggleFormVisible();
            })
            .catch(() => {
                alert('Не удалось добавить задачу в список')
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <div className="tasks__form">
            {!visibleForm ? <div className="tasks__form-new" onClick={toggleFormVisible}>
                <img src={addSVG} alt="add icon" className="" />
                <span>Новая задача</span>
            </div> : <div className="tasks__form-block">
                    <input
                        type="text"
                        className="field"
                        placeholder='Текст задачи'
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <button disabled={isLoading} onClick={addTask} className="button">
                        {isLoading ? 'Добавление ...' : 'Добавить задачу'}
                </button>
                    <button onClick={toggleFormVisible} className="button button--grey">
                        Отмена
                </button>
                </div>}
        </div>
    );
}

export default AddTasksForm;