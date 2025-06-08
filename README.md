# Flink - File and Text Sharing App

Flink is a modern, secure, and responsive web application for sharing files and text snippets with others using a simple 6-digit sharing code. Built with React, TypeScript, and Tailwind CSS, Flink provides a seamless experience for uploading, sharing, and managing your files and texts.

---

## Features

- **User Authentication**
  - Register and login with email and password.
  - Secure authentication flow with protected routes.
- **Dashboard**
  - View all your shared files and texts in a responsive table or card layout.
  - Search, filter, and manage your shares.
  - Edit or delete any share.
  - See sharing code, expiry, and status for each share.
- **Share Files and Texts**
  - Upload files or share text snippets.
  - Optional title for each share.
  - Generate a unique 6-digit numeric sharing code for each share.
  - Set expiry (Never, 1 day, 7 days, 30 days, etc.) with "Never Expire" as default.
- **Responsive UI**
  - Fully responsive design for desktop and mobile.
  - Table view on desktop, card view on mobile.
- **Share Details Modal**
  - Click any share to view all details in a modal.
- **Edit and Prefill**
  - Edit any share with prefilled data in the form.
- **Delete Shares**
  - Delete any file or text share with confirmation.
- **Security**
  - Only authenticated users can access dashboard and sharing features.

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
  status: 'ACTIVE' | 'REQUEST' | 'REFUSED';
  // ...other fields as needed
};
```

---

## Application Logic

- **Authentication:** Uses a context provider to manage user state and protect routes.
- **Sharing:** When a user shares a file or text, a unique 6-digit code is generated and stored with the share.
- **Expiry:** Users can select expiry for each share. "Never Expire" is the default and is always available in the dropdown.
- **Editing:** When editing, the form is prefilled with the existing share data.
- **Listing:** Shares are listed in a table (desktop) or cards (mobile), showing all relevant details.
- **Details Modal:** Clicking a row/card opens a modal with all share details.
- **Delete:** Users can delete any share with confirmation.

---

## Project Structure

```
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
  App.tsx
  index.tsx
  ...
public/
  index.html
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

Create a `.env` file in the root if needed (for API endpoints, etc.).

### 4. Start the Development Server

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
- React Router
- Context API for state management
- Lucide React Icons

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
