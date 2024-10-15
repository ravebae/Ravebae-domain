import axios from 'axios';
import './App.css';
import { useForm } from 'react-hook-form';

import AppStore from './assets/app.svg';
import PlayStore from './assets/play.svg';
import { useState } from 'react';

function App() {
  const { register, handleSubmit } = useForm();
  const [sent, setSent] = useState(false);

  const onHandleSubmit = async ({ email }: any) => {
    let api = import.meta.env.VITE_CONVERTKIT_API_KEY;
    const payload = {
      email_address: email,
      api,
    };

    console.log('EMAIL', email);
    if (email) {
      setSent(true);
      await axios.post(import.meta.env.VITE_SUBSCRIBE_LINK, payload, {
        headers: {
          Accept: 'application/json; charset=utf-8',
          'Content-Type': 'application/json',
        },
      });
    }
    setTimeout(() => {
      setSent(false);
    }, 60000);
  };

  return (
    <>
      <div id='background'></div>
      <main id='main_container'>
        <section id={'title'}>
          <h1>
            FIND YOUR <span className={'underline'}>MATCH</span>
            <br /> ONE RAVE AT A TIME
          </h1>
        </section>
        <section id={'access_container'}>
          <h3 className={'subtitle'}>Sign up for early access</h3>
          <form id={'access_wrapper'} onSubmit={handleSubmit(onHandleSubmit)}>
            <input
              placeholder='Email Address'
              type='email'
              required
              {...register('email')}
            />
            <input
              type='submit'
              id='submit-btn'
              disabled={sent}
              className={sent ? 'sent' : ''}
              value={sent ? 'Sent' : 'Join now'}
            />
            {sent ? (
              <p id='confirmation'>A confirmation email has been sent.</p>
            ) : (
              <></>
            )}
          </form>
        </section>
        <section id={'available_container'}>
          <h3 className={'subtitle'}>AVAILABLE SOON AT:</h3>
          <div id={'logo_wrapper'}>
            <img className={'logo'} src={AppStore} />
            <img className={'logo'} src={PlayStore} />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
