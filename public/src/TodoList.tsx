import React from 'react'
import {
    Box,
    Flex,
} from "@chakra-ui/react"

export type ITodo = {
    text: string,
    isDone: boolean,
}
  
export type TodoListProps = {
    listName: string,
    todos: ITodo[]
}
    
export const TodoList : React.FC<TodoListProps> = (props) => 
    <Box>
      <Box margin="3vh 0vh 0vh">{props.listName}</Box>
      <Box as="div" className="todo-list" bgColor="white" padding="3vh 3vh 3vh 3vh">    
        <Flex direction="column" w="20vw" minH="50vh"> {
            props.todos.map( (todo, idx) => 
              <Box margin="1vh" key={idx + todo.text}>
                {todo.text}
              </Box>)
          }
        </Flex>
      </Box>
    </Box>