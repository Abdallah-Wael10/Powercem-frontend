# Powercem Frontend

This is the official frontend for the Powercem project, built with [Next.js](https://nextjs.org/) and [React 19](https://react.dev/).  
It provides a modern, responsive, and fast user experience for Powercem's products, projects, and admin dashboard.

---

## 🚀 Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/your-username/powercem-frontend.git
cd powercem-frontend
```

### 2. **Install dependencies**
```bash
npm install
# or
yarn install
```

### 3. **Configure environment variables**
- Copy `.env.example` to `.env` and fill in your API URLs and any secrets:
```bash
cp .env.example .env
```
- Example:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:5000
  ```

### 4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Project Structure

```
src/
  app/
    admin/           # Admin dashboard and management pages
    compnant/        # Reusable UI components (Nav, Footer, Product, etc.)
    context/         # React Context providers (Products, Projects, etc.)
    pages/           # Main user-facing pages (Home, Products, Projects, About, Contact, etc.)
  public/            # Static assets (images, icons, etc.)
  styles/            # Global styles (Tailwind, custom CSS)
.env                 # Environment variables
```

---

## ✨ Features

- **Modern UI** with [Tailwind CSS](https://tailwindcss.com/)
- **Dynamic routing** for products, projects, and admin
- **Admin dashboard** for managing products, projects, clients, and more
- **Context API** for global state management (products, projects, partners, etc.)
- **Responsive** and mobile-friendly design
- **Image optimization** with Next.js `<Image />`
- **Loading spinners** and smooth transitions
- **API integration** with backend (set via `NEXT_PUBLIC_API_URL`)

---

## 📦 Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Lint code with ESLint

---

## 📝 Customization

- **Change API URL:**  
  Edit `.env` and set `NEXT_PUBLIC_API_URL` to your backend API.

- **Add/Edit Products/Projects:**  
  Use the admin dashboard (`/admin/product`, `/admin/project`) after logging in as admin.

- **Styling:**  
  Edit Tailwind config in `tailwind.config.mjs` or add custom CSS in `src/styles`.

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---




---

**Made by Abdallah wael❤️ using Next.js & React**
