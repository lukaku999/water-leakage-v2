const cors = require('cors');
const express = require('express');
const app = express();
const swaggerUI = require('swagger-ui-express');
const { specs } = require('./apiSpec/options');

const { getAllLeakages } = require('./src/routes/leakages');
// const { getRepairers } = require('./routes/repairers');

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

const PORT = 9000;

const router = express.Router();

router.get('/leakages', getAllLeakages);

app.use('/api', router);
app.listen(PORT, () => console.log('its alive '));
