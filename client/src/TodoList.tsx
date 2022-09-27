import React from 'react'
import { Box, Flex} from "@chakra-ui/react"
import useTodoList from './hooks/useTodoList'

export type ITodo = {
    text: string,
    isDone: boolean,
}
  
export type TodoListProps = {
    listId: number,
}
    
export const TodoList : React.FC<TodoListProps> = (props : TodoListProps) => {
  const todoList = useTodoList(props.listId, process.env.API || "http://localhost:3001");
  return (
    <Box>
      <Box margin="3vh 0vh 0vh">{props.listId}</Box>
      <Box as="div" className="todo-list" bgColor="white" padding="3vh 3vh 3vh 3vh">    
        <Flex direction="column" w="20vw" minH="50vh"> {
            todoList.map( (todo, idx) => 
              <Box margin="1vh" key={idx + todo.text}>
                {todo.text}
              </Box>)
          }
        </Flex>
      </Box>
    </Box>
  )};
