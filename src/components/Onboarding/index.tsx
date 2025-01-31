import { Button, Flex, Steps } from 'antd';
import { useState } from 'react';

import { useAppStore } from '../../store/app.ts';
import styles from './styles.module.scss';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const setIsUserOnboarded = useAppStore((state) => state.setIsUserOnboarded);

  const onFinish = () => {
    // setIsUserOnboarded(false);
  };

  return (
    <main className={styles.container}>
      <aside className={styles.aside}>
        <Steps
          current={currentStep}
          items={[
            {
              title: 'Welcome on board',
            },
            {
              title: 'Terms and Conditions',
            },
            {
              title: 'Configure application params',
            },
          ]}
        />
      </aside>
      {currentStep === 0 && (
        <Flex
          className={styles.overlay}
          justify="center"
          align="center"
          vertical
          gap="middle">
          <h1>Welcome to Dota 2 friend</h1>
          <Button type="primary" onClick={() => setCurrentStep(1)}>
            Continue
          </Button>
        </Flex>
      )}

      {currentStep === 1 && (
        <Flex className={styles.overlay} align="center" vertical gap="large">
          <div className={styles.terms_container}>
            <h1>Terms and Conditions for Dota 2 friend</h1>
            <p>
              <em>Last Updated: 29.01.2025</em>
            </p>

            <div className="section">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Dota 2 friend ("the App"), an independent tool designed to
                assist players of <em>Dota 2</em> with gameplay timing reminders and
                strategic suggestions. By using the App, you agree to these Terms.
                Discontinue use if you disagree.
              </p>
            </div>

            <div className="section">
              <h2>2. Eligibility</h2>
              <p>
                Open to all <em>Dota 2</em> players worldwide. You must comply with:
              </p>
              <ul>
                <li>
                  Valve's{' '}
                  <a
                    href="https://store.steampowered.com/legal/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Steam Agreement
                  </a>
                </li>
                <li>Any applicable local laws</li>
              </ul>
            </div>

            <div className="section">
              <h2>3. License</h2>
              <p>
                We grant temporary permission to use the App for personal gameplay
                assistance. You may not:
              </p>
              <ul>
                <li>Reverse-engineer or modify the App</li>
                <li>Use it for commercial purposes</li>
              </ul>
            </div>

            <div className="section">
              <h2>4. Prohibited Uses</h2>
              <ul>
                <li>
                  ❌ <strong>Never use this App to:</strong>
                  <ul>
                    <li>
                      Cheat or manipulate <em>Dota 2</em> matches
                    </li>
                    <li>Automate gameplay decisions</li>
                    <li>Violate Valve's rules</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="section">
              <h2>5. No Data Collection</h2>
              <p>This App:</p>
              <ul>
                <li>Does NOT store user data</li>
                <li>Does NOT require accounts</li>
                <li>Does NOT track gameplay statistics</li>
              </ul>
            </div>

            <div className="section">
              <h2>6. Disclaimer</h2>
              <p>THE APP IS PROVIDED "AS IS" WITH NO GUARANTEES. WE:</p>
              <ul>
                <li>Are not affiliated with Valve Corporation</li>
                <li>Don't promise ranking improvements</li>
                <li>Accept no liability for gameplay outcomes</li>
              </ul>
            </div>

            <div className="section">
              <h2>7. Termination</h2>
              <p>
                We may restrict access if you violate these Terms. You may stop using the
                App at any time.
              </p>
            </div>

            <div className="section">
              <h2>8. Legal Notes</h2>
              <ul>
                <li>These Terms constitute the entire agreement</li>
                <li>If any clause is unenforceable, others remain valid</li>
                <li>No specific jurisdiction claimed</li>
              </ul>
            </div>

            <div className="section">
              <h2>9. Changes</h2>
              <p>We may update these Terms. Continued use means acceptance.</p>
            </div>

            <div className="section">
              <h2>10. Contact</h2>
              <p>
                Reach us at <a href="mailto:slelllq@gmail.com">slelllq@gmail.com</a> for
                support.
              </p>
            </div>
          </div>
          <Flex gap="small">
            <Button type="text" onClick={() => setCurrentStep(0)}>
              Cancel
            </Button>
            <Button type="primary" onClick={() => setCurrentStep(2)}>
              Agree
            </Button>
          </Flex>
        </Flex>
      )}
      {currentStep === 2 && (
        <Flex
          className={styles.overlay}
          justify="center"
          align="center"
          vertical
          gap="middle">
          <h1>The last step before we begin</h1>
          <p>Configure the lunch params</p>
          <Flex gap="small">
            <Button type="text" onClick={() => setCurrentStep(1)}>
              Cancel
            </Button>
            <Button type="primary" onClick={onFinish}>
              Done
            </Button>
          </Flex>
        </Flex>
      )}
    </main>
  );
};

export default Onboarding;
