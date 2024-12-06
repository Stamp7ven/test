# CS360 1/2567 Term Project: FurEveryHome 

## Group Information

- **Group Name:** Riyal or Fakay?  

## Members
| name                    | student ID |
| ----------------------- | ---------- |
| Panapol  Junjerm        | 6509650146 | <br> |
| Kwandao  Khunburee      | 6509650245 | <br> |
| Punnapa  Triratdilokkul | 6509650559 | <br> |
| Teerapat Kirdpaiboon    | 6509650468 | <br> |

## Project Goal
The web application serves as a platform for managing and facilitating pet adoptions. It allows users to easily create, view, and manage pet profiles, including details such as name, age, species, breed, location and gender. By providing an organized and intuitive interface for handling pet information, the application enhances the pet adoption process, making it more efficient for both potential adopters and shelters. The goal is to connect pets with their future families more effectively and to support shelters in managing their adoption processes seamlessly. 

### Features
- Feature 1: Dark/Light Mode Toggle 
- Feature 2: User alert window for Successful Pet Addition, Editing, and Deletion Actions 
- Feature 3: Enhanced Dropdown Menu for Gender and Animal Species Selection 
- Feature 4: Enhanced Age Input with Validation, Month Support, and Unknown Age Option 


### Technologies Used
- **Backend:** Strapi V4 ([Pet Adoption Backend](https://github.com/hubertnare/pet-adoption-backend.git))
- **Frontend:** React.js 
- **Hosting/Deployment:** AWS EC2
- **Database:**  SQLite

The backend for this project is based on the Pet Adoption Backend developed by Hubertnare, which is built using Strapi V4. We appreciate their contribution and have integrated their solution into our project.

## Table of Contents

- [CS360 1/2567 Term Project: FurEveryHome](#cs360-12567-term-project-fureveryhome)
  - [Group Information](#group-information)
  - [Members](#members)
  - [Project Goal](#project-goal)
    - [Features](#features)
    - [Technologies Used](#technologies-used)
  - [Setting Up an EC2 Instance](#setting-up-an-ec2-instance)
  - [System Requirements](#system-requirements)
  - [How to Deploy and Run the Project Manually](#how-to-deploy-and-run-the-project-manually)
  - [How to Deploy and Run the Project Using the Provided Bash Script](#how-to-deploy-and-run-the-project-using-the-provided-bash-script)
  - [Unit and Integration Testing Overview](#unit-and-integration-testing-overview)
    - [Test Feature](#test-feature)
    - [Testing Tools Used](#testing-tools-used)
    - [CI/CD Integration with GitHub Actions](#cicd-integration-with-github-actions)
  - [Setting Up Tests](#setting-up-tests)
  - [Running Tests & CI Pipeline Process](#running-tests)
  - [Test File Structure](#test-file-structure)
  - [CI Configuration](#ci-configuration)
  - [Test Coverage Include Continuous Integration](#test-coverage)
  - [Viewing Test Results](#viewing-test-results)
  - [Adding New Tests](#adding-new-tests)
  - [CI/CD Pipeline Overview](#cicd-pipeline-overview)  
    - [CI/CD Pipeline Structure](#cicd-pipeline-structure)  
      - [Continuous Integration (CI)](#1-continuous-integration-ci)  
      - [Continuous Deployment (CD)](#2-continuous-deployment-cd)  
    - [Workflow Configuration](#workflow-configuration)  
    - [Triggering the CI/CD Pipeline](#triggering-the-cicd-pipeline)  
      - [Automatic Triggers](#1-automatic-triggers)  
      - [Manual Trigger](#2-manual-trigger)  
    - [Environment Variables and Secrets](#environment-variables-and-secrets)   
    - [Monitoring and Logs](#monitoring-and-logs)  

## Setting Up an EC2 Instance

1. Log in to AWS Console
2. Launch a new EC2 instance <br>
 **Application and OS Images** : Ubuntu Server 24.04 LTS (HVM), SSD Volume Type <br>
  **Instance type** : t2.medium  <br>
  **Network setting** : create security group  <br>
-   Type:  `SSH`,  Protocol:  `TCP`,  Port Range  `22`,  Source:  `::/0`
-   Type:  `HTTP`,  Protocol:  `TCP`,  Port Range  `80`,  Source:  `0.0.0.0/0, ::/0`
-   Type:  `HTTPS`,  Protocol:  `TCP`,  Port Range  `443`,  Source:  `0.0.0.0/0, ::/0`
-   Type:  `Custom TCP`,  Protocol:  `TCP`,  Port Range  `1337`,  Source:  `0.0.0.0/0`
-   Type:  `Custom TCP`,  Protocol:  `TCP`,  Port Range  `3000`,  Source:  `0.0.0.0/0`


## System Requirements

1. Git installation
2. Node.js installation (version 12.x.x - 16.x.x) 
- npm: installed automatically with Node.js (version 8.19.4)
- yarn : for faster package management (version 1.22.22)
3. PM2 is included in the deployment through a Bash script. (version 5.4.2)
  
## How to deploy and run the project manually 

**1. Connect to EC2 Instance**
- Open terminal and connect to EC2 instance using SSH :
```bash
ssh -i <your-key.pem> ec2-user@<your-ec2-instance-ip>
```

**2. Check if Git, Node.js, and Yarn are Installed**
- Verify if Git, Node.js, and Yarn are already installed :
```bash
git --version
node -v
yarn --version
```
- If any of these commands return an error or indicate they aren’t installed, proceed to the next step to install them.
  
**3. Install Node.js, Git, and Yarn (if not already installed)**
- Update the package list :
```bash
sudo apt update
```
- Install Git :
```bash
sudo apt install git
```
- Install Node.js (version 16.x.x) :
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```
- Install Yarn :
```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install --no-install-recommends yarn
```
**4. Verify Installations**
- After installation, verify that Git, Node.js, and Yarn have been installed successfully by running :
```bash
git --version && node -v && yarn --version
```
**5. Clone the Project from GitHub**
- Clone the repository :
```bash
git clone https://github.com/Kwandao6509650245/CS360_Project.git
```
**6. Set Up the Backend**
- Change to the backend directory :
```bash
cd CS360_Project/backend
```
- Create or modify the .env file and copy the content from .env.example :
```bash
cp .env.example .env
```
- Generate Secret Keys <br>
Use the following command to generate 6 secret keys :
```bash
#generated_key1
openssl rand -base64 32
#generated_key2
openssl rand -base64 32
#generated_key3
openssl rand -base64 32
#generated_key4
openssl rand -base64 32
#generated_key5
openssl rand -base64 32
#generated_key6
openssl rand -base64 32
```
- Update the .env file <br>
After generating the secret keys, replace the toBeModified placeholders in the .env file :
```bash
#open .env file for modify
nano .env
```
```bash
#Copy the 6 generated secret keys from the previous step 
HOST=0.0.0.0
PORT=1337
APP_KEYS="generated_key1,generated_key2"
API_TOKEN_SALT=generated_key3
ADMIN_JWT_SECRET=generated_key4
TRANSFER_TOKEN_SALT=generated_key5
JWT_SECRET=generated_key6
```
**7. Build and Run the Backend**
- Install dependencies, build and start the backend server :
```bash
yarn
yarn build
yarn start
```
**8. Set Up the Frontend**
- Open a new terminal and connect to the same EC2 instance. 
- Change to the project directory and Change the IP address in http.js Before building the frontend, open the http.js file and update the url variable with the public IP of your EC2 instance :
```bash
cd CS360_Project
cp .env.example .env
```
- Update the .env file <br>
Replace REACT_APP_STRAPI_IP_ADDRESS and REACT_APP_STRAPI_PORT with your EC2 instance's public IP and your strapi port then
save and exit the editor (for nano, use CTRL + o, Enter, then  CTRL + x) :
```bash
#open .env file for modify
nano .env
```
```bash
REACT_APP_STRAPI_IP_ADDRESS=localhost
REACT_APP_STRAPI_PORT=1337
```
**9. Build and Run the Frontend**
- Install dependencies, build and start the Frontend server :
```bash
yarn
yarn build
yarn start
```
**10. Access the Backend and Frontend**
- Once both the backend and frontend are running, you can access them via your web browser.
- Open frontend :
```
http://<your-ec2-public-ip>:3000
```
- Open backend :
```
http://<your-ec2-public-ip>:1337
```
- Replace <your-ec2-public-ip> with the actual public IP address of your EC2 instance.

**11. Enable API in Strapi** <br>
By following these steps, you will be able to create, update, delete, and view data through the API without requiring authentication. <br>

- Access the Strapi Admin Panel
Open your browser and navigate to the Strapi Admin Panel, typically found at `http://<your-ec2-public-ip>:1337/admin` or another URL where your Strapi instance is running.

- Go to the Settings Menu
Once in the Admin Panel, click on the `Settings` option in the left sidebar.

- Select the User & Permissions Plugin
In the Settings page, find and click on the `User & Permissions Plugin` under the `PLUGIN` section.

- Click on Roles
After selecting the User & Permissions Plugin, choose the `Roles` submenu. This will show a list of roles within Strapi.

- Choose the Public Role
From the list of roles, select the `Public` role, which governs permissions for users who do not log in or register.

- Configure Permissions
After selecting the Public role, you will see a list of available API permissions.

  - Scroll down to the API `Pet` to enable for public access.
  - Tick the box for `Select All` to allow public access to all actions within that API.
  
- Save Changes
Once you have configured the permissions as needed, click the `Save` button in the lower-right corner to apply the changes.
  
## How to deploy and run the project using the provided bash script 

Ensure you are connected to your EC2 instance before proceeding. <br>

**Connect to EC2 Instance**
- Open terminal and connect to EC2 instance using SSH :
```bash
ssh -i <your-key.pem> ec2-user@<your-ec2-instance-ip>
```

Follow these steps to deploy and run the project using the provided bash script. <br>
**1. Set up and run the script**
- Navigate to root directory :
```bash
cd CS360_Project
```
- Change permission deploy-script.sh and run script :
```bash
chmod +x deploy-script.sh
source deploy-script.sh
```

**2. Access the Backend and Frontend**
- Once both the backend and frontend are running, you can access them via your web browser.
- Open frontend :
```
http://<your-ec2-public-ip>:3000
```
- Open backend :
```
http://<your-ec2-public-ip>:1337
```
- Replace <your-ec2-public-ip> with the actual public IP address of your EC2 instance.

**3. Enable API in Strapi** <br>
By following these steps, you will be able to create, update, delete, and view data through the API without requiring authentication. <br>

- Access the Strapi Admin Panel
Open your browser and navigate to the Strapi Admin Panel, typically found at `http://<your-ec2-public-ip>:1337/admin` or another URL where your Strapi instance is running.

- Go to the Settings Menu
Once in the Admin Panel, click on the `Settings` option in the left sidebar.

- Select the User & Permissions Plugin
In the Settings page, find and click on the `User & Permissions Plugin` under the `PLUGIN` section.

- Click on Roles
After selecting the User & Permissions Plugin, choose the `Roles` submenu. This will show a list of roles within Strapi.

- Choose the Public Role
From the list of roles, select the `Public` role, which governs permissions for users who do not log in or register.

- Configure Permissions
After selecting the Public role, you will see a list of available API permissions.

  - Scroll down to the API `Pet` to enable for public access.
  - Tick the box for `Select All` to allow public access to all actions within that API.
  
- Save Changes
Once you have configured the permissions as needed, click the `Save` button in the lower-right corner to apply the changes.

***
  
ภาพ screen capture ของหน้าเว็บแอปพลิเคชันซึ่ง deploy ไว้บน EC2

![Screenshot 2024-09-21 205426](https://github.com/user-attachments/assets/489a9f86-c1af-4c7d-99d5-5bac137d5aab)


## Unit and Integration Testing Overview
We use Jest for unit testing and Supertest for integration testing in the pet-adoption project. Below is an overview of the test cases and features that are tested.

### Total Test Cases
- Unit Tests: 6 test cases
- Integration Tests: 8 test cases
- Total Test Cases: 14 test cases

### Test Feature
1. Unit Tests (6 test cases):
Unit tests are designed to test individual functions or modules, ensuring that each component works as expected in isolation.
- CreatePetEntry Component
  - TC1 : Handles input changes from Create Pet Entry
  - TC2 : Calls createNewPet on button click with correct data
  - TC3 : Does not call createNewPet if required fields are not filled
- EditPetEntry Component
  - TC4 : Handles input changes from Edit Pet Entry
  - TC5 : Calls updatePet on button click with correct data
  - TC6 : Should not have the same values as the initial mock repo after editing
    
2. Integration Tests (8 test cases):
Integration tests are used to validate how different parts of the application work together, ensuring the entire flow works as expected.
- TC1 : CREATE a new pet entry (POST /api/pets)
- TC2 : UPDATE an existing pet entry (PUT /api/pets/:id)
- TC3 : GET all pets (GET /api/pets)
- TC4 : Handle missing required fields (POST /api/pets with missing data)
- TC5 : Handle updates for non-existing pet (PUT /api/pets/:id for non-existing ID)
- TC6 : RETRIEVE a pet by ID (GET /api/pets/:id)
- TC7 : DELETE a pet entry (DELETE /api/pets/:id)
- TC8 : HANDLE retrieving a non-existing pet by ID (GET /api/pets/:id for non-existing ID)

### Testing Tools Used
- Jest: Used for unit testing, ensuring that individual functions (such as pet entry functions and form validation) work correctly in isolation.
Supertest: Used for integration testing, focusing on API endpoints and the interaction between frontend and backend.
- Babel: Transpiles ES6+ JavaScript code to ensure compatibility with Jest, allowing modern - 
- JavaScript features in tests.

### CI/CD Integration with GitHub Actions
- GitHub Actions: Automates the testing process in CI/CD. Every push and pull request triggers the GitHub Actions workflow, which runs the test suite in various environments (e.g., macOS, Ubuntu). This ensures consistent test results across platforms and provides immediate feedback on any test failures, helping maintain code quality before merging.

## Setting Up Tests

- For local, to set up the testing environment, make sure you have Yarn installed. Then, install the required packages by running:
	1. Install denpendency for frontend
    ```bash
    yarn 
    ```
	2. Install denpendency for backend
    ```bash
    cd backend/
    yarn 
    ```
	3. Create or modify the .env file:
	- Run the deploy-script.sh script to set up the environment, or
	- Generate a secret key manually with:
     ``` bash
     openssl rand -base64 32
     ```
- for the CI pipeline ensure to setting up GitHub secret first:
  1. Go to your repository on GitHub.
  2. Navigate to Settings > Secrets and variables > Actions.
  3. Click New repository secret.
  4. Provide a name (e.g., `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`) and value (the secret data itself).
  5. Save the secret.
  6. The names of the secrets are case-sensitive, so ensure consistency in naming when referring to them in workflows.

- In our project, the CI pipeline automatically runs whenever code is updated (through push or pull requests) in every branch and follows these steps:

    1. **Trigger (on:)**  
       The pipeline automatically runs on any `push` or `pull_request` event to any branch (`'*'`). This ensures the workflow is triggered for all updates across branches.

    2. **Job Setup (Run-Test-Suite)**  
       - The job is configured to run on different operating systems using a matrix strategy (`ubuntu-24.04`, `windows-latest`, `macos-latest`), ensuring compatibility across environments. Different Node.js versions (`16.x`, `22.x`, and `node`) are also tested, ensuring the code runs smoothly on multiple versions of Node.js.
       - fail-fast: false lets all matrix combinations run, even if one fails, providing complete test results.

    3. **Steps**:
        - **System Information**:
            - `echo "This job is now running on a ${{ matrix.os }}"` outputs the OS currently in use for easier debugging and identification.
            - Displays the branch name and repository using `echo`, showing contextual information for the test.
        
        - **Checkout Code**:  
          Uses `actions/checkout@v4` to pull the latest code from the repository into the runner environment, ensuring the job has the most recent code.
        
        - **Setup Node.js**:  
          - Installs Node.js on the runner according to the specified `matrix.node-version`. The `cache: 'npm'` option is used to save previously downloaded packages and speed up future runs.
        
        - **List Repository Files**:  
          - Lists all files in the repository with `ls`, helping confirm that the code is available and accessible for subsequent steps.
        
        - **Install Dependencies**:  
          - Runs `npm install` to install all project dependencies as specified in `package-lock.json`, ensuring consistent dependency versions.
          - Installs project dependencies in the root for frontend and then specifically in the ./backend folder for backend.
            
        - **Environment Setup for Backend**:  
          - Creating a .env file within the ./backend folder and securely injecting secret environment variables from GitHub secret for Strapi API authentication, tokens, and other sensitive keys is essential for maintaining security and functionality.
            
        - **Run Test Suite**:  
          - Runs `npm test` to execute the automated tests.
          - The environment variables (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`) are set using GitHub secrets, securely providing necessary values for tests.
        
        - **If tests fail**, an error is logged specifying which tests failed on each OS and Node.js version.
        
        - **Display Job Status**:  
          - Logs the job’s final status (e.g., success or failure) using `echo`, providing a summary of the job outcome for easier troubleshooting.


## Running Tests
- **Running Tests Locally**: Run tests locally with these commands:

```bash
#unit test
npm test
```

```bash
#integration test
cd backend/
npm test
```

- **CI Pipeline Process**:
  1. Every time there’s a push or pull request to any branch (indicated by '*' in the `test-suite.yml` file), the pipeline triggers automatically.
  2. GitHub Actions starts running the Run-Test-Suite job, following each step in sequence: checking out code, setting up the environment, installing dependencies, and running the test suite.
  3. The matrix strategy makes the pipeline test the code across multiple operating systems and Node.js versions, as specified, to confirm compatibility across all environments.


## Test File Structure
### Unit Tests
The unit test files in this project are stored in the `src/__test__` folder:
```
src/
├── __test__/
│   ├── CreatePetEntry.test.js
│   ├── EditPetEntry.test.js
│   └── unit-test-troubleshooting.txt
├── component/
├── contexts/
├── main/
├── app.js
├── app.css
├── http.js
├── index.css
└── index.js
  
```
**CreatePetEntry.test.js**
- Handles input changes for Create Pet Entry.
- Calls `createNewPet` on button click with correct data.
- Does not call `createNewPet` if required fields are not filled.

**EditPetEntry.test.js**
- Handles input changes for Edit Pet Entry.
- Calls `updatePet` on button click with correct data.
- Should not have the same values as the initial mock repo after editing.

### Integration Tests
The integration test files in this project are stored in the `backend/tests` folder:
```
backend/
├── config/
├── public/
├── src/
├── tests/
│   ├── pet.test.js
│   └── setupStrapi.js
├── .editorconfig
├── .env.example
├── .eslintignore
├── .eslintrc
├── .gitignore
├── README.md
├── babel.config.js
├── favicon.ico
├── integration-testing-step.txt  # A guide for setting up and performing integration testing 
├── jest.config.js
├── package-lock.json
├── package.json
└── yarn.lock
```
**Pet.test.js**
- **Create a New Pet Entry**: Tests POST `/api/pets` to create a new entry and checks the created data.
- **Update a Pet Entry**: Tests PUT `/api/pets/:id` to update an existing pet’s data.
- **Retrieve All Pets**: Tests GET `/api/pets` to retrieve all pet entries.
- **Handle Missing Fields**: Tests POST `/api/pets` with missing data to check for error handling.
- **Retrieve a Pet by ID**: Tests GET `/api/pets/:id` to fetch a specific pet.
- **Delete a Pet Entry**: Tests DELETE `/api/pets/:id` to ensure a pet entry is deleted properly.
- **Handle Non-Existing Pet Requests**: Checks PUT and GET requests for non-existing pet IDs, ensuring proper error responses.

### CI Configuration

The `test-suite.yml` file used for GitHub Actions CI is stored in `.github/workflows`:
- This file is configured to handle CI for our testing pipeline.
```
.github/
└── workflows/
    ├── github-actions-demo.yml
    └── test-suite.yml
```

## Test Coverage

- **Unit Testing**: Focuses on individual functions or modules to confirm they work as expected in isolation. Each unit is tested with a range of inputs to ensure reliable and consistent behavior, catching issues early in development.

```
PASS  src/__test__/CreatePetEntry.test.js (12.769 s)
  ● Console
    console.log
      Submitting data:  {"data":{"name":"Buddy","animal":"Dog","breed":"Golden Retriever","age":"3","location":"Bangkok","sex":"Male"}}
      at handleCreateNewPet (src/components/CreatePetEntry.js:58:17)
    console.log
      All fields are required.
      at handleCreateNewPet (src/components/CreatePetEntry.js:42:21)

 PASS  src/__test__/EditPetEntry.test.js (13.49 s)
 -------------------|---------|----------|---------|---------|-------------------
 File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
 -------------------|---------|----------|---------|---------|-------------------
 All files          |   97.67 |      100 |   94.44 |   97.67 |                   
  BottomNav.js      |      75 |      100 |      50 |      75 | 20                
  CreatePetEntry.js |     100 |      100 |     100 |     100 |                   
  EditPetEntry.js   |     100 |      100 |     100 |     100 |                   
 -------------------|---------|----------|---------|---------|-------------------

 Test Suites: 2 passed, 2 total
 Tests:       8 passed, 8 total
 Snapshots:   0 total
 Time:        14.75 s
```

- **Integration Testing**: Verifies that different parts of the API interact correctly. By testing how modules work together, integration testing ensures data flows smoothly between components, identifying issues that may appear when components are combined.

```
PASS  tests/pet.test.js (7.835 s)
  Pet API
    ✓ should create a new pet entry (88 ms)
    ✓ should update an existing pet entry (44 ms)
    ✓ should retrieve all pets (13 ms)
    ✓ should handle missing required fields (10 ms)
    ✓ should handle updating non-existing pet (12 ms)
    ✓ should retrieve a pet by ID (12 ms)
    ✓ should delete a pet entry (31 ms)
    ✓ should handle retrieving a non-existing pet by ID (13 ms)

 -------------------------|---------|----------|---------|---------|-------------------
 File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
 -------------------------|---------|----------|---------|---------|-------------------
 All files                |     100 |      100 |     100 |     100 |                   
  config                  |     100 |      100 |     100 |     100 |                   
   admin.js               |     100 |      100 |     100 |     100 |                   
   api.js                 |     100 |      100 |     100 |     100 |                   
   database.js            |     100 |      100 |     100 |     100 |                   
   middlewares.js         |     100 |      100 |     100 |     100 |                   
   server.js              |     100 |      100 |     100 |     100 |                   
  src                     |     100 |      100 |     100 |     100 |                   
   index.js               |     100 |      100 |     100 |     100 |                   
  src/api/pet/controllers |     100 |      100 |     100 |     100 |                   
   pet.js                 |     100 |      100 |     100 |     100 |                   
  src/api/pet/routes      |     100 |      100 |     100 |     100 |                   
   pet.js                 |     100 |      100 |     100 |     100 |                   
  src/api/pet/services    |     100 |      100 |     100 |     100 |                   
   pet.js                 |     100 |      100 |     100 |     100 |                   
 -------------------------|---------|----------|---------|---------|-------------------
 Test Suites: 1 passed, 1 total
 Tests:       8 passed, 8 total
 Snapshots:   0 total
 Time:        7.96 s
```
- **Continuous Integration**
  As part of our CI setup, every push or pull request automatically triggers the test suite using GitHub Actions (configured in `.github/workflows/test-suite.yml`). This CI process runs both unit and integration tests across multiple environments, providing:
	- **Immediate Feedback**: Notifications alert us to any failed tests, enabling quick fixes and reducing the risk of breaking changes.
	- **Cross-Platform Compatibility**: The CI pipeline runs tests on different operating systems (e.g., `macOS`, `Ubuntu`, `Windows`) and Node.js versions, ensuring consistent performance across environments.
 ![Screenshot 2024-11-01 000330](https://github.com/user-attachments/assets/639fe6aa-ac1a-4350-965f-25d0362fd518)

 
## Viewing Test Results 

You can view test results both in the CI pipeline on GitHub and locally in your terminal. by following this steps:

### 1. Viewing Test Results in GitHub Actions
   - **Go to the Repository on GitHub**:
     - Navigate to your project repository where the CI pipeline is set up.
   - **Access the “Actions” Tab**:
     - In this tab, you’ll see all triggered workflows, such as those from pushes or pull requests.
     - The latest workflow appears at the top with statuses like ✔️ success, ❌ failure, or ⏳ in progress.
   - **Select the Workflow**:
     - Click on the workflow to see its details. This opens a page showing each job created from the `test-suite.yml` file (e.g., build).
   - **View the Job Log**:
     - Click on the job (e.g., build) to check logs for each step.
     - Logs show details for steps like dependency installation, test execution, and any errors or failures.
   - **Notifications and Test Reports**:
     - If a test fails, GitHub Actions provides error details, showing which assertions did not pass.
    ![Screenshot 2024-11-01 003733](https://github.com/user-attachments/assets/c72dbf9e-3b75-42af-a8f0-d2862a48eb4c)


### 2. Viewing Test Results in Terminal (Local Testing)
   - **Run Tests Locally**:
     - Run tests with the command:
```bash
#unit test
npm test
```

```bash
#integration test
cd backend/
npm test
```

     - Results will appear in the terminal in real-time.

   - **Test Results**:
     - The terminal shows detailed results, including:
       - Number of tests passed and failed
       - Time taken per test
       - Error details for any failed assertions
         
   - **Summary**:
     - At the end, the terminal provides a summary, such as `Tests: 10 passed, 2 failed`, giving an overview of the test outcomes.
![Screenshot 2024-11-01 002436](https://github.com/user-attachments/assets/92a88b19-0fe7-46a4-80f8-a794b0e43118)
![Screenshot 2024-11-01 002814](https://github.com/user-attachments/assets/1c0f2e3b-a6b2-4acb-8d12-20857bda9f90)

## Adding New Tests

Add new test files within the `src/__test__` or `backend/tests/` directory, following these steps:

1. **Create Test Files**:
   - For **unit tests**, add files under `src/__test__/`.
   - For **integration tests**, place files under `backend/tests/`.
   - Each test file should follow a naming convention that reflects its purpose. For example:
     - `AAA.test.js` for unit tests.
     - `BBB.test.js` for integration tests.

2. **Write Test Cases**:
   - Define test cases that validate specific functions, components, or API endpoints.
    - Use Jest’s `describe` and `it` functions to organize tests for unit testing.
   - For integration tests with Supertest.

3. **Run Tests Locally**:
   - Ensure that new tests pass locally by running:
     
```bash
#unit test
yarn
npm test
```
```bash
#integration test
cd backend/
yarn
npm test
```

4. **Commit and Push**:
   - After validating new tests locally, select the branch associated with the new test (e.g., `sprint2-unit-test`).
   - Commit and push the code to trigger CI tests in GitHub Actions. This will run the test suite across different environments, reinforcing compatibility and quality.
 
5. **Review Test Results**:
   - Monitor the GitHub Actions workflow to confirm that all tests pass.
  
6. **Merge to Main Branch**:
   - After ensuring that all tests pass successfully, you can merge your branch into the main branch.

## CI/CD Pipeline Overview

This project integrates a **Continuous Integration (CI)** and **Continuous Deployment (CD)** pipeline to automate the testing, building, and deployment processes. This ensures consistent quality, fast feedback, and efficient delivery of features and bug fixes.

### CI/CD Pipeline Structure

#### 1. Continuous Integration (CI)
The CI pipeline runs every time code is pushed to the repository or a pull request is made. The key components include:

- **Automated Testing**:
  - **Unit Tests**: The pipeline runs all the automated unit tests using Jest to ensure no breaking changes are introduced.
  - **Integration Tests**: Ensures that the various parts of the application interact correctly.

- **Build Verification**:
  - The application is built for different environments (e.g., development, production) to ensure that there are no build issues. It checks that the application works across different versions of Node.js.

#### 2. Continuous Deployment (CD)
Once the CI pipeline successfully completes, the CD pipeline is responsible for deploying the application to different environments, ensuring the latest version is live without manual intervention. The key components include:

- **Staging Deployment**: Automatically deploys to a staging environment to validate the latest changes in a live setting.
- **Production Deployment**: After successful tests in staging, the application is deployed to the production environment.
- **Environment Variables**: Deployment steps use environment variables for configuration (e.g., API keys, database URLs) to keep sensitive information secure.

### Workflow Configuration

The CI/CD workflows are defined as YAML files within the .github/workflows directory. These workflows define each of the jobs, such as testing, building, and deploying, and specify when and how they should be triggered.

The key workflows in this project include:

- **Test Workflow**: test-suite.yml  
  - Purpose: Executes unit and integration tests on every push or pull request.
  - Trigger Conditions: A push is made to any branch and pull request is created or updated.
  - Steps:
	1. Checkout repository code.
	2. Install dependencies with Yarn.
	3. Run all tests using Jest and log results.

-  **CI Docker Workflow**: ci-docker.yml  
  - Purpose: Builds and tests Docker containers to ensure consistency across environments.
  - Trigger Conditions: A push is made to any branch and pull request is created or updated.
  - Steps:
	1. Build Docker images for the backend and frontend.
	2. Log in to DockerHub and push the images tagged as latest.
	3. Run all tests using Jest and log results.

- **Deployment Workflow**: cd.yml  
  - Purpose: Deploys the application to staging and production environments.
  - Trigger A push is made to any branch and Manually triggered via workflow_dispatch.
  - Steps:
	1. Verify availability of Docker images on DockerHub.
	2. Configure AWS credentials using GitHub Secrets.
	3. reate an EC2 instance and deploy the application.
  	4. Expose the backend and frontend services

### Triggering the CI/CD Pipeline

#### 1. Automatic Triggers
- **Push to Branch**: The pipeline is triggered when changes are pushed to any branch, especially the main branch.
- **Pull Requests**: Whenever a pull request is created or updated, the CI pipeline will run to ensure the new code does not break existing functionality.

#### 2. Manual Trigger
- **GitHub Actions**: You can also manually trigger the workflow from the GitHub interface. Navigate to the "Actions" tab, select the desired workflow, and click "Run workflow" to trigger the process.

### Environment Variables and Secrets
Environment variables and secrets such as database connection strings, API keys, and other sensitive data are stored securely in GitHub's Secrets and are accessed within the workflows using ${{ secrets.SECRET_NAME }}

## How Secrets Are Stored in GitHub
1. Navigate to the Settings tab of your repository.
2. Select Secrets and variables > Actions from the side menu.
3. Click New repository secret to add a new secret.
4. Enter the name of the secret (e.g., DOCKER_USERNAME) and its value.
5. Save the secret.

### Monitoring and Logs
- **Pipeline Logs**: Each step of the pipeline generates logs that can be accessed in the GitHub Actions interface. If any step fails, these logs can be examined to identify the issue.
  
- **Notifications**: You can set up GitHub notifications or integrate with Slack or email to notify the team when a build fails or succeeds.
