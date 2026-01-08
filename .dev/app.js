const express = require('express');
const app = express();
const port = 2763;

app.use(express.static('docs'));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});