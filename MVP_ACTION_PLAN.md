# Revenge Money Academy: MVP Action Plan

This document outlines the critical next steps to transform the Revenge Money Academy prototype into a launch-ready Minimum Viable Product (MVP).

## Phase 1: Establish the Database Foundation (COMPLETED)

**Goal:** Decouple the application from static, hardcoded data by migrating to Firestore. This is a prerequisite for all subsequent features.

### Task List
- [x] **1.1: Set Up Firestore**
  - [x] In the existing Firebase project, enable and configure the Firestore database.
  - [x] Set initial security rules to "test mode" for development ease.
- [x] **1.3: Create a `users` Collection**
  - [x] Create a new `users` collection in Firestore.
  - [x] Modify the signup logic: when a new user registers, create a corresponding document in the `users` collection with the user's `uid` as the document ID.
  - [x] The new user document should contain `email`, `displayName`, and an empty array named `purchasedCourses`.
- [x] **1.4: Refactor Data Fetching**
  - [x] Modify the `/courses` page to fetch all documents from the Firestore `courses` collection instead of importing from `data.ts`.
  - [x] Modify the `/courses/[id]` page to fetch a single course document from Firestore based on the URL parameter.
  - [x] Modify the `/account` page to fetch the user's data from the `users` collection to display their profile and purchased course history.

---

## Phase 2: Implement Payment Gateway (COMPLETED)

**Goal:** Integrate the **IntaSend** payment processor to allow users to purchase courses.

### Task List
- [x] **2.1: Configure IntaSend**
  - [x] Sign up for an IntaSend developer account.
  - [x] Retrieve API keys (publishable and secret).
  - [x] Store these keys securely in `.env.local` (e.g., `NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY`, `INTASEND_SECRET_KEY`).
- [x] **2.2: Create a Checkout API Route**
  - [x] Create a new API Route at `src/app/api/checkout/route.ts`.
  - [x] This server-side route should accept a `courseId` and `userId` in the POST request body.
  - [x] Use the IntaSend server-side SDK to create a payment session.
  - [x] Return the checkout session details to the client.
- [x] **2.3: Update Frontend Purchase Flow**
  - [x] In the `PurchaseModal` component, add a function to handle the "Purchase" button click.
  - [x] This function should make a POST request to `/api/checkout` with the necessary data.
  - [x] On a successful response, redirect the user to the IntaSend checkout page.
- [x] **2.4: Implement a Payment Confirmation Webhook**
  - [x] Create a new API Route at `src/app/api/webhooks/intasend/route.ts` to receive events from IntaSend.
  - [x] Implement security by verifying the webhook signature in the request header.
  - [x] Write logic to handle the `payment.succeeded` event.
  - [x] Inside the handler, extract the `userId` and `courseId` from the event metadata.
  - [x] Update the corresponding user's document in the Firestore `users` collection by adding the `courseId` to their `purchasedCourses` array.

---

## Phase 3: Build Secure Content Delivery

**Goal:** Ensure only paying customers can access course video content, using Supabase Storage for secure video hosting.

### Task List
- [ ] **3.1: Set Up Supabase Storage**
  - [ ] Create a new Supabase project.
  - [ ] Create a new private storage bucket (e.g., `course-videos`).
  - [ ] Upload course video assets to the bucket.
- [ ] **3.2: Implement Access Control on Learning Page**
  - [ ] On the `/learn/[id]` page, implement server-side logic before rendering.
  - [ ] Get the current user's session. Redirect to `/login` if no user is logged in.
  - [ ] Fetch the user's document from the Firestore `users` collection.
  - [ ] Check if the `id` from the URL exists in the user's `purchasedCourses` array.
  - [ ] If the user does not own the course, redirect them to the `/courses` page with an "access denied" notification.
- [ ] **3.3: Securely Serve Video Content**
  - [ ] If the access check passes, use the Supabase Admin SDK on the server-side to generate a secure, time-limited signed URL for the video file.
  - [ ] Pass this signed URL as a prop to the `VideoPlayer` component.
  - [ ] Update the `VideoPlayer` component to accept and use the `src` prop for the video source.

---

## Phase 4: Create an Admin Content Management System (CMS)

**Goal:** Build a protected area for administrators to manage courses through a UI, without needing to write or deploy code.

### Task List
- [ ] **4.1: Implement Role-Based Access Control (RBAC)**
  - [ ] Add a `role` field to the user document model in Firestore (e.g., `role: 'user'` or `role: 'admin'`).
  - [ ] Manually update your own user document in Firestore to have `role: 'admin'`.
  - [ ] Update `middleware.ts` to protect all routes under `/admin/*`. The middleware should check if the logged-in user has the `admin` role.
- [ ] **4.2: Build Admin Dashboard UI**
  - [ ] Create a new route group `src/app/(admin)/admin/...`.
  - [ ] Create a dashboard page at `/admin/courses` that fetches and displays all courses from Firestore in a table.
  - [ ] Add "Edit" and "Delete" buttons to each row in the table.
- [ ] **4.3: Implement Course Management Forms**
  - [ ] Create a page at `/admin/courses/new` with a form for adding a new course. The form submission will create a new document in the Firestore `courses` collection.
  - [ ] Create a dynamic page at `/admin/courses/[id]/edit` with a form for editing a course. It should pre-fill with the course's current data and update the Firestore document on submission.
- [ ] **4.4: Implement Delete Functionality**
  - [ ] The "Delete" button in the admin table should trigger a server action or API call that removes the corresponding course document from Firestore.
  - [ ] Add a confirmation dialog (`AlertDialog`) before deleting to prevent accidental removal.
