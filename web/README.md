# Personal Brand Website

A modern, full-featured personal brand website built with Next.js 16, featuring a beautiful frontend showcase and a powerful admin dashboard.

## 🌟 Features

### Frontend
- **Home Page**: Personal introduction with animated skill tags and social links
- **About Page**: Detailed personal information with timeline display
- **Projects Page**: Project showcase with progress tracking and image gallery
- **Blog Page**: Blog articles with categories and sticky posts
- **Contact Page**: Contact form with auto-reply functionality

### Admin Dashboard
- **Dashboard**: Overview of site statistics and quick actions
- **Profile Management**: Edit personal information, skills, and timeline
- **Project Management**: Add, edit, delete projects with progress tracking
- **Blog Management**: Manage articles with rich text editor
- **Contact Management**: Edit contact information and social links
- **Messages**: View and manage contact form submissions
- **Settings**: Site-wide settings and password management

### Technical Features
- **Simple Authentication**: Cookie-based admin authentication
- **Data Validation**: Zod schema validation for all inputs
- **File-based Storage**: JSON file storage suitable for Vercel deployment
- **Responsive Design**: Mobile-first responsive design
- **Type Safety**: Full TypeScript support
- **Modern UI**: Beautiful animations with Framer Motion

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.4 (App Router)
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand 5.0.10
- **Animation**: Framer Motion 12.36.0
- **Rich Text Editor**: TipTap
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Validation**: Zod 3.22.4
- **Password Hashing**: bcryptjs 2.4.3
- **Language**: TypeScript 5

## 📁 Project Structure

```
web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (frontend)/        # Frontend pages (future optimization)
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── (dashboard)/   # Dashboard pages
│   │   │   │   ├── dashboard/
│   │   │   │   ├── profile/
│   │   │   │   ├── projects/
│   │   │   │   ├── blog/
│   │   │   │   ├── contact/
│   │   │   │   ├── messages/
│   │   │   │   ├── settings/
│   │   │   │   └── layout.tsx
│   │   │   └── login/         # Login page
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication APIs
│   │   │   ├── site-data/     # Site data API
│   │   │   ├── messages/      # Messages API
│   │   │   └── upload/        # File upload API
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── admin/            # Admin components
│   │   └── shared/           # Shared components
│   ├── lib/                  # Utility functions
│   │   ├── api.ts            # API helpers
│   │   ├── auth.ts           # Authentication utilities
│   │   ├── validation.ts     # Zod schemas
│   │   └── dataPaths.ts      # Data file utilities
│   ├── types/                # TypeScript types
│   ├── store/                # Zustand stores
│   └── data/                 # JSON data files
├── public/                   # Static assets
├── middleware.ts             # Next.js middleware
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🏃 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd personal-website/web
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and set your admin password:
```env
ADMIN_PASSWORD=your-secure-password
```

5. Start development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Access

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Enter your admin password
3. Access the dashboard to manage your content

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ADMIN_PASSWORD` | Admin login password (plaintext) | `61157252bB@` |
| `ADMIN_PASSWORD_HASH` | Admin password hash (recommended) | - |
| `DATA_PATH` | Custom data storage path | `./src/data` |
| `EMAIL_SERVER` | SMTP server for contact form | - |
| `EMAIL_FROM` | Email sender address | - |
| `NODE_ENV` | Environment mode | `development` |

### Password Security

For production, use hashed passwords:

```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

Set the output in `ADMIN_PASSWORD_HASH` environment variable.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Important Notes for Vercel

- Data files are stored in the project directory
- For persistent storage, set `DATA_PATH` to a persistent volume path
- Consider using external storage (database) for production

### Build Commands

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📚 API Documentation

### Authentication

#### POST `/api/auth/login`
Login with password.

**Request:**
```json
{
  "password": "your-password"
}
```

**Response:**
```json
{
  "success": true,
  "data": { "authenticated": true },
  "message": "Login successful"
}
```

#### GET `/api/auth/check`
Check authentication status.

**Response:**
```json
{
  "success": true,
  "data": { "authenticated": true }
}
```

#### POST `/api/auth/logout`
Logout and clear session.

### Site Data

#### GET `/api/site-data`
Get all site data.

**Response:**
```json
{
  "success": true,
  "data": {
    "global": { ... },
    "profile": { ... },
    "projects": [ ... ],
    "blog": { ... },
    "contact": { ... }
  }
}
```

#### POST `/api/site-data`
Update site data (requires authentication).

### Messages

#### GET `/api/messages`
Get all messages (requires authentication).

#### POST `/api/messages`
Submit a new contact message.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here"
}
```

#### DELETE `/api/messages`
Delete a message (requires authentication).

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📝 Development

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic

### Git Workflow

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- All open-source contributors

---

Made with ❤️ by Robin
