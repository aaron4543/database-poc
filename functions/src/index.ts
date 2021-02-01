import * as functions from 'firebase-functions';
import { connect } from './config';

import { User } from './entity/User';
import { Hat } from './entity/Hat';


export const getUsers = functions.https.onRequest(async (request, response) => {


    const connection = await connect();
    const userRepo = connection.getRepository(User);


    // Count records
    // const count = await hippoRepo.count();

    // // Get all 
    const allUsers = await userRepo.find();

    // Raw SQL Query
    // const query = await hippoRepo.query('SELECT name FROM hippo WHERE WEIGHT > 5');


    // const hipposWearingHats = await hippoRepo
    //                             .createQueryBuilder('hippo')
    //                             .leftJoinAndSelect('hippo.hats', 'hat')
    //                             .getMany();

    response.send(allUsers);

});


export const createUser = functions.https.onRequest(async (request, response) => {

    const { name, weight, isCool } = request.body;

    try {
        const connection = await connect();

        const repo = connection.getRepository(User);

        const newUser = new User();
        newUser.name = name;
        newUser.weight = weight;
        newUser.isCool = isCool;


        const savedUser = await repo.save(newUser);

        response.send(savedUser);

    } catch (error) {
        response.send(error)
    }

});

export const updateUser = functions.https.onRequest(async (request, response) => {

    // const { isCool } = request.body;

    try {
        const connection = await connect();

        const repo = connection.getRepository(User);

        const updatedUser = await repo.findOne(2);
        updatedUser.isCool = true;

        const savedUpdate = await repo.save(updatedUser);

        response.send(savedUpdate);

    } catch (error) {
        response.send(error)
    }

});

export const helloWorldPublic = functions.https.onRequest((request, response) => {
    response.send("Hello World");
  });

export const createHat = functions.https.onRequest(async (request, response) => {

    const { owner, color } = request.body;

    try {
        const connection = await connect();
        const repo = connection.getRepository(Hat);

        const newHat = new Hat();
        newHat.owner = owner;
        newHat.color = color;

        const savedHat = await repo.save(newHat);
        response.send(savedHat);

    } catch (error) {
        response.send(error)
    }
});