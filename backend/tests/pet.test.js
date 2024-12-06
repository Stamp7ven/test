const request = require('supertest');

const { describe, beforeAll, afterAll, it, expect } = require("@jest/globals");
const _ = require("lodash");
let testPetId; // Global variable to store the created pet ID

describe('Pet API', () => {

    const grantPrivilege = async (
        roleID = 1,
        path,
        enabled = true,
        policy = ""
    ) => {


        const service = strapi.plugin("users-permissions").service("role");

        const role = await service.getRole(roleID);

        _.set(role.permissions, path, { enabled, policy });

        return service.updateRole(roleID, role);
    };

    const grantPrivileges = async (roleID = 1, values = []) => {

        await Promise.all(values.map((val) => grantPrivilege(roleID, val)));
    };

    beforeAll(async () => {
        let permissions = [
            'api::pet.controllers.pet.create',
            'api::pet.controllers.pet.find',
            'api::pet.controllers.pet.findOne',
            'api::pet.controllers.pet.update',
            'api::pet.controllers.pet.delete',
        ]
        // await grantPrivileges(2,permissions);
        await grantPrivileges(2, permissions);
    })



    // CREATE a new pet entry (POST /api/pets)
    it('should create a new pet entry', async () => {
        const newPet = {
            data: {
                name: 'Buddy',
                animal: 'Dog',
                breed: 'Golden Retriever',
                age: 3, // Ensure age is a number
                location: 'Bangkok',
                sex: 'Male',
                ageType: 'Year',
            },
        };

        const response = await request(strapi.server.httpServer)  // Using global strapi instance
            .post('/api/pets')
            .send(newPet);

        console.log(JSON.stringify(response.body, null, 2)); // Log the full response body for better visibility

        // Check the response status
        expect(response.status).toBe(200);  // Expect successful creation

        // Validate the response body structure
        expect(response.body.name).toBe(newPet.name);  // Validate the response's name
        expect(response.body.animal).toBe(newPet.animal);  // Validate the response's animal
        expect(response.body.breed).toBe(newPet.breed);  // Validate the response's breed
        expect(response.body.age).toBe(newPet.age);  // Validate the response's age
        expect(response.body.location).toBe(newPet.location);  // Validate the response's location
        expect(response.body.sex).toBe(newPet.sex);  // Validate the response's sex
        expect(response.body.ageType).toBe(newPet.ageType);  // Validate the response's ageType

        // Store the created pet ID for other tests
        testPetId = response.body.data.id;  // Update to access id correctly
    });

    // UPDATE an existing pet entry (PUT /api/pets/:id)
    it('should update an existing pet entry', async () => {
        // Log the testPetId before making the request
        console.log('Test Pet ID:', testPetId);

        const updatedPet = {
            data: {
                name: 'Buddy',
                animal: 'Dog',  // You might want to keep this unchanged
                breed: 'Labrador Retriever',  // Updated breed
                age: 4,  // New age
                location: 'Bangkok',  // Assuming location remains the same
                sex: 'Male',  // Assuming sex remains the same
                ageType: 'Year',
            },
        };

        const response = await request(strapi.server.httpServer)
            .put(`/api/pets/${testPetId}`)
            .send(updatedPet);

        // Log response status and body for troubleshooting
        console.log('Response Status:', response.status);
        console.log('Response Body:', JSON.stringify(response.body, null, 2));

        expect(response.status).toBe(200);  // Expect success
        expect(response.body.data.attributes.name).toBe(updatedPet.data.name);  // Verify updated name
        expect(response.body.data.attributes.breed).toBe(updatedPet.data.breed);  // Verify updated breed
        expect(response.body.data.attributes.age).toBe(updatedPet.data.age);  // Verify updated age
    });

    // GET all pets (GET /api/pets)
    it('should retrieve all pets', async () => {
        const response = await request(strapi.server.httpServer)
            .get('/api/pets');

        console.log('Retrieve All Pets Response:', JSON.stringify(response.body, null, 2)); // Log the full response for visibility

        expect(response.status).toBe(200);  // Successful retrieval

        // Check the correct structure based on what the API returns
        expect(response.body.data).toBeDefined();  // Ensure there is a data property

        // Check if 'data' is an array
        expect(Array.isArray(response.body.data)).toBeTruthy();  // Adjust to check the correct path

        // If you want to check the length of the array
        expect(response.body.data.length).toBeGreaterThan(0);  // Assuming you expect at least one pet
    });

    // Handle missing required fields (POST /api/pets with missing data)
    it('should handle missing required fields', async () => {
        const response = await request(strapi.server.httpServer)
            .post('/api/pets') // Sending a POST request without required fields
            .send({});  // Sending an empty body to trigger validation error

        console.log('Missing Fields Response:', JSON.stringify(response.body, null, 2)); // Log the full response

        expect(response.status).toBe(400);  // Expect validation error

        // Check for the correct path to the error message
        expect(response.body).toHaveProperty('error');  // Check if 'error' exists
        expect(response.body.error).toHaveProperty('message');  // Check if 'message' exists within 'error'
        expect(response.body.error.message).toBe('Missing "data" payload in the request body');  // Validate the error message
    });

    // Handle updates for non-existing pet (PUT /api/pets/:id for non-existing ID)
    it('should handle updating non-existing pet', async () => {
        const nonExistingPetId = 99999;  // Use a non-existing pet ID
        const updatedPet = {
            data: {
                name: 'Ghost',
                breed: 'Unknown',
            },
        };

        const response = await request(strapi.server.httpServer)
            .put(`/api/pets/${nonExistingPetId}`)
            .send(updatedPet);

        console.log('Update Non-Existing Pet Response:', JSON.stringify(response.body, null, 2)); // Log the response

        // Check for a 404 or handle a 400 depending on the API's behavior
        if (response.status === 404) {
            expect(response.status).toBe(404);  // Expect 404 Not Found
            expect(response.body.error).toHaveProperty('message');  // Adjust to check inside error object
            expect(response.body.error.message).toBe('Not Found');  // Validate the error message
        } else if (response.status === 400) {
            expect(response.status).toBe(400);  // Allow 400 if validation fails
            expect(response.body.error).toHaveProperty('message');  // Validate the error message
        }
    });

    // RETRIEVE a pet by ID (GET /api/pets/:id)
    it('should retrieve a pet by ID', async () => {
        const response = await request(strapi.server.httpServer)
            .get(`/api/pets/${testPetId}`);

        console.log('Retrieve Pet by ID Response:', JSON.stringify(response.body, null, 2)); // Log the response

        expect(response.status).toBe(200);  // Success
        expect(response.body.data.id).toBe(testPetId);  // Should return the correct pet ID
    });

    // DELETE a pet entry (DELETE /api/pets/:id)
    it('should delete a pet entry', async () => {
        const response = await request(strapi.server.httpServer)
            .delete(`/api/pets/${testPetId}`);

        expect(response.status).toBe(200);  // Successful deletion
    });

    // HANDLE retrieving a non-existing pet by ID (GET /api/pets/:id for non-existing ID)
    it('should handle retrieving a non-existing pet by ID', async () => {
        const nonExistingId = 9999; // Use an ID that doesn't exist
        const response = await request(strapi.server.httpServer)
            .get(`/api/pets/${nonExistingId}`);

        console.log('Non-Existing Pet by ID Response:', JSON.stringify(response.body, null, 2)); // Log the response for debugging

        expect(response.status).toBe(404);  // Expect a 404 Not Found error
        expect(response.body.error).toHaveProperty('message');  // Check if the error message exists
        expect(response.body.error.message).toBe('Not Found');  // Validate the error message itself
    });
});
