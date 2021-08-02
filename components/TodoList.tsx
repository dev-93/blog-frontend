import { useRecoilValue } from 'recoil';
import { todoStore } from '../store/todo';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todo = useRecoilValue(todoStore);
  console.log(todo);
  return (
    <section>
      {todo.map((v) => (
        <TodoItem data={v} key={`todoData_${v.id}`} />
      ))}
    </section>
  );
};

export default TodoList;