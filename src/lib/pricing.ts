export const pricingMap = {
    "Landing Page": [750, 1500], /* scope : range[min, max] */
    "Simple Starter Site": [1500, 4500],
    "Custom Multi-Page Site": [3000, 8000],
    "Custom Business Web App": [5000, 30000]
}
export const additionalFeatures = { /* 0 = custom quote; < 0 = +n% (on top of total, not a discount) */
    "Custom Admin Panel": 2500,
    "Content Management System": 2000,
    "Interactive Scroll Effects": 200,
    "Expedite Development": -30, /* +30% */
    "Other": 0 /* *price for other features will be negotiated */
}
export const scopeDescriptions: Record<string, string> = {
    "Landing Page": "Single page with elements such as a hero section, call-to-action, and contact form. Perfect for quick launches.",
    "Simple Starter Site": "3-5 pages with navigation, responsive mobile design, and basic contact functionality.",
    "Custom Multi-Page Site": "Fully custom design with 6-15 pages, advanced animations, and interactive elements.",
    "Custom Business Web App": "Complex web application with multiple custom features."
}
export const featureDescriptions: Record<string, string> = {
    "Custom Admin Panel": "Full admin dashboard for managing users, content, and/or site settings.",
    "Content Management System": "Easy-to-use interface for updating certain content without code knowledge.",
    "Interactive Scroll Effects": "Smoothly animate certain elements as the user scrolls down on the website.",
    "Expedite Development": "Focus more on development speed while maintaining high quality and functionality.",
    "Other": "Have something specific in mind? You'll be provided a custom quote for your needs."
}

/* First 3 customers get 25% off and next 2 get 15% off! */
