
# MVP Action Plan

This document outlines the development tasks for building the Revenge Money Academy MVP. I will be following this plan and updating it in real-time as I complete each task.

## Phase 1: Project Setup (Complete)

*   **Task 1.1: Initial commit.** I have made my first commit to the repository to get everything started.
*   **Task 1.2: Install additional dependencies.** I have installed `firebase`, `firebase-admin`, and `js-cookie`, which we will need for authentication and database interactions.

## Phase 2: Firebase Integration (Complete)

*   **Task 2.1: Set up Firebase client.** I have created a Firebase client and initialized it in your application. This will allow us to interact with Firebase services on the front-end.
*   **Task 2.2: Implement session-based authentication.** I have set up session-based authentication using a server-side route. This is a more secure method than client-side authentication.

## Phase 3: Building the Admin Dashboard (Complete)

*   **Task 3.1: Create a placeholder page for the admin dashboard.** I have created a simple page at `/admin/courses` that will serve as the foundation for our admin dashboard. It currently displays a simple "Manage Courses" message.
*   **Task 3.2: Create a placeholder page for adding new courses.** I have created a page at `/admin/courses/new` for adding new courses. It currently displays a simple "Add New Course" message.

## Phase 4: Middleware and Route Protection (Complete)

*   **Task 4.1: Implement middleware to protect the admin routes.** I have created a `middleware.ts` file that will protect all routes under `/admin`. Only users with the `admin` role will be able to access these routes.

## Phase 5: Default User Roles (Complete)

*   **Task 5.1: Assign a default role to new users.** I have modified the user creation process to assign a `role` of `user` to all new users by default. This will allow us to differentiate between regular users and administrators.

## Phase 6: Building the "Add New Course" Form (Complete)

*   **Task 6.1: Create the "Add New Course" form.** I have now built the form that will allow you to add new courses to the database. This is a client-side form that will eventually interact with a server-side action to save the course data.
*   **Task 6.2: Create a server-side action to save the new course.** I have created a server-side action that will take the form data and save it to the Firestore database. This will ensure that the course data is saved securely.
*   **Task 6.3: Implement the client-side logic to call the server-side action.** I have connected the "Add New Course" form to the server-side action so that when you submit the form, the new course is saved to the database.

## Phase 7: Displaying Courses on the Admin Dashboard (Complete)

*   **Task 7.1: Fetch and display the list of courses.** I have now fetched the list of courses from the Firestore database and displayed them on the admin dashboard at `/admin/courses`.
*   **Task 7.2: Add a link to the "Add New Course" page.** I have added a button to the admin dashboard that will link to the `/admin/courses/new` page, making it easy to add new courses.

## Phase 8: Displaying Courses on the Public-Facing Site

*   **Task 8.1: Fetch and display the list of courses.** I will now fetch the list of courses from the Firestore database and display them on the public-facing site at `/courses`.
*   **Task 8.2: Create a course details page.** I will create a dynamic page that displays the full details of a single course when a user clicks on it from the main `/courses` page.

