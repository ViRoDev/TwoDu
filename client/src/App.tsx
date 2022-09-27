import { ChakraProvider, Box, Flex, theme } from "@chakra-ui/react"
import { Header } from "./Header"
import { TodoList } from "./TodoList"

export const App = () => {
  return (
  <ChakraProvider theme={theme}>
    <Header/>
    <Box bgColor="#F6F6F6"  h="100vh">
      <Flex justify="space-evenly">
        <TodoList listId = {2}/>
        <TodoList listId = {1}/>
        <TodoList listId = {3}/>
      </Flex>
    </Box>
  </ChakraProvider>
)}
