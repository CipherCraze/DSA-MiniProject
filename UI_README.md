# 🏥 Hospital Management System - UI Documentation

A modern, beautiful, and responsive Hospital Management System built with React, Tailwind CSS v3, and Framer Motion.

## 🎨 Design System

### Color Palette
```css
Primary Color:    #2E8BC0 (Medical Blue)
Secondary Color:  #145DA0 (Deep Blue)
Highlight/CTA:    #0C7B93 (Teal)
Background:       #F5F9FA (Soft White/Blue Tint)
Text Primary:     #0A1F44 (Navy Text)
Text Secondary:   #6C7A89 (Muted Gray)
Success:          #4CAF50 (Green)
Alert:            #FFC107 (Yellow)
Error:            #E63946 (Red)
```

### Typography
- **Font Family**: Inter & Poppins (Google Fonts)
- Modern, clean, and highly readable fonts

### Icons
- **Library**: Lucide React
- Consistent, professional medical icons

## 🚀 Features

### 1. Welcome Page (Home)
- **Route**: `/`
- **Description**: Landing page with animated background and feature cards
- **Features**:
  - Hero section with system title
  - 4 animated feature cards leading to main modules
  - Statistics section
  - Floating medical icons animation
  - Responsive grid layout

### 2. Pharmacy Management
- **Route**: `/pharmacy`
- **Color Theme**: Green-blue (#0C7B93)
- **Features**:
  - Medicine inventory cards with stock levels
  - Expiry date tracking with color-coded badges
  - Stock overview chart (Recharts)
  - Search and filter functionality
  - Stock status indicators (Low/Medium/Good)
  - Expiry status warnings
  - Category-based organization

### 3. Emergency Triage
- **Route**: `/triage`
- **Color Theme**: Red-orange gradient
- **Features**:
  - Patient queue sorted by severity
  - 4 severity levels with color coding:
    - 🔴 Critical (Red)
    - 🟠 Serious (Orange)
    - 🟡 Moderate (Yellow)
    - 🟢 Normal (Green)
  - Real-time patient information
  - Doctor allocation display
  - Animated severity badges
  - Priority-based sorting

### 4. Doctor Appointment Scheduling
- **Route**: `/appointments`
- **Color Theme**: Soft teal (#2E8BC0)
- **Features**:
  - Doctor selection with specialty display
  - Availability status indicators
  - Date picker for appointment selection
  - Time slot grid with booking status
  - Booking summary confirmation
  - Upcoming appointments list
  - Real-time slot availability

### 5. Hospital Navigation
- **Route**: `/navigation`
- **Color Theme**: Deep blue (#145DA0)
- **Features**:
  - Dijkstra's algorithm implementation
  - 10 hospital locations
  - Interactive location selection
  - Shortest path calculation
  - Visual route display
  - Distance and time estimation
  - Hospital layout grid visualization
  - Color-coded path highlighting

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation bar with routing
│   ├── Footer.jsx              # Footer with contact info
│   ├── ButtonCard.jsx          # Feature card component
│   └── AnimatedBackground.jsx  # Floating icons animation
│
├── pages/
│   ├── WelcomePage.jsx         # Home/Landing page
│   ├── PharmacyManagement.jsx  # Medicine inventory
│   ├── EmergencyTriage.jsx     # Patient prioritization
│   ├── AppointmentScheduling.jsx  # Doctor bookings
│   └── HospitalNavigation.jsx  # Graph-based navigation
│
├── App.jsx                     # Main app with routing
├── index.css                   # Tailwind imports & custom styles
└── main.jsx                    # App entry point
```

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **Tailwind CSS v3** | Styling & Design System |
| **Framer Motion** | Animations & Transitions |
| **React Router** | Page Navigation |
| **Recharts** | Data Visualization |
| **Lucide React** | Icon Library |
| **Vite** | Build Tool |

## 🎭 Animations

- **Page Transitions**: Smooth fade-in and slide animations
- **Button Hover Effects**: Scale and color transitions
- **Card Animations**: Staggered entry animations
- **Background**: Floating medical icons
- **Interactive Elements**: Hover and tap feedback

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Adaptive Layouts**: Grid adjusts based on screen size
- **Mobile Menu**: Hamburger menu for small screens

## 🚦 Getting Started

### Prerequisites
- Node.js (v20.19+ or v22.12+)
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

3. **Build for Production**
```bash
npm run build
```

4. **Preview Production Build**
```bash
npm run preview
```

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#2E8BC0',
      secondary: '#145DA0',
      // ... modify colors here
    },
  },
}
```

### Adding New Pages
1. Create component in `src/pages/`
2. Import in `App.jsx`
3. Add route in Routes component
4. Add navigation link in `Navbar.jsx`

## 🔮 Future Enhancements (Backend Integration)

- Connect to Python backend APIs
- Real-time data updates
- User authentication
- Database integration
- Advanced search and filtering
- PDF reports generation
- Email notifications
- Multi-language support

## 📊 Data Flow (Ready for Backend)

```
Frontend (React) ↔️ API Endpoints ↔️ Backend (Python)
                                    ↓
                              Database (JSON/SQL)
```

Current UI is using mock data and is ready to integrate with:
- `backend/Emergency_Management.py`
- `backend/Hospital_Graph_DSA.py`
- `backend/Doctor_Appointment&Registry/`
- `backend/Inventory_Management/`

## 🎯 Key Features Summary

✅ Modern, clean UI design  
✅ Fully responsive layout  
✅ Smooth animations  
✅ Intuitive navigation  
✅ Color-coded information  
✅ Real-time visual feedback  
✅ Professional medical theme  
✅ Accessibility-friendly  
✅ Performance optimized  
✅ Production-ready code  

## 📝 Notes

- All components are functional components using React Hooks
- Tailwind utility classes used throughout for consistency
- Framer Motion provides smooth, professional animations
- Code is modular and easy to maintain
- Ready for backend API integration

## 🎓 Learning Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Router Docs](https://reactrouter.com/)
- [Recharts Docs](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)

---

**Built with ❤️ for efficient healthcare management**

🌐 **View Application**: http://localhost:5173/
