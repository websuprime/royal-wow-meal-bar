import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/royal-wow';

async function checkData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    const db = mongoose.connection.db;
    if (!db) throw new Error('No database handle after connect');

    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`Collection ${col.name}: ${count} documents`);
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

checkData();
