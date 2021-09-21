import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { v4 as uuidv4 } from 'uuid';
import { actionCreators, State } from '../state';

import '../styles/TodoForm.css';

const TodoForm = () => {
  const tasks = useSelector((state: State) => state.tasks);

  const dispatch = useDispatch();
  const { addToTasks } = bindActionCreators(actionCreators, dispatch);

  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    name: '',
    status: 'Pending',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prevTask) => {
      return { ...prevTask, name: e.target.value };
    });
  };

  const checkBoxClickHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prevTask) => {
      return { ...prevTask, status: e.target.checked ? 'Done' : 'Pending' };
    });
  };

  const addTaskBtnClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const isExisting = [...tasks].find(
      (task) =>
        task.name.toLocaleLowerCase() === newTask.name.toLocaleLowerCase()
    );

    if (!newTask.name) {
      return alert('Task name cannot be empty');
    }
    if (isExisting) {
      return alert('Already in tasks');
    }

    addToTasks(newTask);
    setNewTask((prevTask) => {
      return { ...prevTask, id: uuidv4(), name: '' };
    });
  };

  return (
    <form className='todoForm'>
      <input
        className='todoForm__input'
        placeholder='New Task'
        type='text'
        value={newTask.name}
        onChange={inputChangeHandler}
      />
      <p className='todoForm__status'>
        <label htmlFor='statusCheckbox' className='todoForm__label'>
          Done ?
        </label>
        <input
          className='todoForm__checkbox'
          type='checkbox'
          onChange={checkBoxClickHandler}
          id='statusCheckbox'
        />
      </p>

      <button className='todoForm__button' onClick={addTaskBtnClickHandler}>
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
