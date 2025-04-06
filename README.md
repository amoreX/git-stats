# Git Stats

Git Stats is a web application that displays GitHub user statistics in a visually appealing and user-friendly manner. It provides information such as the user's profile details, repositories, followers, and following count.

## Features

- Display GitHub user profile information, including avatar, name, bio, and username.
- Show statistics like the number of public repositories, followers, and following.
- Responsive design for both desktop and mobile devices.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For styling the components.
- **Lucide React**: For icons used in the application.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js (v16 or later)
- npm or yarn package manager
- A GitHub personal access token (if required for API requests)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/git-stats.git
   cd git-stats
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```


### Running the Application

1. Start the development server:
   ```bash
   npm start
   # or
   npm run dev
   # or
   yarn start
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000` or `http://localhost:5173` as mentioned in the console.

### Building for Production

To create a production build, run:
```bash
npm run build
# or
yarn build
```

The optimized build will be available in the `build` directory.

## Folder Structure

```
/src
  /components       # Reusable React components
  /pages            # Application pages
  /styles           # Global styles
  /utils            # Utility functions
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Open a pull request.


## Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing user data.
- [Lucide Icons](https://lucide.dev/) for the icons used in the project.
