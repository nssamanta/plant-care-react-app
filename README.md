# Plant Care Watering App:

React final project application created for the Summer Kiwi React Class 2025.

This app allows users to track the watering needs of their house plants. Users can include information such as the name, watering frequency, last day watered, and notes. Users can add, edit, and delete plants from their collection. Users can search through their plant collection and filter by name or date created. The app automatically calculates the next watering day and displays a status to alert users when a plant is due or overdue for watering.

---

## Installation instructions:

**Prerequisites**

- [Node.js](https://nodejs.org/) and npm installed on your machine.

- A free [Airtable](https://airtable.com/) account.

1. **Clone** the repository and change the directory to the project folder:

```bash
git clone git@github.com:yourusername/plant-care-react-app.git
cd plant-care-react-app
```

2. **Install** dependencies using

```bash
npm install
```

3. **Set up environement variables** Create a new file in the project root named .env.local and copy the contents from .env.local.example

## Airtable Configuration:

1. **Create a Base:** In your Airtable workspace, create a new base from scratch.

2. **Create a Table:** By default, you'll have a table named "Table 1". Rename this table to Plants.

3. **Define the Fields:** Set up the following columns (fields) in your Plants table. The field name must match exactly, including capitalization.

| Field Name        | Airtable Field Type |
| ----------------- | ------------------- |
| name              | Single line text    |
| wateringFrequency | Number (Integer)    |
| lastWatered       | Date                |
| notes             | Long text           |
| createdTime       | Created time        |

4. **Get Your Credentials:**

- Base ID: Find this on your base's [API documentation page](https://airtable.com/developers/web/api/introduction). It starts with app....

- Table Name: This will be Plants (or whatever you named it).

- Personal Access Token: Create a new token on your [Airtable developer hub](https://airtable.com/create/tokens). Ensure it has the following scopes and that it has Access to your new Plant Care base:
  - data.records:read

  - data.records:write

5. **Update .env.local:** Add your credentials to the .env.local file.

## How to run the development server:

Start the development server:

```bash
npm run dev
```

Open your browser and go to http://localhost:5173
