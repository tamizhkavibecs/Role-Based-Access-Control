### Role-Based Access Control System

This is a role-based access control system built using React.js, React-Bootstrap, and JSON Server for the mock API. It allows different levels of access for three user roles: Admin, Teacher, and Student. The system is designed for managing teacher and student information securely and efficiently.

---

Features

### Roles and Permissions

1. Admin:
   o View, create, edit, and delete teacher and student details.
2. Teacher:
   o View, create, edit, and delete student details.

### Technologies Used

• React.js: Frontend framework for building the UI.
• React-Bootstrap: For styling and modals.
• React-Router-Dom: For routing between pages.
• Axios: For making API calls.
• JSON Server: Mock API for testing CRUD operations.

### Key Functionalities

• Role-Based Access Control: Dynamically controls user access based on roles.
• CRUD Operations:
o Admin: Manage both teachers and students.
o Teacher: Manage students only.
• Responsive Design: Adaptable UI for various screen sizes.
• Validation: Ensures data input accuracy for forms.
• User-Friendly Interface: Simplified navigation and modals for better UX.

---

### Installation and Execution

### Prerequisites

• Node.js installed on your system.
• A code editor like VS Code.
• Basic understanding of React.js.

### Step-by-Step Procedure

## 1. Clone the Repository

git clone https://github.com/rbac-ui/role-based-access-control.git
cd role-based-access-control

## 2. Install Dependencies Install required npm packages for the React application:

npm install

## 3. Set Up JSON Server Install JSON Server globally (if not already installed):

### npm install -g json-server

Start the JSON Server for mock API:

### json-server --watch db.json --port 3000

Ensure db.json is present in the project root with the following structure:
json
{
"users": [
{
"id": 1,
"username": "admin",
"password": "admin123",
"role": "admin"
},
{
"id": 2,
"username": "teacher",
"password": "teacher123",
"role": "teacher"
},
{
"id": 3,
"username": "student",
"password": "student123",
"role": "student"
}
],
"teachers": [],
"students": []
}

## 4. Start the React Application Run the React development server:

npm start

## This will start the application at http://localhost:3000. --> if this port not work ,try alternate port 3001

5. Log In as Different Users
   o Admin:
    Username: admin@example.com
    Password: admin123
   o Teacher:
    Username: teacher1@example.com
    Password: teacher123
6. Navigate the Application
   o Use the appropriate credentials to log in as Admin, Teacher, or Student.
   o Perform allowed actions (CRUD operations) based on your role.

---

Project Structure
Copy code
src/
├── components/
│ ├── Login.js # Handles user login
│ ├── Admin.js # Admin dashboard
│ ├── Teacher.js # Teacher dashboard
│ ├── Student.js # Student dashboard
│ └── RoleProtectedRoute.js # Protects routes based on user role
├── services/
├── App.js # Main app component
├── index.js # ReactDOM entry point
├── db.json # JSON Server mock data

---

Role-Based Routing
Routes are protected based on user roles using a custom RoleProtectedRoute component:
• Admin Dashboard: /admin
• Teacher Dashboard: /teacher
• Student Dashboard: /student

---

Contributing
Feel free to fork the repository, open issues, or submit pull requests to enhance this project.

---

License
This project is licensed under the MIT License. See the LICENSE file for details.

---

Contact
For queries or feedback, please contact:
• Email: tamizhkavibecs@gmail.com
• GitHub: GitHub-tamizhkavibecs
