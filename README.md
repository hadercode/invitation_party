# 👑 Tiana's 15th Birthday Invitation

A premium, interactive web application designed for a 15th birthday celebration, inspired by the enchanting world of Princess Tiana. This app provides a seamless experience for guests to access their invitations, verify attendance via QR codes, and locate the event.

## ✨ Features

- **Princess Tiana Theme**: A stunning UI with emerald greens, golds, and soft lilacs, featuring glassmorphism and smooth animations.
- **Guest Access**: Secure entry using a unique invitation code.
- **QR Code Verification**: Integrated QR code scanner for event entry validation and attendance tracking.
- **Interactive Maps**: Leaflet-based map to guide guests to the celebration.
- **Real-time Synchronization**: Powered by Supabase for reliable data management.

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Vanilla CSS (Custom Glassmorphism)
- **Animations**: Framer Motion
- **Database**: Supabase
- **Icons**: Lucide React
- **Maps**: Leaflet & React Leaflet
- **Forms & Validation**: React Hook Form + Zod

## 🚀 Installation & Setup

Follow these steps to get the project running locally:

### 1. Clone the repository
```bash
git clone https://github.com/hadercode/invitation_party.git
cd invitation_party
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the development server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run preview`: Previews the production build locally.

---
*Created with ✨ for a special celebration.*
