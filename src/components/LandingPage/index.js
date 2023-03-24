'use client'
import React from 'react';
import Link from 'next/link';
import { useTheme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

import { Logo } from '../ui/logo';
import FaqAccordions from './Faq';
import Footer from '../widgets/footer';
import { Box } from '../widgets/Box';
import { STATUS_AUTH } from '../../constants/auth';
import Image from 'next/image';

const LandingPage = inject('auth')(
  observer((props) => {
    const theme = useTheme();
    const { auth: storeAuth } = props;

    return (
      <>
        {/* Banner */}
        <div className="isabitv-banner">
          <div className="wrapper">
            <div className="d-flex justify-content-between align-items-center px-4 navbar">
              <Logo pageUrl="/" />
              <Link href={storeAuth.status === STATUS_AUTH ? '/home' : '/auth'}>
                <Box
                  className="clickable"
                  bgcolor={theme.palette.primary.main}
                  color={theme.palette.background.default}
                  textAlign="center"
                  py={1}
                  px={2}
                  borderRadius={4}
                  fontSize={20}
                >
                  {storeAuth.status === STATUS_AUTH ? 'App' : 'Sign In'}
                </Box>
              </Link>
            </div>
            <div className="d-flex justify-content-center flex-column align-items-center header">
              <div className="heading text-center">
                All your Afrocentric Content in one place
              </div>
              <div className="sub-heading text-center pt-4">
                Watch thousands of amazing movies and TV shows. Available
                Anywhere
              </div>
            </div>
          </div>
        </div>
        <div className="isabitv-bg">
          <div className="bg1" />
          <div className="bg2" />
          <div className="bg3" />
          <div className="bg4" />
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
        {/* Introduce Mobile Apps */}
        <div className="isabitv-intro">
          <div className="img">
            <Image src="/image/bg_intro.png" alt="intro" width='100' height='100' style={{width: 'auto', height: 'auto'}} />
          </div>
          <div className="desc m-auto">
            <div className="title">
              Stream any media at Anytime with iSabiTV App
            </div>
            <div className="sub-title">
              Building a repository for Afrocentric related content and this
              includes cultural content, historical content, educational
              content, movies, tv shows, kids and family shows, skills based
              content and so much more
            </div>
            <div className="icon">
              <Link
                href="https://apps.apple.com/us/app/isabitv/id1522221735"
                className="app"
              >
                <Image
                  src="/image/market/app_store.svg"
                  alt=""
                  className="img-fluid"
                  width='100' height='100' style={{width: 'auto', height: 'auto'}}
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.rvtech.iSabiTV"
                className="app"
              >
                <Image
                  src="/image/market/app_google.svg"
                  alt=""
                  width='100' height='100' style={{width: 'auto', height: 'auto'}}
                  className="img-fluid"
                />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }),
);

export default LandingPage;
