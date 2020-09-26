import React, {useState} from "react";
import List from "../List";
import Badge from "../Badge";

import closeSVG from '../../assets/img/close.svg';

import './AddList.scss'

const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(colors[0].id);
    const [inputValue, setInputValue] = useState('');

    const addList = () => {
        if (!inputValue) {
            alert('Name is empty!!!!');
            return;
        }
        const color = colors.filter((color) => {return color.id === selectedColor})[0].name;
        onAdd({
            "name": inputValue,
            "color": color,
        });
        setVisiblePopup(!visiblePopup);
        selectColor(colors[0].id);
        setInputValue('');
    };

    return (
        <div className={'add-list'}>
            <List onClick={() => setVisiblePopup(true)}
                  items={[
                      {
                          className: 'list__add-button',
                          icon: (
                              <svg width="16"
                                   height="16"
                                   viewBox="0 0 16 16"
                                   fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M8 1V15"
                                      stroke="black"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                  <path d="M1 8H15"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"/>
                              </svg>

                          ),
                          name: 'Добавить список',
                      }
                  ]}/>
            {visiblePopup && (
                <div className={'add-list__popup'}>
                    <img onClick={() => setVisiblePopup(false)}
                         src={closeSVG} alt="close button" className="add-list__popup-close-btn"/>
                    <input value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                           className={'field'} type={'text'} placeholder={'Название списка'}/>
                    <div className={'add-list__popup-colors'}>
                        {colors.map(color => (
                            <Badge
                                onClick={() => selectColor(color.id)}
                                key={color.id}
                                color={color.name}
                                className={selectedColor === color.id && 'active'}
                            />
                        ))}
                    </div>
                    <button onClick={addList} className={'button'}>Добавить список</button>
                </div>
            )}
        </div>
    );
}

export default AddList;