import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())

const users = [{
	username: 'bobesponja', 
	avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png" 
}]

const tweets = [{
    username: "bobesponja",
    tweet: "Eu amo hambúrguer de siri!"
}]

app.post('/sign-up', (req, res)=>{
    const { username, avatar } = req.body
    if(username && avatar){
        users.push({username: username, avatar: avatar})
        res.send("OK")
    }
})

app.post('/tweets', (req, res) =>{
    const { username, tweet } = req.body
    if (users.find(x => x.username === username) && tweet){
        tweets.push({username, tweet})
        res.send("OK")
    } else if (!users.find(x => x.username === username)){
        res.send("UNAUTHORIZED")
    } else{
        res.send("houve algum erro no envio do tweet")
    }
})

app.get('/tweets', (req, res) => {
    function findAang(username){
        const user = users.find(x => x.username === username)
        return user.avatar
    }

    const showedUp = tweets.length > 9 ? tweets.slice(tweets.length-10) : (tweets.length === 0 ? [] : tweets)

    showedUp.map(x => x.avatar = findAang(x.username))
    
    res.send(showedUp)

})





const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))