# I-tree School

I-tree School is a simple role-based fee management MVP for **I-tree (Primary & Secondary)**.

The app has two types of users:

- **Admin**: manages class fees and monitors all registered students.
- **Student**: selects a class during signup, sees their fee, and records mock payments.

This is a frontend-only project. It has no real backend, database, payment gateway, or server authentication. All data is stored in the browser with `localStorage`.

## Features

### Public landing page

When nobody is logged in, `/` shows the I-tree landing page. It explains the product and links to:

- Sign in
- Student signup

### Admin workflow

The admin can:

- Set or update the fee for every class
- See the total expected fees
- See the total collected
- See the total outstanding
- See all registered students
- See each student's class, required fee, amount paid, and status
- Print a receipt for a student's latest payment

The admin dashboard is available at `/admin`.

### Student workflow

A student can:

- Create an account
- Select one class during signup
- Sign in later
- See their name and class
- See the required fee for their class
- See the amount they have paid
- See their outstanding balance
- Make a mock payment
- See their payment history
- Print a receipt for any recorded payment

The student dashboard is available at `/student`.

## Login details

### Admin account

The only pre-seeded admin account is:

```text
Email: admin@i-tree.ng
Password: admin123
```

After signing in, the admin is redirected to `/admin`.

### Student account

There is no pre-seeded student account. Students create their own account using **Create an account**.

Student signup requires:

- Full name
- Email
- Class
- Password
- Confirm password

After signup, the student is redirected to `/student`.

## Class list

The application uses this exact class list:

### Primary

- Nursery 1
- Nursery 2
- Primary 1
- Primary 2
- Primary 3
- Primary 4
- Primary 5
- Primary 6

### Secondary

- JSS1
- JSS2
- JSS3
- SS1
- SS2
- SS3

## Default class fees

The initial demo fees are generated in `src/data/seed.ts`:

- Primary classes: `₦85,000`
- Secondary classes: `₦120,000`

The admin can change these amounts from the admin dashboard. Updated fees are saved in `localStorage`.

## How totals are calculated

The admin dashboard uses one fee per class.

For each registered student:

```text
Required fee = fee assigned to the student's class
```

The dashboard totals are:

```text
Total Expected = sum of every registered student's required fee
Total Collected = sum of every payment
Outstanding = Total Expected - Total Collected
```

For an individual student:

```text
Outstanding balance = class fee - student's payments
```

The student dashboard prevents a mock payment from being greater than the current outstanding balance.

## Running the project

From the project directory:

```bash
cd C:\Users\owola\Desktop\Projecttt
npm install
npm run dev
```

Open the local Vite address, usually:

```text
http://localhost:5173
```

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Routes

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Landing page when logged out |
| `/signin` | Public | Admin or student sign in |
| `/signup` | Public | Student account creation |
| `/admin` | Admin only | Fee settings and registered student overview |
| `/student` | Student only | Personal fee and payment dashboard |

If a user opens the wrong dashboard for their role, the app redirects them to their own dashboard.

## Project structure

```text
Projecttt/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── components/
    │   ├── AdminDashboard.tsx
    │   ├── AppHeader.tsx
    │   ├── PaymentForm.tsx
    │   ├── ProtectedRoute.tsx
    │   └── StudentDashboard.tsx
    ├── context/
    │   └── AuthContext.tsx
    ├── data/
    │   └── seed.ts
    ├── hooks/
    │   └── useSchoolData.ts
    ├── pages/
    │   ├── Landing.tsx
    │   ├── SignIn.tsx
    │   └── SignUp.tsx
    ├── types/
    │   └── index.ts
    └── utils/
        ├── format.ts
        └── storage.ts
```

## How the main files fit together

### `src/main.tsx`

The React entry point. It renders `<App />` into the `root` element in `index.html`.

### `src/App.tsx`

Connects routing, authentication, and dashboards:

1. Starts the browser router.
2. Starts the auth provider.
3. Loads school data when a user is logged in.
4. Shows the landing, sign-in, signup, admin, or student screen.
5. Redirects users based on their role.

### `src/types/index.ts`

Contains the TypeScript data models:

- `User`
- `SchoolClass`
- `Student`
- `Payment`
- `SchoolData`

The `User` role is either `"admin"` or `"student"`.

### `src/data/seed.ts`

Contains:

- The exact class list
- The pre-seeded admin account
- The school name
- Default fees for every class

The initial school data has no students. Students are added when they sign up.

### `src/context/AuthContext.tsx`

Provides authentication functions to the rest of the app:

- `signIn(email, password)`
- `signUp(name, email, password, classId)`
- `logout()`
- `user`

When a student signs up, their role is automatically `"student"` and their selected class is stored on the account.

### `src/hooks/useSchoolData.ts`

Loads and updates school data:

- Loads the saved school data
- Creates default data when no data exists
- Converts registered student accounts into student records
- Saves class fee changes
- Saves mock payments
- Notifies open screens when data changes

### `src/components/AdminDashboard.tsx`

Renders the admin-only screen. It manages temporary fee input values and saves all class fee changes together when the admin clicks **Save**.

### `src/components/StudentDashboard.tsx`

Finds the logged-in student using the current user's ID, then calculates:

- Their class fee
- Their total payments
- Their remaining balance

It also renders the student's payment history.

### `src/components/PaymentForm.tsx`

Accepts formatted payment values such as:

```text
45,000
```

The commas are removed before the value is stored as a number. The form shows success and validation messages.

### `src/components/ProtectedRoute.tsx`

Protects role-specific routes:

- Unauthenticated users are sent to `/signin`.
- Admin users can access `/admin`.
- Student users can access `/student`.
- Users who try to access the wrong role's dashboard are redirected.

### `src/components/AppHeader.tsx`

Displays the I-tree School brand, the logged-in user's name and role, and the logout button.

### `src/utils/storage.ts`

Contains the browser storage functions. Keeping these functions together makes it easier to replace `localStorage` with a real API later.

### `src/utils/format.ts`

Contains formatting helpers for Nigerian Naira and readable dates.

## LocalStorage keys

The app currently uses:

| Key | Purpose |
|---|---|
| `itree_users` | All registered users, including students |
| `itree_current_user` | The current login session |
| `itree_school_data` | School name, classes, fees, students, and payments |

To reset the app during development:

1. Open browser developer tools with `F12`.
2. Open **Application** or **Storage**.
3. Open **Local Storage** for the local Vite site.
4. Delete the three `itree_` keys.
5. Refresh the browser.

The next login will start with the default class fees and no student records.

## Technology stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React
- Browser localStorage

## MVP limitations

This is intentionally a local MVP. It does not currently include:

- A real backend
- A database
- Secure password hashing
- Server-side authorization
- Cloud data synchronization
- Real payment processing
- Email or SMS notifications
- Multiple schools
- Multiple admin accounts

Passwords are stored as plain text in the browser for demonstration only. A production application must use secure backend authentication and password hashing.
