# USER VISUAL JOURNEY AND EXPERIENCE

This document provides a comprehensive overview of the frontend structure, user flow, and component architecture of the Revenge Money Academy application. Its purpose is to serve as a guide for understanding the current user experience and to identify areas for improvement.

## 1. Global Layout & Structure

The entire application is wrapped in a global layout defined in `src/app/layout.tsx`.

*   **File:** `src/app/layout.tsx`
*   **Purpose:** Provides the basic HTML structure, including `<html>` and `<body>` tags, and wraps all pages with common elements.
*   **Key Elements:**
    *   **`AuthProvider`:** Wraps the entire application, providing authentication context to all components. This is likely where the user's login state is managed.
    *   **`Header`:** A global header component is present on all pages.
    *   **`Footer`:** A global footer component is present on all pages.
    *   **`Toaster`:** A component for displaying toast notifications.
    *   **Styling:** Uses Tailwind CSS for styling, with a custom font (`font-body`) and a background color (`bg-background`).

## 2. Public-Facing Pages

These are the pages that are accessible to all users, whether they are logged in or not.

### 2.1. Home Page

*   **File:** `src/app/page.tsx`
*   **Route:** `/`
*   **Purpose:** The main landing page of the application. It's designed to attract users and showcase the academy's offerings.
*   **Components:**
    *   **`Header`:** The global header.
    *   **`HeroCarousel`:** A carousel of images at the top of the page, likely to showcase featured content or promotions.
    *   **`GoodLuckButton`:** An engagement gimmick. With every click, the number rises and a small notification pops up on screen, cycling between 10 wholesome messages.
    *   **`HomeCourseCard`:** Displays a list of featured courses in a 2x4 grid layout.
*   **Data:** Fetches a list of all courses using `getAllCourses()` and displays the first six as "featured."
*   **User Flow:**
    1.  The user lands on the home page.
    2.  They see a hero carousel, a "Good Luck" button, and a list of featured courses.
    3.  They can click on a course card to navigate to the course details page.
    4.  They can click the menu icon in the header to navigate to other parts of the site.

### 2.2. Courses Page

*   **File:** `src/app/courses/page.tsx`
*   **Route:** `/courses`
*   **Purpose:** Displays a list of all available courses.
*   **Components:**
    *   **`CourseCard`:** A card component to display individual course information.
*   **Data:** Fetches all courses from the database.
*   **User Flow:**
    1.  The user navigates to the `/courses` page.
    2.  They see a grid of all available courses.
    3.  They can click on a course card to navigate to the course details page.

### 2.3. Course Details Page

*   **File:** `src/app/courses/[id]/page.tsx`
*   **Route:** `/courses/[id]`
*   **Purpose:** Displays the details of a single course, including its description, price, and a purchase button.
*   **Components:**
    *   **`MediaCarousel`:** A robust media component that houses both the course thumbnail (image) and the video teaser in a single container. Users can swipe or click to switch between them. The video player includes custom thumbnails, standard controls (play/pause, volume, scrub bar, fullscreen), and a replay button.
    *   **`Button`:** A "Purchase Course" button.
    *   **`Alert`:** Displays a success message if the user has just purchased the course.
*   **Data:** Fetches the details of a single course using `getCourse(params.id)`.
*   **User Flow (Integrated Checkout):**
    1.  The user clicks the "Purchase Course" button.
    2.  They are navigated to a dedicated checkout page that combines payment details with account creation fields (Name, Email, Password).
    3.  Upon clicking "Complete Purchase," the payment is processed, and a user account is created simultaneously.
    4.  The user is redirected to a success page (`/purchase-success/[course-id]`) confirming both the purchase and account creation.
    5.  A prominent "Start Learning Now" button on the success page links them directly to `/learn/[id]`.

## 3. Authentication

The authentication flow is now secondary, primarily for returning users. New user creation is integrated into the checkout process.

### 3.1. Login Page

