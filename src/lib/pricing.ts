export const pricingMap = {
    "Landing Page":            [300, 1000], /* scope : range[min, max] */
    "Simple Starter Site":     [800, 4000],
    "Custom Multi-Page Site":  [3500, 9000],
    "Custom Business Web App": [5000, 30000]
}
export const additionalFeatures = { /* 0 = custom quote; < 0 = +n% (on top of total, not a discount) */
    "Custom Admin Panel":         2500,
    "Content Management System":  2000,
    "Build Desktop App":          2000,
    "Interactive Scroll Effects": 250,
    "Expedite Development":      -30, /* +30% */
    "Other":                      0  /* custom quote */
}
export const scopeDescriptions: Record<string, string> = {
    "Landing Page": "Single page with mobile responsive design and elements such as a hero section and call-to-action. Perfect for quick launches.",
    "Simple Starter Site": "3-5 pages with navigation, simple animations, and a basic contact form.",
    "Custom Multi-Page Site": "Fully custom design with up to 15 pages, advanced animations, and interactive elements.",
    "Custom Business Web App": "Complex web application with multiple custom features.",
}
export const featureDescriptions: Record<string, string> = {
    "Custom Admin Panel": "Full admin dashboard for managing users, content, and/or site settings.",
    "Content Management System": "Easy-to-use interface for updating certain content without code knowledge.",
    "Build Desktop App": "Turn this website into a desktop application in addition to or instead of a browser website.",
    "Interactive Scroll Effects": "Smoothly animate certain elements as the user scrolls down on the website.",
    "Expedite Development": "Focus more on development speed while maintaining high quality and functionality.",
    "Other": "Have something specific in mind? You'll be provided a custom quote for your needs."
}

/* First 3 customers get 25% off and next 2 get 15% off! */
