import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

const Accordion = withStyles((theme) => ({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function FaqAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>What is iSabiTV?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            iSabiTV is a free online streaming “Ads based” service that offers a
            wide variety of Afrocentric related content. These include movies,
            TV shows, kids and family, documentaries, and much more. iSabiTV
            also has a User Generated Content (UGC) interface that allows for
            users to upload their own personal and unique content worthy of
            showcasing. iSabiTV also has a contests page (coming soon) that
            would put up family friendly and mind challenging contests where the
            contestants get to win various prices.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>
            Is there a limit to how many movies I can stream?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            There is absolutely no limit to what you can stream. You are only
            able to download content on your mobile app if the uploader allows
            for the content to be downloaded.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>
            How much does it cost to use the iSabiTV Platform?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Right now, there is absolutely no cost associated with the platform.
            Just sign up and access all our content offerings. You are also able
            to upload your own unique and value adding content.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel3d-header">
          <Typography>Where can I watch?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can watch anywhere and anytime with no restrictions. All you
            have to do is to login with your iSabiTV account and start watching
            right away. You can also download your favorite content if allowed
            by the creator on the iOS or Android mobile app. If using your web
            browser, you are only able to watch but not download.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel5'}
        onChange={handleChange('panel5')}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel3d-header">
          <Typography>How can I cancel or close my account?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You are able to cancel or close your account right from the settings
            option on your profile.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel6'}
        onChange={handleChange('panel6')}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel3d-header">
          <Typography>Is iSabiTV safe for kids?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The iSabiTV platform is designed to have only family friendly
            content that should be safe for kids. While we cannot always control
            what individual users upload, we do have a flag mechanism that
            allows for you to flag any inappropriate content. This would allow
            us to intervene and take the appropriate action.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
