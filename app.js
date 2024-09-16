const express = require('express')
const path = require('path')
const app = express()

let todos = [
    {id: 1, title: 'Todo 1', done: true},
    {id: 2, title: 'Todo 2', done: false},
    {id: 3, title: 'Todo 3', done: false},
]
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req, res)=>{
    res.render("index", {context: {todos}})
})
app.use(express.urlencoded({extended: true}))

app.post('/new', (req, res)=>{
    console.log(req.body)
    todos.push({
        id: todos.length + 1,
        title: req.body.title,
        done:false
    })
    res.render('index', {context:{todos, message:'Added a new todo'}})
})

app.post('/done/:id',(req, res)=>{
    const id = parseInt(req.params.id)
    console.log('id', id)
    todos = todos.map((todo)=>todo.id == id ? {...todo,done: !todo.done}: todo)
    console.log('todos', todos)
    res.render('index',{context:{todos, message:'toggle todo'}})
})

app.post('/delete/:id',(req, res)=>{
    const id = parseInt(req.params.id)
    todos = todos.filter((todo)=> todo.id !== id )
    res.render('index',{context:{todos, message:`deleted todo ${id}`}})
})
app.listen(8000, ()=>console.log('Server running at port 8000...'))