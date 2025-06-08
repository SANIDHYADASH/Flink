# Flink - File and Text Sharing App

Flink is a modern, secure, and responsive web application for sharing files and text snippets with others using a simple 6-digit sharing code. Built with React, TypeScript, and Tailwind CSS, Flink provides a seamless experience for uploading, sharing, and managing your files and texts.

---

## Features

- **User Authentication**
  - Register and login with email and password.
  - Secure authentication flow with protected routes.
  - User metadata and session management.
- **Dashboard**
  - View all your shared files and texts in a responsive table or card layout.
  - Search, filter, and manage your shares.
  - Edit or delete any share.
  - See sharing code, expiry, and status for each share.
  - Real-time updates when shares are modified.
- **Share Files and Texts**
  - Upload files or share text snippets.
  - Optional title for each share.
  - Generate a unique 6-digit numeric sharing code for each share.
  - Set expiry (Never, 1 day, 7 days, 30 days, etc.) with "Never Expire" as default.
  - Password protection for shares (with proper hashing).
- **Responsive UI**
  - Fully responsive design for desktop and mobile.
  - Table view on desktop, card view on mobile.
- **Share Details Modal**
  - Click any share to view all details in a modal.
- **Edit and Prefill**
  - Edit any share with prefilled data in the form.
- **Delete Shares**
  - Delete any file or text share with confirmation.
  - Automatic cleanup of files in storage.
- **Security**
  - Only authenticated users can access dashboard and sharing features.
  - Row Level Security (RLS) policies for database and storage.
- **Supabase Integration**
  - Database-backed share storage.
  - File uploads to Supabase Storage buckets.
  - Public file access with proper permissions.
  - Real-time data synchronization.

---

## Data Model

A share (file or text) has the following structure:

```typescript
type Share = {
  id: string;
  type: 'file' | 'text';
  title?: string;
  name?: string; // file name or text title
  fileType?: string; // for files
  content?: string; // for texts
  code: string; // 6-digit sharing code
  accessCode?: string; // alternative code
  createdAt: string;
  expiry?: string; // ISO date string or 'never'
  expiresAt?: string; // ISO date string (preferred for expiry)
  passwordHash?: string; // if password protected
  storagePath?: string; // for files
  userId: string;
  status: 'ACTIVE' | 'REQUEST' | 'REFUSED';
  // ...other fields as needed
};
```

---

## Application Logic

- **Authentication:** Uses Supabase Auth for secure login, registration, and session management.
- **Sharing:** When a user shares a file or text, a unique 6-digit code is generated and stored with the share in the Supabase database.
- **Expiry:** Users can select expiry for each share. "Never Expire" is the default and is always available in the dropdown.
- **Editing:** When editing, the form is prefilled with the existing share data.
- **Listing:** Shares are listed in a table (desktop) or cards (mobile), showing all relevant details.
- **Details Modal:** Clicking a row/card opens a modal with all share details.
- **Delete:** Users can delete any share with confirmation. Files are automatically deleted from storage.
- **Password Protection:** Shares can be protected with a password, which is hashed before storing.
- **Real-time Updates:** Shares update in real-time using Supabase subscriptions.

---

## Supabase Integration

### 🔧 Key Changes Made

1. **Supabase Setup**
   - Added `@supabase/supabase-js` dependency.
   - Created Supabase client configuration.
   - Added TypeScript types for database schema.
   - Created `.env.example` for environment variables.

2. **Database Schema**
   - `shares` table with all necessary fields:
     - User authentication integration.
     - File metadata (type, size, MIME type).
     - Access codes and password hashing.
     - Expiration dates and download tracking.
     - File storage paths.

3. **Storage Integration**
   - Storage bucket for file uploads.
   - Row Level Security (RLS) policies.
   - Public file access with proper permissions.
   - Automatic file cleanup on share deletion.

4. **Authentication System**
   - Replaced localStorage auth with Supabase Auth.
   - Email/password authentication.
   - User metadata support.
   - Session management.
   - Proper error handling.

5. **Share Management**
   - Database-backed share storage.
   - File uploads to Supabase Storage.
   - Password hashing with crypto-js.
   - Real-time data synchronization.
   - Proper error handling and loading states.

---

## 🚀 Next Steps

1. **Set up Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy your project URL and anon key

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials

3. **Run database migrations:**
   - The SQL files in `supabase/migrations/` need to be executed in your Supabase dashboard

4. **Connect to Supabase:**
   - Click "Connect to Supabase" button in the top right to set up your Supabase connection (if provided in the UI)

---

## ✨ Features Now Available

- Secure Authentication with Supabase Auth
- File Storage in Supabase Storage buckets
- Database Persistence for all shares
- Password Protection with proper hashing
- Real-time Updates when shares are modified
- Automatic Cleanup when shares are deleted
- Scalable Architecture ready for production

The application now uses a proper backend infrastructure while maintaining all the existing functionality. Users can securely share files and text with 6-digit codes, password protection, and expiration dates!

---

## Project Structure

```text
src/
  components/
    Dashboard/
      ShareFileForm.tsx
      ShareTextForm.tsx
  contexts/
    AuthContext.tsx
    ShareContext.tsx
  pages/
    DashboardPage.tsx
    LoginPage.tsx
    RegisterPage.tsx
  supabase/
    client.ts
    migrations/
      001_create_shares_table.sql
      ...
  App.tsx
  index.tsx
  ...
public/
  index.html
.env.example
README.md
...
```

---

## Setup & Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/flink-file-text-sharing.git
cd flink-file-text-sharing
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Copy `.env.example` to `.env` and add your Supabase credentials:

```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run Database Migrations

- Go to your Supabase dashboard.
- Execute the SQL files in `supabase/migrations/` to set up the schema.

### 5. Start the Development Server

```bash
npm start
# or
yarn start
```

The app will be available at `http://localhost:3000`.

---

## Deployment

You can deploy this app to any static hosting (Vercel, Netlify, Firebase Hosting, etc.):

```bash
npm run build
# or
yarn build
```

Upload the contents of the `build/` directory to your hosting provider.

---

## Usage

1. **Register** for a new account.
2. **Login** to your dashboard.
3. **Share a file or text** using the "+ ADD NEW" button.
4. **Set a title** (optional), select expiry (default is "Never Expire"), and submit.
5. **Copy the 6-digit sharing code** to share with others.
6. **Edit or delete** any share from your dashboard.
7. **Click any share** to view its details in a modal.

---

## Customization

- **Add more expiry options** in the forms as needed.
- **Integrate with your backend** by updating the context providers.
- **Customize UI** by editing Tailwind classes or component structure.

---

## Technologies Used

- React + TypeScript
- Tailwind CSS
- Supabase (Database, Auth, Storage)
- React Router
- Context API for state management
- Lucide React Icons
- crypto-js (for password hashing)

---

## Contribution

Feel free to fork, open issues, or submit pull requests!

---

## License

MIT License

---

## Screenshots

> Add screenshots/gifs here for dashboard, sharing, mobile view, etc.

---

## Contact

For questions or support, open an issue or contact the maintainer.

---
