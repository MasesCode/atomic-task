
# Atomic Task Blossom

A modern and intuitive task management application built with React, TypeScript, and Atomic Design principles.

## 🏗️ Architecture - Atomic Design

This application follows the **Atomic Design** methodology, organizing components into 5 hierarchical levels:

### 🔬 Atoms
Basic and indivisible interface elements:
- **Button**: Reusable button with variants (primary, secondary, danger, ghost)
- **Input**: Input field with error states and validation
- **Checkbox**: Custom checkbox with animations
- **Text**: Typography component with variants

### 🧪 Molecules
Simple combinations of atoms that work together:
- **TaskItem**: Individual task item (checkbox + text + action buttons)
- **AddTaskForm**: Form to add tasks (input + button)
- **TaskStats**: Task statistics (total, completed, pending)

### 🦠 Organisms
Complex components that form interface sections:
- **TaskList**: Complete task list with empty states
- **Header**: Application header with title and actions

### 📄 Templates
Layout structures that define page organization:
- **TodoTemplate**: Main template that organizes header, stats, form and list

### 🌐 Pages
Specific instances of templates with real data:
- **TodoPage**: Main application page
- **Index**: Entry page that renders TodoPage

## 🚀 Features

### ✅ Core Features
- ➕ **Add tasks**: Intuitive form to create new tasks
- ✔️ **Mark as completed**: Checkbox to toggle task status
- 🗑️ **Remove tasks**: Button to delete individual tasks
- ✏️ **Edit tasks**: Double click to edit task names
- 🧹 **Clear completed**: Remove all completed tasks
- 📊 **Statistics**: Counters for total, completed and pending tasks

### 🎁 Bonus Features
- 💾 **Local Persistence**: Tasks are saved in localStorage
- ✨ **Animations**: Smooth transitions and micro-interactions
- 📱 **Responsive**: Interface adapted for different screen sizes
- 🔔 **Notifications**: Toast notifications for action feedback
- 🎨 **Modern Design**: Clean interface with gradients and shadows

## 🛠️ Technologies Used

- **React 18** - User interface library
- **TypeScript** - Static typing for JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icons
- **React Hook Form** - Form management
- **Vite** - Build tool and dev server

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Checkbox.tsx
│   │   └── Text.tsx
│   ├── molecules/      # Combinations of atoms
│   │   ├── TaskItem.tsx
│   │   ├── AddTaskForm.tsx
│   │   └── TaskStats.tsx
│   ├── organisms/      # Complex sections
│   │   ├── TaskList.tsx
│   │   └── Header.tsx
│   └── templates/      # Page layouts
│       └── TodoTemplate.tsx
├── pages/              # Application pages
│   ├── TodoPage.tsx
│   └── Index.tsx
├── hooks/              # Custom hooks
│   ├── useTasks.ts
│   └── useLocalStorage.ts
├── types/              # TypeScript definitions
│   └── Task.ts
└── lib/                # Utilities
    └── utils.ts
```

## 🎯 Atomic Design Decisions

### Why Atomic Design?
1. **Reusability**: Components can be reused in different contexts
2. **Maintainability**: Changes in atoms propagate automatically
3. **Testability**: Small components are easier to test
4. **Scalability**: New functionality can reuse existing components
5. **Consistency**: Design system ensures visual uniformity

### Classification Criteria
- **Atoms**: Cannot be functionally decomposed
- **Molecules**: Have a single well-defined responsibility
- **Organisms**: Can function independently
- **Templates**: Focus on layout, not content
- **Pages**: Real instances with specific data

## 🔧 How to Run

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Access `http://localhost:8080`

## 🧪 Tests and Quality

The project includes a comprehensive testing suite with:

### 📋 Test Coverage

- ✅ **Unit Tests**: All components, hooks and pages tested
- ✅ **Component Testing**: React components with React Testing Library
- ✅ **Hook Testing**: Custom hooks with renderHook
- ✅ **Integration Testing**: Complete user flows

### 🧰 Testing Stack

- **Vitest**: Fast test runner with TypeScript support
- **React Testing Library**: Component testing utilities
- **jsdom**: DOM simulation for browser environment
- **Jest DOM**: Additional matchers for DOM testing

### 📊 Test Structure

```text
src/test/
├── components/
│   ├── atoms/          # Button, Checkbox, Input tests
│   ├── molecules/      # TaskItem, AddTaskForm, TaskStats tests
│   └── organisms/      # Header, TaskList tests
├── hooks/              # useLocalStorage, useTasks tests
├── pages/              # TodoPage tests
└── setup.ts           # Test configuration
```

### 🚀 How to Run Tests

```bash
# Run all tests once
npm run test:run

# Run tests in watch mode (monitors changes)
npm run test

# Run tests with interactive UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### 📈 Test Results

- ✅ **11 test files passing**
- ✅ **40 tests passing**
- ✅ **0 tests failing**
- ✅ **Components**: Atoms, Molecules, Organisms tested
- ✅ **Hooks**: Custom logic thoroughly tested
- ✅ **Pages**: End-to-end user flows verified

### 🎯 Quality Assurance

- **ESLint**: Code quality and consistency
- **TypeScript**: Compile-time type checking  
- **Automated Testing**: CI/CD integration ready
- **Code Coverage**: Comprehensive test coverage

---

*This application demonstrates how Atomic Design principles can be applied to create modular, reusable, and easily maintainable interfaces.*
