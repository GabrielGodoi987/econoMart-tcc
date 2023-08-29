const Express = require("express");
const app = Express();

app.get('/', (req, res) => {
    res.json({
       teste: "teste de back end"
    });
});


app.listen(9080, () => {
    console.log("servidor teste")
});
