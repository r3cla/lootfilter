# LootFilter.tech

This is a "for fun" project for Path of Exile 2 inspired by the great work of NeverSink & FilterBlade using my own (messy :P) code.

It's a loot filter generator for PoE 2 (no compatibility for PoE 1). It is very straightforward and barebones but you still may encounter bugs in the early stages, this is my first time working with loot filters and I am learning as I go.

To-do list:
- Decide how to implement Continue rule toggle for cosmetic rules
- Refactoring where necessary
- TBA

## Contributing

Contributions are always welcome! Follow these handy dandy tips to get started:

## Development Environment Setup

1. Fork and Clone the Repository
   ```bash
   git clone https://github.com/r3cla/lootfilter.git
   cd lootfilter
   ```

2. Install Dependencies
   ```bash
   npm install react react-dom typescript @types/react @types/react-dom react-scripts
   npm install zustand @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
   npm install lucide-react sonner
   npm install -D tailwindcss postcss autoprefixer
   npm install @radix-ui/react-select @radix-ui/react-alert-dialog @radix-ui/react-toast
   npm install class-variance-authority clsx tailwind-merge
   ```

3. Start Development Server
   ```bash
   npm start
   ```

## Making Changes

1. Create a new branch for your feature:
   ```bash
   git checkout -b yourbranch
   ```

2. Make your changes and test that they work

3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

4. Push to your fork:
   ```bash
   git push origin yourbranch
   ```

5. Create a Pull Request through GitHub

## Development Guidelines

- Write descriptive commit messages
- Please test your changes before requesting a pull

## Testing

Run the development server and test your changes with different rule configurations. Key areas to test:
- Rule creation and editing
- Drag and drop functionality (for the RuleList, which is left side of the app)
- Filter generation
- UI responsiveness

## Need Help?

If you have questions or need help, please:
1. Create a new issue on github if needed
2. Reach out to me directly:
- BlueSky: @logie.nz
- Discord: reclapresh

Thank you!