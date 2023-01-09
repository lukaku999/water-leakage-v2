const cors = require('cors');
const express = require('express');

//The API spec is created using SwaggerUI
const swaggerUI = require('swagger-ui-express');

const { bootstrap } = require('./bootstrap');

const { specs } = require('./apiSpec/specs');
const {
  getLeakages,
  getLeakage,
  updateLeakage,
  addLeakage,
} = require('./routes/leakages');

const {
  getRepairers,
  getRepairer,
  addRepairer,
  updateRepairer,
} = require('./routes/repairers');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 9000;
const router = express.Router();

//the first parameter points to the route the API documentation can be located on the Server
app.use('/', swaggerUI.serve, swaggerUI.setup(specs));

//schema definition of the API
/**
 * @swagger
 * components:
 *   schemas:
 *     Leakage:
 *       type: object
 *       required:
 *         - id
 *         - sensorId
 *       properties:
 *         id:
 *           type: string
 *           description: An auto-generated id of the leakage record generated by Firestore.
 *         sensorId:
 *           type: string
 *           description: The id of the pipeline's sensor.
 *         pipelineId:
 *           type: string
 *           description: The id of the pipeline.
 *         leakageDescription:
 *           $ref: '#/components/schemas/Leakage Description'
 *         repair:
 *           $ref: '#/components/schemas/Repair'
 *       example:
 *         id: 0FzCSMPO3RYn71gpEmKi
 *         sensorId: "10861"
 *         pipelineId: "10861"
 *         leakageDescription: {cause: Human related, description: '', flowRate: 14.1, status: leaking, startDate: 2021-02-18, startTime: 11:00}
 *         repair: {assignedTo: BqiuoLYnefz2AORVEBh6, repairBy: 5zaLTSmGdCa9aC63txEV, date: 2022-08-27, time: 12:00}
 *
 *     Leakage Description:
 *       type: object
 *       properties:
 *         cause:
 *           type: string
 *           description: The cause of the pipe leakage.
 *         description:
 *           type: string
 *           description: A description of the pipe leakage.
 *         flowRate:
 *           type: float
 *           description: The rate of flow of the leakage measured in cubic meters per second (cms).
 *         status:
 *           type: string
 *           description: The status of the pipe leakage. There are two possible values for the pipe leakgage status. The value is either 'leaking' or 'repaired'.
 *         startDate:
 *           type: string
 *           description: The date the pipe leakage was detected by a person/sensor.
 *         startTime:
 *           type: string
 *           description: The time the pipe leakage was detected by a person/sensor.
 *     Repair:
 *       type: object
 *       properties:
 *         assignedTo:
 *           type: string
 *           description: The id of the repairer assigned to fix a leakage.
 *         repairBy:
 *           type: string
 *           description: The id of the repairer that fixed the leakage.
 *         date:
 *           type: string
 *           description: The date the pipe leakage was repaired.
 *         time:
 *           type: string
 *           description: The time the pipe leakage was repaired.
 *         sensorID:
 *           type: string
 *           description: The id of the sensor that detected the pipe leakage.
 *         pipelineID:
 *           type: string
 *           description: The id of the pipeline that experienced/experiencing the leakage.
 *     Repairer:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: An auto-generated id of the repairer record generated by Firestore.
 *         profile:
 *           $ref: '#/components/schemas/Profile'
 *         repairs:
 *           $ref: '#/components/schemas/Repairs'
 *       example:
 *         id: 5zaLTSmGdCa9aC63txEV
 *         profile: {name: Mabuela, surname: Ngulube, phone: 0812132324, email: something@gmail.com, address: ""}
 *         repairs: {completed: [], assigned: []}
 *     Profile:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of repairer.
 *         surname:
 *           type: string
 *           description: Surname of repairer.
 *         phone:
 *           type: string
 *           description: Cellphone number of repairer.
 *         email:
 *           type: string
 *           description: Email address of repairer.
 *         address:
 *           type: string
 *           description: Home address of repairer.
 *     Repairs:
 *       type: object
 *       properties:
 *         completed:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Leakage'
 *         assigned:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Leakage'
 */

//below are the tags that are used to group HTTP requests belonging to a specific route, i.e. /leakages
/**
 * @swagger
 * tags:
 *   name: Leakages
 *   description: HTTP requests related to pipeline leakages
 *
 */
/**
 * @swagger
 * tags:
 *   name: Repairers
 *   description: HTTP requests related to leakage repairers
 *
 */

//below are the HTTP requests accompanied with the documentation of HTTP requests using Swagger
/**
 * @swagger
 * /leakages:
 *   get:
 *      summary: Returns a list of leakage documents.
 *      tags: [Leakages]
 *      responses:
 *        200:
 *          description: A array of leakage documents.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Leakage'
 *        500:
 *          description: Server error.
 *
 */
router.get('/leakages', getLeakages);

/**
 * @swagger
 * /leakages/{id}:
 *   get:
 *      summary: Returns a leakage object based on the id provided by user.
 *      tags: [Leakages]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The leakage id of the document.
 *      responses:
 *        200:
 *          description: An object containing data about a leakage.

 *        404:
 *          description: Document was not found.
 *        500:
 *          description: Something went wrong on the server.
 *
 */
router.get('/leakages/:id', getLeakage);

/**
 * @swagger
 * /leakages/{id}:
 *   put:
 *      summary: Updates the leakage document specified by user.
 *      tags: [Leakages]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Leakage'
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The leakage id of the document.
 *      responses:
 *        200:
 *          description: Document was succesfully updated.
 *        404:
 *          description: Document was not found.
 *        500:
 *          description: Something went wrong on the server.
 *
 */
router.put('/leakages/:id', updateLeakage);

/**
 * @swagger
 * /leakages/{id}:
 *   post:
 *      summary: Adds a new leakage document.
 *      tags: [Leakages]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Leakage'
 *      responses:
 *        200:
 *          description: Document was successfully added.
 *        500:
 *          description: Something went wrong on the server.
 *
 */
router.post('/leakages/:id', addLeakage);

/**
 * @swagger
 * /repairers:
 *   get:
 *      summary: Returns a list of repairer documents.
 *      tags: [Repairers]
 *      responses:
 *        200:
 *          description: A array of leakage documents.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Repairer'
 *        500:
 *          description: Server error.
 *
 */
router.get('/repairers', getRepairers);

/**
 * @swagger
 * /repairers/{id}:
 *   get:
 *      summary: Returns a repairer object based on the id provided by user.
 *      tags: [Repairers]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The repairer id of the document.
 *      responses:
 *        200:
 *          description: An object containing data about a repairer.

 *        404:
 *          description: Document was not found.
 *        500:
 *          description: Something went wrong on the server.
 *
 */
router.get('/repairers/:id', getRepairer);

/**
 * @swagger
 * /repairers/{id}:
 *   put:
 *      summary: Updates the repairer document specified by user.
 *      tags: [Repairers]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The leakage id of the document.
 *      responses:
 *        200:
 *          description: Document was succesfully updated.
 *        404:
 *          description: Document was not found.
 *        500:
 *          description: Something went wrong on the server.
 *
 */
router.put('/repairers/:id', updateRepairer);

/**
 * @swagger
 * /repairers/{id}:
 *   post:
 *      summary: Adds a new repairer document.
 *      tags: [Repairers]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *      responses:
 *        200:
 *          description: Document was successfully added.
 *        500:
 *          description: Something went wrong on the server.
 *
 */
router.post('/repairers/:id', addRepairer);

app.use('/api', router);
app.listen(PORT, () => console.log('server is alive '));
