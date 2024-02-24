import { connect } from "./database/env";
import express, { Application} from "express";
import router from "./api/routes";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(router);

async function start() {
    try {
        await connect();
        app.listen(8000, () => {
            console.log('Server is running on 8000');
        });
    } catch (error) {
        console.log(error);
    }
}

start();