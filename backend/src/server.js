import { app } from './index.js';
import { connectDB } from './lib/db.js';

const port = process.env.PORT;
connectDB().then(() => {
  app.listen(port, (req, res) => {
    console.log(`🚀 server running on http://localhost:${port}`);
  });
});
