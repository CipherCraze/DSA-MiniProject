# 🎨 Component Reference Guide

## Common Props and Patterns

### ButtonCard Component
Used on the Welcome Page for feature navigation.

```jsx
<ButtonCard 
  icon={IconComponent}      // Lucide icon component
  label="Feature Name"      // Display name
  path="/route"            // Navigation path
  color="from-blue-400 to-cyan-500"  // Gradient colors
  description="Feature description"   // Short description
/>
```

### Color Coding System

#### Severity Levels (Triage)
```jsx
Critical  → Red    (#E63946) → 🔴
Serious   → Orange (#FF8C42) → 🟠
Moderate  → Yellow (#FFC107) → 🟡
Normal    → Green  (#4CAF50) → 🟢
```

#### Stock Levels (Pharmacy)
```jsx
< 50 units   → Low Stock (Red)
50-99 units  → Medium (Yellow)
≥ 100 units  → Good Stock (Green)
```

#### Expiry Status (Pharmacy)
```jsx
< 30 days   → Expiring Soon (Red)
30-89 days  → Check Date (Yellow)
≥ 90 days   → Valid (Green)
```

## Animation Patterns

### Page Entry Animation
```jsx
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* Content */}
</motion.div>
```

### Card Hover Animation
```jsx
<motion.div
  whileHover={{ scale: 1.05, y: -10 }}
  whileTap={{ scale: 0.95 }}
>
  {/* Card content */}
</motion.div>
```

### Staggered Children
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, staggerChildren: 0.1 }}
>
  {items.map((item, index) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1 }}
    >
      {/* Item content */}
    </motion.div>
  ))}
</motion.div>
```

## Tailwind Utility Classes Cheat Sheet

### Layout
```css
.container       → max-w-7xl mx-auto px-4
.section         → py-8 or py-12
.card            → bg-white rounded-xl shadow-lg p-6
```

### Colors (Custom)
```css
.bg-primary      → #2E8BC0
.bg-secondary    → #145DA0
.bg-highlight    → #0C7B93
.bg-background   → #F5F9FA
.text-textPrimary   → #0A1F44
.text-textSecondary → #6C7A89
.bg-success      → #4CAF50
.bg-alert        → #FFC107
.bg-error        → #E63946
```

### Common Patterns
```css
/* Button Primary */
.bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-colors

/* Input Field */
.w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20

/* Card with Border Accent */
.bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary

/* Badge */
.px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white
```

## Icon Usage (Lucide React)

### Common Icons
```jsx
import { 
  Heart,        // Logo, cardiology
  Pill,         // Pharmacy
  Ambulance,    // Emergency
  Calendar,     // Appointments
  Map,          // Navigation
  User,         // Patient/Doctor
  Clock,        // Time
  Search,       // Search functionality
  Filter,       // Filters
  AlertCircle,  // Warnings
  Activity,     // Medical activity
  Stethoscope,  // Medical equipment
  MapPin,       // Location
  Navigation,   // Direction
  Check,        // Confirmation
  X,            // Close/Cancel
  Menu,         // Mobile menu
  ArrowRight,   // Next/Continue
} from 'lucide-react';
```

### Icon Sizing
```jsx
<Icon className="w-4 h-4" />   // Small
<Icon className="w-5 h-5" />   // Medium
<Icon className="w-6 h-6" />   // Large
<Icon className="w-10 h-10" /> // Extra Large
```

## Responsive Grid Patterns

### Feature Cards (2x2 on desktop)
```jsx
className="grid grid-cols-1 md:grid-cols-2 gap-8"
```

### Medicine Cards (3 columns on desktop)
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

### Stats Cards (4 columns on desktop)
```jsx
className="grid grid-cols-1 md:grid-cols-4 gap-6"
```

### Two Column Layout
```jsx
className="grid grid-cols-1 lg:grid-cols-3 gap-8"
// Left sidebar: lg:col-span-1
// Right content: lg:col-span-2
```

## State Management Patterns

### Simple State
```jsx
const [selectedItem, setSelectedItem] = useState(null);
const [searchQuery, setSearchQuery] = useState('');
const [isOpen, setIsOpen] = useState(false);
```

### Form Handling
```jsx
const [formData, setFormData] = useState({
  name: '',
  date: '',
  time: '',
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
```

## Navigation Patterns

### Link (React Router)
```jsx
import { Link } from 'react-router-dom';

<Link to="/pharmacy" className="...">
  Pharmacy
</Link>
```

### Programmatic Navigation
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/pharmacy');
```

## Chart Configuration (Recharts)

### Bar Chart
```jsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="category" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="stock" fill="#0C7B93" />
  </BarChart>
</ResponsiveContainer>
```

## Conditional Styling

### Dynamic Classes
```jsx
className={`base-classes ${
  condition ? 'true-classes' : 'false-classes'
}`}
```

### Multiple Conditions
```jsx
className={`
  base-classes
  ${condition1 && 'conditional-class-1'}
  ${condition2 ? 'true-class' : 'false-class'}
  ${condition3 && 'conditional-class-3'}
`}
```

## Quick Tips

1. **Always use motion.div for animations**
2. **Add transition delays for staggered effects**
3. **Use whileHover and whileTap for interactive elements**
4. **Maintain consistent spacing (gap-4, gap-6, gap-8)**
5. **Use shadow-lg for elevated cards**
6. **Add rounded-lg or rounded-xl for modern look**
7. **Use font-semibold or font-bold for emphasis**
8. **Maintain color consistency across pages**
9. **Test responsive design at all breakpoints**
10. **Use semantic HTML elements**

---

**Happy Coding! 🚀**
