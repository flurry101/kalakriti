# 🧡 **Contributing to Kalakriti**

Thank you for considering contributing to **Kalakriti**! Your contributions are incredibly valuable and will help us grow this platform to support and promote Indian folk art.

---

## 📑 **Table of Contents**

- [🧡 **Contributing to Kalakriti**](#-contributing-to-kalakriti)
  - [📑 **Table of Contents**](#-table-of-contents)
  - [🏁 **Getting Started**](#-getting-started)
  - [💡 **How to Contribute**](#-how-to-contribute)
    - [🐛 **Bug Reports**](#-bug-reports)
    - [🌟 **Feature Requests**](#-feature-requests)
  - [💻 **Code Contributions**](#-code-contributions)
  - [🔄 **Pull Request Process**](#-pull-request-process)
  - [📬 Contact](#-contact)

---

## 🏁 **Getting Started**

1. **🍴 Fork the Repository**: Click the “Fork” button at the top right of the repository page.  
```

[https://github.com/yourusername/kalakriti.git](https://github.com/yourusername/kalakriti.git)

````

2. **📂 Clone Your Fork**:  
Replace `your-username` with your GitHub username.  
```bash
git clone https://github.com/<your-username>/kalakriti.git
cd kalakriti
````

3. **📦 Install Dependencies**:
   Install the project dependencies using npm/yarn.

   ```bash
   npm install
   ```

4. **⚡ Set Up Supabase**:
   To integrate **Supabase** for authentication, database, and file storage, follow these steps:

   **To integrate Supabase:**

   * **Create a Supabase Project**

     * Go to [Supabase](https://supabase.io/) and sign up/log in.
     * Create a new project, name it **Kalakriti**, and note the **API URL** and **anon key** from your Supabase dashboard.

   * **Install Supabase Client**
     Run the following to install the necessary Supabase packages:

     ```bash
     npm install @supabase/supabase-js
     ```

   * **Set Up Supabase Authentication**
     Enable authentication (email/password, Google, etc.) in the **Authentication** tab of Supabase.

   * **Set Up Supabase Database**
     Create a table for **artworks**, **artists**, and **users** under the **Database** tab in Supabase. You can customize the schema as per your needs.

   * **📖 Supabase Documentation**
     * [Supabase Setup for React](https://supabase.io/docs/guides/with-react)
     * [Supabase Authentication Docs](https://supabase.io/docs/guides/auth)
     * [Supabase Database Docs](https://supabase.io/docs/guides/database)

5. **🚀 Run the App Locally**:
   Start the app in development mode.

   ```bash
   npm run dev
   ```

---

## 💡 **How to Contribute**

### 🐛 **Bug Reports**

If you encounter a bug, please report it by creating an issue. Include detailed information to help us understand and reproduce the issue:

* Steps to reproduce the bug.
* Expected behavior.
* Actual behavior.
* Screenshots or logs, if applicable.

### 🌟 **Feature Requests**

We welcome new feature ideas! To request a feature, open an issue and provide:

* A clear and descriptive title.
* The motivation for the feature.
* A detailed description of the proposed solution.
* Any alternatives considered.

---

## 💻 **Code Contributions**

We appreciate code contributions! To contribute:

1. **🌿 Create a Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **⚙️ Make Changes**:
   Implement your changes following the project structure and coding guidelines.

3. **📥 Commit Changes**:

   ```bash
   git add .
   git commit -m "Add feature: your feature name"
   ```

4. **🚀 Push to Your Fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

---

## 🔄 **Pull Request Process**

1. **🔗 Add the Original Repository as a Remote (Upstream)**
   If you haven’t already added the original repository as a remote, run:

   ```bash
   git remote add upstream https://github.com/yourusername/kalakriti.git
   ```

2. **⬇️ Fetch the Latest Changes from Upstream**

   ```bash
   git fetch upstream
   ```

3. **🔀 Merge the Latest Changes from Upstream/Main into Your Feature Branch**

   ```bash
   git checkout feature/your-feature-name
   git merge upstream/main
   ```

4. **📤 Create a Pull Request**
   After merging the latest changes, go to the original repository and open a Pull Request (PR). Provide a clear and descriptive title and a detailed explanation of your changes.

**Development Guidelines**

* 🧹 **Code Style**: Follow JavaScript/React best coding conventions to maintain consistency.
* 📝 **Documentation**: Update the `README.md` file as needed to reflect your changes.

---

## 📬 Contact

Have questions or need help? Open an issue or contact the Kalakriti team. We’re excited to collaborate with you in bringing Indian folk art to the world!

---

```

