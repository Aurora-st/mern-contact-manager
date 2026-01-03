import React, { useState } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleContactAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>📇 Contact App</h1>
          <p>Manage your contacts efficiently</p>
        </header>
        
        <div className="content">
          <ContactForm onContactAdded={handleContactAdded} />
          <ContactList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}

export default App;

