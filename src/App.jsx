import React, { useState, useEffect } from 'react';
import { SERVICES, TIMELINE, SKILLS, PROJECTS } from './data';
import './style.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ text: '', type: '' });

  // Clear submission statuses automatically
  useEffect(() => {
    if (formStatus.text) {
      const timeout = setTimeout(() => setFormStatus({ text: '', type: '' }), 5000);
      return () => clearTimeout(timeout);
    }
  }, [formStatus.text]);

  const validateEmail = (email) => {
    return /^[\s@]+@[\s@]+\.[\s@]+$/.test(email);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormStatus({ text: 'Please fill in all fields.', type: 'error' });
      return;
    }
    if (!validateEmail(email)) {
      setFormStatus({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setFormStatus({ text: 'Thank you for your message!  I will contact you soon :D.', type: 'success' });
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToContact = () => {
    setActiveTab('home');
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="portfolio-shell">
      
      {/* PREMIUM BACKGROUND ANIMATION NODES */}
      <div className="ambient-background" aria-hidden="true">
        <div className="glow-orb orb-maroon"></div>
        <div className="glow-orb orb-crimson"></div>
        <div className="glow-orb orb-dark"></div>
        <div className="tech-grid-overlay"></div>
      </div>

      <header className="main-header">
        <div className="container nav-container">
          <div className="logo" onClick={() => setActiveTab('home')}>Gh0st</div>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>&#9776;</button>
          <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <ul>
              {['home', 'about', 'skills', 'projects'].map((tab) => (
                <li key={tab}>
                  <button 
                    className={activeTab === tab ? 'active-link' : ''} 
                    onClick={() => { setActiveTab(tab); setMenuOpen(false); }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={scrollToContact}>Contact & Comment</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="animated-view" key={activeTab}>
        {activeTab === 'home' && (
          <>
            <section id="home">
              <img src="/images/Home_profile.jpeg" alt="Matthew Ken Susanto" className="profile-photo" />
              <h1>Hi, I'm Matthew Ken Susanto</h1>
              <p>A Back-End programmer based in Bandung, Indonesia.</p>
              <p>Currently studying Computer Science at Binus University.</p>
              <div className="social-icons">
                <a href="https://discordapp.com/users/878188716533903382" target="_blank" rel="noreferrer" className="social-button">Discord</a>
                <a href="https://www.linkedin.com/in/matthew-susanto-989063323" target="_blank" rel="noreferrer" className="social-button">LinkedIn</a>
                <a href="https://github.com/3mk42129" target="_blank" rel="noreferrer" className="social-button">GitHub</a>
              </div>
            </section>

            <section id="services" className="container">
              <h2 className="section-title">What I Offer</h2>
              <div className="services-grid">
                {SERVICES.map(service => (
                  <div key={service.id} className="card-item">
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="contact" className="container">
              <div className="contact-form-container">
                <h2 className="section-title">Contact & Comment</h2>
                <form onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Message/Comment:</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                  </div>
                  <button type="submit" className="submit-button">Send Message</button>
                  {formStatus.text && <div className={`form-message ${formStatus.type}`}>{formStatus.text}</div>}
                </form>
              </div>
            </section>
          </>
        )}

        {activeTab === 'about' && (
          <section id="about" className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-box">
              <div className="about-text">
                <p>Hello! My name is Matthew Ken Susanto, and I am currently pursuing a degree in Computer Science at BINUS University. My journey in the world of technology began with a fascination for how fast technology grows and how it affects our lives.</p>
                <p>I enjoy solving complex problems, building intuitive user experiences, and continuously learning new technologies. My goal is to create impactful and innovative solutions that make a difference.</p>
                <p>In my free time, I enjoy playing games, playing basketball, and exploring Machine Learning.</p>
              </div>
              <div className="about-image-wrapper">
                <img src="/images/About_Me_picture.jpeg" alt="Matthew Portfolio" />
              </div>
            </div>

            <h2 className="section-title">My Education Journey</h2>
            <div className="education-timeline">
              {TIMELINE.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-content card-item">
                    <h3>{item.title}</h3>
                    <p><strong>{item.subtitle}</strong></p>
                    <p style={{ whiteSpace: 'pre-line' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'skills' && (
          <section id="skills" className="container">
            <h2 className="section-title">My Skills</h2>
            <div className="skills-grid">
              {SKILLS.map((skill, index) => (
                <div key={index} className="card-item">
                  <h3>{skill.category}</h3>
                  <p>{skill.items.join(', ')}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'projects' && (
          <section id="projects" className="container">
            <h2 className="section-title">My Projects</h2>
            <div className="projects-grid">
              {PROJECTS.map((project, index) => (
                <div key={index} className="portfolio-item">
                  <div className="portfolio-image-box">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="portfolio-info">
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <a href={project.link} target="_blank" rel="noreferrer" className="portfolio-link">
                      View Project &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="main-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Matthew Ken Susanto.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;