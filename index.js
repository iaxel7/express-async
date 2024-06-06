import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";



app.use(bodyParser.urlencoded({ extended: true }));

//GET random joke
app.get("/random", (req,res)=> {
    //finds a random number out of 15(length of jokes obj)

    const randomIndex = Math.floor(Math.random() * jokes.length);
    res.json(jokes[randomIndex]);
});



//GET request for joke id
app.get("/jokes/:id", (req, res) => {
    //converts string into integer and store inside id
    const id = parseInt(req.params.id);
    //find method takes array and a callback and it chacks if the id we are looping through, and checks if it matches 
    const foundJoke = jokes.find((joke) => joke.id === id);
    res.json(foundJoke);
});


//GET filter jokes by specific type 
app.get("/filter", (req, res) => {
    const type = req.query.type; //type client request live in query param 
    const filteredActivities = jokes.filter((joke) => joke.jokeType === type);
    //using filter to pass callback that looks through jokes and tries to find match to the request and returns a array.
    res.json(filteredActivities);
});


//POST request
app.post("/jokes", (req, res) => {
    // create new obj in newJoke 
    const newJoke = {
        id: jokes.length + 1,  // takes joke array and adds 1
        jokeText: req.body.text,// uses body parser code which auto parses incoming request 
        jokeType: req.body.type,
    };
    //pushes and adds it to the end of the array
    jokes.push(newJoke);
    console.log(jokes.slice(-1)); //logs the most recent item
    res.json(newJoke);
})


//PUT request 
app.put("/jokes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const replacementJoke = {
        //grabs id and info
        id: id,
        jokeText: req.body.text,
        jokeType: req.body.type,
    };
    //and finds it
    const searchIndex = jokes.findIndex((joke) => joke.id === id);
//loops through each joke to match id and puts it in searchIndex
//sets new joke and replaces info
    jokes[searchIndex] = replacementJoke;
    res.json(replacementJoke);
});


//PATCH request 
app.patch("/jokes/:id", (req, res) => {
    const id = parseInt(req.params.id); //checks joke id and finds joke that matches
    const existingJoke = jokes.find((joke)=> joke.id === id);
    const replacementJoke = {
        //construct replacement joke, checks to see if patch request included something in body if not it ignores it and keeps existing info
        id:id,
        jokeText: req.body.text || existingJoke.jokeText,
        jokeType: req.body.type || existingJoke.jokeType,
    };
    const searchIndex = jokes.findIndex((joke) => joke.id === id);
    jokes[searchIndex] = replacementJoke;
    console.log(jokes[searchIndex]);
    res.json(replacementJoke);
});


//DELETE method 
app.delete("/jokes/:id", (req,res) => {
    const id = parseInt(req.params.id);//finds index of joke that matches id that was passed 
    const searchIndex = jokes.findIndex((joke) => joke.id === id);
    // if it exist use splice method to remove only one element from array
    if (searchIndex > -1) {
        jokes.splice(searchIndex, 1);
        res.sendStatus(200);
    }else {
        res.status(404)
        .json({error: `Joke with ${id} not found. No jokes were deleted`})
    }
});

//DELETE ALL 
app.delete("/all", (req,res)=> {
    // checks to see if user key is ==== to masterkey to delete everything 
    const userKey = req.query.key;
    if (userKey === masterKey) {
        jokes = [];
        res.sendStatus(200);
    } else {
        res
        .status(404)
        .json({error: `You don't have permission to perform this action nice try`})
    }
})



const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms));





app.listen(port,() => {
    console.log(`Successfully started server on port ${port}`);
});



//JOKE OBJ 
var jokes = [
        {
          id: 1,
          jokeText:
            "Why don't scientists trust atoms? Because they make up everything.",
          jokeType: "Science",
        },
        {
          id: 2,
          jokeText:
            "Why did the scarecrow win an award? Because he was outstanding in his field.",
          jokeType: "Puns",
        },
        {
          id: 3,
          jokeText:
            "I told my wife she was drawing her eyebrows too high. She looked surprised.",
          jokeType: "Puns",
        },
        {
          id: 4,
          jokeText:
            "What did one ocean say to the other ocean? Nothing, they just waved.",
          jokeType: "Wordplay",
        },
        {
          id: 5,
          jokeText:
            "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
          jokeType: "Wordplay",
        },
        {
          id: 6,
          jokeText: "How do you organize a space party? You planet!",
          jokeType: "Science",
        },
        {
          id: 7,
          jokeText:
            "Why don't some couples go to the gym? Because some relationships don't work out.",
          jokeType: "Puns",
        },
        {
          id: 8,
          jokeText:
            "Parallel lines have so much in common. It's a shame they'll never meet.",
          jokeType: "Math",
        },
        {
          id: 9,
          jokeText: "What do you call fake spaghetti? An impasta!",
          jokeType: "Food",
        },
        {
          id: 10,
          jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
          jokeType: "Food",
        },
        {
          id: 11,
          jokeText:
            "What do you get when you cross a snowman and a vampire? Frostbite!",
          jokeType: "Wordplay",
        },
        {
          id: 12,
          jokeText:
            "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
          jokeType: "Sports",
        },
        {
          id: 13,
          jokeText:
            "Why are ghosts bad at lying? Because you can see right through them!",
          jokeType: "Wordplay",
        },
        {
          id: 14,
          jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
          jokeType: "Movies",
        },
        {
          id: 15,
          jokeText:
            "I'm reading a book about anti-gravity. It's impossible to put down!",
          jokeType: "Science",
        },
]