const express = require("express");
const apiRoutes = require("./routes");

const { ServerConfig } = require("./config");

const app = express();

/*=== Register your body-parse middleware for all requests 
- Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
===*/
app.use(express.json());

/*== 
The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).

querystring library: cannot parsed nested object.
qs library: can be parsed in nested object.
==*/
app.use(express.urlencoded({ extended: true }));

/*=== Routes ===*/
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);


    const { City, Airport } = require("./models");
    // const city = await City.create({ name: "Bengaluru" })
    // const Bengaluru = await City.findByPk(26);
    // console.log(Bengaluru);

    // const maharanaPratapAirport = await Airport.create({ name: "maharanaPratapAirport", code: "MHJ", cityId: 6 });
    // console.log(maharanaPratapAirport);

    /*== Now see what object Oriented design offer to us have when you combine multiple models after javascript level associations==*/
    // const KMPAirport = await Bengaluru.createAirport({
    //     name: "Kempegowda International Airport",
    //     code: "BLR"
    // });
    // console.log(KMPAirport);


    // const MYAirport = await Bengaluru.createAirport({
    //     name: "Mysore Airport",
    //     code: "HLR"
    // });
    // console.log(MYAirport);

    // const bengaluruAiports = await Bengaluru.getAirports();
    // console.log(bengaluruAiports);

    // const MYAirport = await Airport.findByPk(5);
    // console.log(MYAirport);
    // console.log("Remove The Airport from Benagluru city =>")

    /*== removeAirport removes the association between the City and the specified Airport.
    This is done by setting the foreign key in the Airport table (usually cityId) to NULL for the specified Airport record. ==*/
    // await Bengaluru.removeAirport(MYAirport);


    // await City.destroy({
    //     where: {
    //         id: 25
    //     }
    // });
})


/*== Google Flights API: https://serpapi.com/google-flights-api ==*/