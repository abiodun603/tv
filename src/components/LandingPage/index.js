import React from 'react';
import Link from 'next/link';
import { Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Logo } from '../ui/logo';
import { ButtonContainer } from '../widgets/Button';
import FaqAccordions from './Faq';
import Footer from '../widgets/footer';

const LandingPage = () => {
  const theme = useTheme();

  return (
    <>
      {/* Banner */}
      <div className="isabitv-banner">
        <div className="wrapper">
          <div className="d-flex justify-content-between align-items-center px-4 navbar">
            <Logo />
            <ButtonContainer size="large">Sign In</ButtonContainer>
          </div>
          <div className="d-flex justify-content-center flex-column align-items-center header">
            <div className="heading text-center">
              All your Afrocentric Content in one place
            </div>
            <div className="sub-heading text-center pt-4">
              Watch thousands of amazing movies and TV shows. Available Anywhere
            </div>
          </div>
        </div>
      </div>
      {/* FQAs */}
      <div className="isabitv-faq">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="heading py-4">Frequently Asked Questions</div>
          <div className="wrapper">
            <FaqAccordions />
          </div>
        </div>
      </div>
      <div className="isabitv-bg">
        <div className="bg1" />
        <div className="bg2" />
        <div className="bg3" />
        <div className="bg4" />
      </div>
      {/* Introduce Mobile Apps */}
      <div className="isabitv-intro">
        <div className="img">
          <img src="/image/bg_intro.png" alt="intro" />
        </div>
        <div className="desc m-auto">
          <div className="title">
            Stream any media at Anytime with iSabiTV App
          </div>
          <div className="sub-title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
          <div className="icon">
            <Link
              href="https://apps.apple.com/us/app/isabitv/id1522221735"
              className="app"
            >
              <img
                src="/image/market/app_store.svg"
                alt=""
                className="img-fluid"
              />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.rvtech.iSabiTV"
              className="app"
            >
              <img
                src="/image/market/app_google.svg"
                alt=""
                className="img-fluid"
              />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
