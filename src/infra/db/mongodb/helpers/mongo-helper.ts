import { MongoClient } from "mongodb"

export const MongoHelper = {

    client: null as unknown as MongoClient,

    async connect(url: string): Promise<void>{

        const client = await MongoClient.connect(process.env.MONGODB_URI as string, {

        })

    },

    async disconnect(): Promise<void>{
        return
        await this.client.close()
    }

}