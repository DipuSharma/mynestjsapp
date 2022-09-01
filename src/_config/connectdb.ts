import mongoose from 'mongoose';

const connectDb = async (DataBase_Url) => {
    try {
        const DB_OPTIONS = {
            dbName: "DipuAuth"
        }
    await mongoose.connect(DataBase_Url, DB_OPTIONS)
    console.log("DataBase Connected Successfully")
    } catch (error) {
        console.log("Not Connected Unsuccessfully");
        
    }
}