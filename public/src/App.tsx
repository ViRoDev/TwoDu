import {useState, useEffect, FC} from "react"

import {
  ChakraProvider,
  Box,
  Flex,
  theme,
} from "@chakra-ui/react"

import { Header } from "./Header"
import { TodoList, ITodo, TodoListProps } from "./TodoList"
import axios from "axios"

const apiLink : string = process.env.API ||"http://localhost:3001" 

const testValues : ITodo[] = [
  {text: "Create todo react app", isDone: true},
  {text: "Create simple UI if Figma", isDone: true},
  {text: "Remake this UI with ChakraUI", isDone: false},
  {text: "Polish, polish, polish", isDone: false}
]

type serverTodoList = {
  id : number,
  title: string,
  comment: string,
  position: number | null,
  created: string | null,
  is_done: boolean | null,
  done: string | null,
  list_id: number;
}

export const App = () => {
  const [list, setLists] = useState<ITodo[]>([])
  useEffect(() => {
    axios.get(apiLink + "/task?list_id=2")
    .then(({data}) => {
      console.table(data);
      
      const todoArr : ITodo[] = data.map((el : serverTodoList) => ({
        text: el.title, 
        isDone: el.is_done
      }));

      setLists(todoArr)
    })
    .catch((err)=> console.log(err));
  }, 
  [])

  return (<ChakraProvider theme={theme}>
    <Header/>
    <Box bgColor="#F6F6F6"  h="100vh">
      <Flex justify="space-evenly">
        <TodoList listName="TwoDu development" todos={list}/>
        <TodoList listName="TwoDu development" todos={testValues}/>
        <TodoList listName="TwoDu development" todos={testValues}/>
      </Flex>
    </Box>
  </ChakraProvider>)
}
