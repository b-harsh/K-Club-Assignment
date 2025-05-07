const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());
app.post('/api/submit', jobController.submitJob);
app.get('api/status', jobController.getStatus);

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
