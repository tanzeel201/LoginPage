class UserAuthentication {
    register() {
        const username = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        // Check if all fields are filled
        if (username && email && password) {
            const user = { username, email, password };
            const users = this.getStoredUsers();
            users.push(user);
            this.updateStoredUsers(users);

            alert('Registration successful! Please log in.');
        } else {
            alert('Please fill in all fields.');
        }
    }

    login() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Check if all fields are filled
        if (email && password) {
            const users = this.getStoredUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                alert('Login successful!');
                this.hideElements(['registration', 'login']);
                document.getElementById('product-management').classList.remove('hidden');
                // Assuming displayProducts() is defined elsewhere
                displayProducts();
            } else {
                alert('Invalid credentials! Please try again.');
            }
        } else {
            alert('Please fill in all fields.');
        }
    }

    getStoredUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    updateStoredUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    hideElements(ids) {
        ids.forEach(id => document.getElementById(id).classList.add('hidden'));
    }
}

// Usage
const userAuth = new UserAuthentication();