*   **File:** `src/app/(auth)/login/page.tsx`
*   **Route:** `/login`
*   **Purpose:** Allows returning users to log in to their accounts.
*   **User Flow:**
    1.  A returning user navigates to the `/login` page.
    2.  They enter their credentials and submit the form.
    3.  Upon successful login, they are redirected to their account page or the home page.

### 3.2. Signup Page

*   **File:** `src/app/(auth)/signup/page.tsx`
*   **Route:** `/signup`
*   **Purpose:** Allows new users to create an account, although the primary signup path is through purchasing a course.
*   **User Flow:**
    1.  A user navigates to the `/signup` page.
    2.  They fill out the registration form.
    3.  Upon successful registration, they are logged in and redirected to their account page or the home page.

## 4. User Account Pages

These pages are for logged-in users to manage their account and access their purchased content.

### 4.1. Account Page

*   **File:** `src/app/account/page.tsx`
*   **Route:** `/account`
*   **Purpose:** The main dashboard for logged-in users.
*   **User Flow:**
    1.  The user logs in and is redirected to their account page.
    2.  They can see an overview of their account, including their purchased courses.

### 4.2. Settings Page

*   **File:** `src/app/account/settings/page.tsx`
*   **Route:** `/account/settings`
*   **Purpose:** Allows users to manage their account settings, such as their password and profile information.
*   **User Flow:**
    1.  The user navigates to the settings page from their account dashboard.
    2.  They can update their information and save the changes.

### 4.3. Learn Page

*   **File:** `src/app/learn/[id]/page.tsx`
*   **Route:** `/learn/[id]`
*   **Purpose:** The page where a user can view the content of a course they have purchased.
*   **User Flow:**
    1.  The user navigates to this page from their account or after a successful purchase.
    2.  They can view the course materials, such as videos and text.

## 5. Admin Pages

These pages are for administrators to manage the application's content.

### 5.1. Admin Courses Page

*   **File:** `src/app/(admin)/admin/courses/page.tsx`
*   **Route:** `/admin/courses`
*   **Purpose:** Displays a table of all courses, allowing administrators to manage them.
*   **Components:**
    *   **`courses-table.tsx`:** A component that displays the courses in a table with "Edit" and "Delete" actions.
*   **User Flow:**
    1.  An administrator logs in and navigates to the admin courses page.
    2.  They can view, edit, and delete courses.
    3.  A prominent "Add New Course" button links to `/admin/courses/new`.

### 5.2. New Course Page

*   **File:** `src/app/(admin)/admin/courses/new/page.tsx`
*   **Route:** `/admin/courses/new`
*   **Purpose:** Allows administrators to create a new course.
*   **User Flow:**
    1.  An administrator clicks the "New Course" button on the admin courses page.
    2.  They fill out the form to create a new course, including fields for uploading the course thumbnail, video teaser, and the video's custom thumbnail.

### 5.3. Edit Course Page

*   **File:** `src/app/(admin)/admin/courses/[id]/edit/page.tsx`
*   **Route:** `/admin/courses/[id]/edit`
*   **Purpose:** Allows administrators to edit an existing course.
*   **User Flow:**
    1.  An administrator clicks the "Edit" button for a course on the admin courses page.
    2.  They can modify the course details and upload/change the course thumbnail, video teaser, and video thumbnail.

## 6. Key Components

*   **`Header`:** The global header.
*   **`Footer`:** The global footer.
*   **`CourseCard`:** A card component for displaying course information in a list.
*   **`HomeCourseCard`:** A variation of the course card for the home page, with a different layout and hover animation.
*   **`HeroCarousel`:** A carousel of images.
*   **`GoodLuckButton`:** A button that increments a counter and shows wholesome messages.
*   **`MediaCarousel`:** A component for displaying a course's image and video teaser.
*   **`courses-table.tsx`:** A table for displaying and managing courses in the admin section.
