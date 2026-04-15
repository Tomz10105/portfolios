import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import Header from "../components/Header";
import TitleBar from "../components/TitleBar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import MenuMobile from "../components/MenuMobile";
import "../styles/Contact.css";
import { BsTwitter, BsDiscord, BsEnvelope } from 'react-icons/bs';
import { VscSend, VscLoading } from 'react-icons/vsc';

const SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const socials = [
  { icon: <BsEnvelope />, label: 'email',   href: 'mailto:tombz0514@gmail.com',     value: '"tombz0514@gmail.com"'  },
  { icon: <BsTwitter />,  label: 'twitter', href: 'https://twitter.com/tomnaxie',   value: '"@tomnaxie"'            },
  { icon: <BsDiscord />,  label: 'discord', href: 'https://discord.gg/9R92cGWVka',  value: '"discord.gg/9R92cGWVka"'},
];

function Contact() {
  const formRef   = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const resetForm = () => setStatus('idle');

  return (
    <body>
      <TitleBar />
      <section className="flex-container">
        <section className="main-container">
          <Header />
          <MenuMobile />
          <main className="main-wrapper contact">

            {/* ── Left: VS Code CSS code panel ── */}
            <div className="contact-code-panel">
              <div className="code-file-tab">
                <span className="code-file-dot" />
                Contact.css
              </div>

              <div className="code-block">
                <div className="code-line">
                  <span className="ln">1</span>
                  <span className="css-comment">{'/* reach out — I\'ll respond fast */'}</span>
                </div>
                <div className="code-line"><span className="ln">2</span></div>
                <div className="code-line">
                  <span className="ln">3</span>
                  <span className="css-selector">.tombz</span>
                  <span className="css-brace">{' {'}</span>
                </div>
                <div className="code-line">
                  <span className="ln">4</span>
                  <span className="css-prop">&nbsp;&nbsp;status</span>
                  <span className="css-colon">: </span>
                  <span className="css-string css-available">"available for work"</span>
                  <span className="css-semi">;</span>
                </div>
                <div className="code-line"><span className="ln">5</span></div>

                {socials.map(({ label, href, value }, i) => (
                  <div className="code-line" key={label}>
                    <span className="ln">{i + 6}</span>
                    <span className="css-prop">&nbsp;&nbsp;{label}</span>
                    <span className="css-colon">: </span>
                    <a href={href} target="_blank" rel="noreferrer" className="css-string css-link">
                      {value}
                    </a>
                    <span className="css-semi">;</span>
                  </div>
                ))}

                <div className="code-line"><span className="ln">{socials.length + 6}</span></div>
                <div className="code-line">
                  <span className="ln">{socials.length + 7}</span>
                  <span className="css-brace">{'}'}</span>
                </div>
              </div>

              <div className="contact-socials">
                {socials.map(({ icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                     className="contact-social-btn" title={label}>
                    {icon}
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* ── Right: contact form ── */}
            <div className="contact-form-panel">
              <span className="services-comment">// send_message.js</span>
              <h2 className="contact-form-title">Send a Message</h2>
              <p className="contact-form-sub">
                Have a project or question? Drop me a message and I'll get back to you shortly.
              </p>

              {status === 'success' && (
                <div className="contact-success">
                  <span className="success-icon">✓</span>
                  <p>Message sent! I'll get back to you soon.</p>
                  <button className="form-reset-btn" onClick={resetForm}>
                    Send another
                  </button>
                </div>
              )}

              {status === 'error' && (
                <div className="contact-error">
                  <p>⚠ Something went wrong. Try emailing me directly at{' '}
                    <a href="mailto:tombz0514@gmail.com">tombz0514@gmail.com</a>
                  </p>
                  <button className="form-reset-btn" onClick={resetForm}>
                    Try again
                  </button>
                </div>
              )}

              {(status === 'idle' || status === 'loading') && (
                <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="from_name">Name</label>
                      <input
                        id="from_name"
                        type="text"
                        name="from_name"
                        className="form-input"
                        placeholder="Your name"
                        required
                        disabled={status === 'loading'}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="from_email">Email</label>
                      <input
                        id="from_email"
                        type="email"
                        name="from_email"
                        className="form-input"
                        placeholder="your@email.com"
                        required
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      className="form-input"
                      placeholder="What's this about?"
                      required
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-input form-textarea"
                      placeholder="Tell me about your project..."
                      rows={6}
                      required
                      disabled={status === 'loading'}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`form-submit ${status === 'loading' ? 'loading' : ''}`}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <VscLoading className="spin-icon" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <VscSend />
                        Send Message
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>

          </main>
        </section>
        <SideBar />
      </section>
      <Footer />
    </body>
  );
}

export default Contact;
