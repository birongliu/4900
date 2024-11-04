import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config'
import { Router } from 'express'

const router = Router()

router.post('/', async (req, res) => {
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY
    });

    const model = 'multilingual-e5-large';
    const indexName = 'pet-index';
    const index = pc.index(indexName);
    

    const query = []
    query.push(req.body.query)
    console.log(query)

    const embedding = await pc.inference.embed(
        model,
        query,
        { inputType: 'query' }
    );

    const queryResponse = await index.namespace("ns1").query({
        topK: 3,
        vector: embedding[0].values,
        includeValues: false,
        includeMetadata: true
    });

    console.log(queryResponse);
    console.log(queryResponse.matches)
    
    res.json(queryResponse.matches)
})

export default router;

