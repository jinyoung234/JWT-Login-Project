import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(
    cors({
        credentials: true,
        origin : 'http://localhost:3000',
    })
);

function main() {
    app.listen(4000, () => {
        console.log('Server listening at http://localhost:4000');
    });
}

main();