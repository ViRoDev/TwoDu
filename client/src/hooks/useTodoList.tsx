import {useState, useEffect} from 'react'
import { ITodo } from '../TodoList'
import axios from 'axios'

//What is returned from API
type ListTableColumns = {
    id : number,
    title: string,
    comment: string,
    position: number | null,
    created: string | null,
    is_done: boolean | null,
    done: string | null,
    list_id: number;
  }

const transformServerValues = (serverData : ListTableColumns) : ITodo => ({
    text: serverData.title, 
    isDone: serverData.is_done === null ? false : serverData.is_done
});

const fetchListDataFromServer = async (listId : number, apiLink : string) => {
    const res = await axios.get(`${apiLink}/task?list_id=${listId}`);
    const {data} = res;
    const todoArr : ITodo[] = data.map((el : ListTableColumns) =>
      transformServerValues(el))  
    return todoArr;
}

export default function useTodoList (listId : number, apiLink : string) {
    const [list, setLists] = useState<ITodo[]>([]);

    useEffect( () => {
        fetchListDataFromServer(listId, apiLink)
            .then(val => setLists(val));
    }, [])

    return list;
}

