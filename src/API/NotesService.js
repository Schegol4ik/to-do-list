import axios from "axios";

export default class NoteService{
    static async getALL(){
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=4')
        return response
    }
}

