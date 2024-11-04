import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config'


const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

const indexName = 'pet-index';
const index = pc.index(indexName);

if (!index) {
        await pc.createIndex({
            name: indexName,
            dimension: 1024, 
            metric: 'cosine', 
            spec: { 
                serverless: { 
                cloud: 'aws', 
                region: 'us-east-1' 
                }
            } 
    })}

const model = 'multilingual-e5-large';

const response = await fetch('http://localhost:3001/api/pets')
const data = await response.json()
const petData = data.data
console.log(petData)

const embeddings = await pc.inference.embed(
        model,
        petData.map(d => d.descriptionText ?? ''),
        { inputType: 'passage', truncate: 'END' }
);


console.log('embedding: ',embeddings[0]);

const vectors = petData.map((d, i) => ({
id: d.animalId,
values: embeddings[i].values,
    metadata: {
        name: d.name,
        breed: d.breed,
        size: d.size,
        health: JSON.stringify(d.health),
        description: d.descriptionText,
        pictureThumbnailUrl: d.pictureThumbnailUrl, }
}));

await index.namespace('ns1').upsert(vectors);
const stats = await index.describeIndexStats();

console.log(stats)