Here's a detailed README for your **Gudangku** project, tailored to provide a clear overview and showcase its features to potential clients.

---

# Gudangku - Your Personal Warehouse Management System

**Gudangku** is an innovative web application designed for efficient warehouse management, enabling users to easily manage inventory, categorize goods, and track logs of transactions. Built with **React** and **Vite**, Gudangku provides a responsive and seamless user experience.

## 🌟 Key Features

### 1. 🔐 **User Authentication**
- **Login**: Securely log in with your email and password or use Google login for a quick access.
- **Role Management**: Users are assigned roles that dictate their access levels, ensuring that only authorized personnel can perform certain actions (like creating, updating, or deleting goods).

### 2. 📦 **Goods Management**
- **View All Goods**: Retrieve a list of all items in the warehouse with details such as name, quantity, price, and category.
- **Create New Goods**: Admins can add new items to the inventory effortlessly.
- **Update Goods**: Admins have the capability to update item details as needed.
- **Delete Goods**: Admins can remove items from the inventory, ensuring accurate and up-to-date records.

### 3. 🗂️ **Category Management**
- **View Categories**: Access all available categories to organize goods effectively, making it easier to manage inventory.

### 4. 📈 **Transaction Logs**
- **View Logs**: Monitor all transactions related to inventory changes, including detailed descriptions and types (income or expense).
- **Request Handling**: Create requests for goods, allowing for organized management of stock inflow and outflow.

---

## 📖 API Documentation

### Authentication

#### POST /login
Login a user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "access_token": "string",
  "id": "integer",
  "role": "string"
}
```

#### POST /google-login
Login a user using Google.

**Request Body:**
```json
{
  "credential": "string"
}
```

**Response:**
```json
{
  "access_token": "string",
  "id": "integer",
  "role": "string"
}
```

### Categories

#### GET /cat
Retrieve all categories.

**Response:**
```json
[
  {
    "id": "integer",
    "name": "string"
  }
]
```

### Goods Management

#### GET /goods
Retrieve all goods.

**Response:**
```json
[
  {
    "id": "integer",
    "name": "string",
    "quantity": "integer",
    "price": "number",
    "categoryId": "integer"
  }
]
```

#### GET /goods/:id
Retrieve a good by ID.

**Response:**
```json
{
  "id": "integer",
  "name": "string",
  "quantity": "integer",
  "price": "number",
  "categoryId": "integer"
}
```

#### POST /create
Add a new good (Admin only).

**Request Body:**
```json
{
  "name": "string",
  "quantity": "integer",
  "price": "number",
  "categoryId": "integer"
}
```

**Response:**
```json
{
  "id": "integer",
  "name": "string",
  "quantity": "integer",
  "price": "number",
  "categoryId": "integer"
}
```

#### PUT /goods/:id
Update a good by ID (Admin only).

**Request Body:**
```json
{
  "name": "string",
  "quantity": "integer",
  "price": "number",
  "categoryId": "integer"
}
```

**Response:**
```json
{
  "id": "integer",
  "name": "string",
  "quantity": "integer",
  "price": "number",
  "categoryId": "integer"
}
```

#### DELETE /goods/:id
Delete a good by ID (Admin only).

**Response:**
```json
{
  "message": "Item deleted successfully"
}
```

### Logs

#### GET /logs
Retrieve all logs.

**Response:**
```json
[
  {
    "id": "integer",
    "description": "string",
    "goods": [
      {
        "name": "string",
        "numberOfItems": "integer"
      }
    ],
    "type": "string",
    "total": "integer",
    "userId": "integer",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

### Request

#### POST /request
Create a goods request (outgoing or incoming).

**Request Body:**
```json
{
  "description": "string",
  "goods": [
    {
      "name": "string",
      "numberOfItems": "integer"
    }
  ],
  "type": "string"
}
```

**Response:**
```json
{
  "id": "integer",
  "description": "string",
  "goods": [
    {
      "name": "string",
      "numberOfItems": "integer"
    }
  ],
  "type": "string",
  "total": "integer",
  "userId": "integer",
  "createdAt": "string",
  "updatedAt": "string"
}
```

---

## 🔧 Technologies Used

- **React**: A powerful JavaScript library for building user interfaces, providing a smooth and dynamic user experience.
- **Vite**: A fast build tool that enables lightning-fast development with hot module replacement (HMR).
- **Node.js**: A JavaScript runtime that allows for building scalable network applications.

---

## 🚀 How to Run the Application

1. **Clone this repository** to your local machine:
   ```bash
   git clone https://github.com/your-repo/gudangku.git
   ```

2. **Install dependencies**:
   ```bash
   cd gudangku
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the application.

---

**Gudangku** is the ultimate warehouse management solution you need to streamline your inventory processes and enhance your operational efficiency. Get started today with **Gudangku**! 🎉

--- 

**Developed by**: Putra Mahardika

--- 

Feel free to customize any parts of this README to better fit your project's specifics or to include any additional features or information you think might be relevant!
