import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number;
};

const connection: connectionObject = {}

async function dbConnect(): Promise<void>{
    
    if(connection.isConnected){
        console.log("Database Already connected");
        return;
    }

    try {

        const db = await mongoose.connect(process.env.MONGODB_URI!);

        connection.isConnected = db.connections[0].readyState

        console.log(db);
        
        console.log(db.connections[0].readyState);

        console.log("Database connected Successfully");

    } catch (error) {
        
        console.log(`Database connection error: ${error}`);
        process.exit(1);
    }
}

export default dbConnect