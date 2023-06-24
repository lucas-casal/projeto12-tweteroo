import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

const users = []

const tweets = []

app.post('/sign-up', (req, res)=>{
    const { avatar } = req.body
    const { user } = req.headers
    if(!user || !avatar || typeof user !== "string" || typeof avatar !== "string"){
        res.status(400).send("Todos os campos são obrigatórios!")
    } else{
        users.push({user, avatar})
        console.log(typeof user)
        res.status(201).send("OK")
    }
})

app.post('/tweets', (req, res) =>{
    const { tweet } = req.body
    const { user } = req.headers
    if (users.find(x => x.user === user) && tweet && typeof user === "string" && typeof tweet === "string"){
        tweets.splice(0,0,{user, tweet})
        res.status(201).send("OK")
    } else if (!users.find(x => x.user === user)){
        res.status(401).send("UNAUTHORIZED")
    } else{
        res.status(400).send("Todos os campos são obrigatórios!")
    }
})

app.get('/tweets', (req, res) => {
    function findAang(username){
        const user = users.find(x => x.username === username)
        return user.avatar
    }

    const {page} = req.query

    if (page && !isNaN(page) && page >= 1){
       /* if (tweets.length < (page-1)*10){
            res.send("Não há tweets nessa página")    
        } else{
        */
        const showedUp = tweets.length === 0 ? [] : tweets.slice(10*(page-1),10*page)

        showedUp.map(x => x.avatar = findAang(x.username))
        
        res.send(showedUp)
        // }
    } else if (!page){
    const showedUp = tweets.length === 0 ? [] : tweets.slice(0, 10)

    showedUp.map(x => x.avatar = findAang(x.username))
    
    res.send(showedUp) 
    } else{
        res.status(400).send("Informe uma página válida!")
    }
})

app.get('/tweets/:USERNAME', (req, res) => {
    function findAang(username){
        const user = users.find(x => x.username === username)
        return user.avatar
    }

    const {USERNAME} = req.params
    if(users.find(x => x.username === USERNAME)){
    const showedUp = tweets.filter(x => x.username === USERNAME)

    showedUp.map(x => x.avatar = findAang(x.username))
    
    res.send(showedUp)
    } else{
        res.status(404).send(`User ${USERNAME} not found`)
    }

})




const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))