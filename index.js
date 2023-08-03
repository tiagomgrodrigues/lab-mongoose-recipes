const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

//Method 1 : Using Async Await

const manageRecipes = async () => {
    try {
        // Connection to the database "recipe-app"
        const dbConnection = await mongoose.connect(MONGODB_URI);
        console.log(
            `Connected to the database: "${dbConnection.connection.name}"`
        );
        // Before adding any recipes to the database, let's remove all existing ones
        await Recipe.deleteMany();

        // Create a new Recipe
        let receita1 = {
            title: "Bacalhau à Brás",
            level: "Easy Peasy",
            ingredients: ["Bacalhau", "batatas"],
            cuisine: "Portuguesa",
            dishType: "main_course",
            duration: 45,
            creator: "Tiago Rodrigues",
        };

        let receita1Db = await Recipe.create(receita1);
        //console.log(receita1Db);

        // Iteration 3
        let allReceipes = await Recipe.insertMany(data);

        for (let i = 0; i < allReceipes.length; i++) {
            console.log("Recipe: " + allReceipes[i].title);
        }

        // Iteration 4
        //let duration = await Recipe.findById("Rigatoni alla Genovese");
        await Recipe.findOneAndUpdate(
            { title: "Rigatoni alla Genovese" },
            { duration: 100 }
        );

        let checkDuration = await Recipe.find({
            title: "Rigatoni alla Genovese",
        });

        //console.log(checkDuration);

        // Iteration 5

        /*console.log(
            "Find Object: " + (await Recipe.find({ title: "Carrot Cake" }))
        );*/

        await Recipe.deleteOne({ title: "Carrot Cake" });

        /*console.log(
            "Deleted Object: " + (await Recipe.find({ title: "Carrot Cake" }))
        );*/

        //console.log("Duração: " + checkDuration);

        // Iteration 6
        mongoose.connection.close();

        // Run your code here, after you have insured that the connection was made
    } catch (error) {
        console.log(error);
    }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
