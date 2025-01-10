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
   lootfilter.tech@1.0.0
   ├── @babel/plugin-proposal-private-property-in-object@7.21.11
   ├── @dnd-kit/core@6.3.1
   ├── @dnd-kit/sortable@10.0.0
   ├── @dnd-kit/utilities@3.2.2
   ├── @radix-ui/react-alert-dialog@1.1.4
   ├── @radix-ui/react-select@2.1.4
   ├── @radix-ui/react-toast@1.2.4
   ├── @types/react-dom@18.3.5
   ├── @types/react-select@5.0.1
   ├── @types/react@18.3.18
   ├── autoprefixer@10.4.20
   ├── class-variance-authority@0.7.1
   ├── clsx@2.1.1
   ├── lucide-react@0.469.0
   ├── postcss@8.4.49
   ├── react-dom@18.2.0
   ├── react-router-dom@7.1.1
   ├── react-scripts@5.0.1
   ├── react-select@5.9.0
   ├── react@18.2.0
   ├── sonner@1.7.1
   ├── tailwind-merge@2.6.0
   ├── tailwindcss@3.4.17
   ├── typescript@4.9.5
   └── zustand@5.0.3
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
