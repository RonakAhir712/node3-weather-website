const path = require('path')
const express = require('express')
const port = 3000;
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and location  
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send(path.join(__dirname, '../public/help.html'))
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'ronak'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ronak'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is helpful text',
        title: 'Help',
        name: 'Ronak'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must have to provide address for location'
        })
    }

    geocode(req.query.address, (error,location)=>{
        if(error){
            return res.send({ error })
        }

        forecast(req.query.address, (error, data) => {
            if(error){
                return  res.send({ error })
            }
            res.send({
                forecast: data,
                location: location.location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ronak',
        errorMessage: 'Help Artical Not Found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ronak',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})