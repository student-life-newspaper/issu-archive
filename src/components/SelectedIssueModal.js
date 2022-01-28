import React, { useState } from 'react';
import '../App.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactHtmlParser from 'react-html-parser';
import {
  Box,
  Button,
  Modal,
  Popover,
  Tooltip,
} from '@material-ui/core';
import { issueSchoolYear, monthArr } from './utils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '85%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

const SelectedIssueModal = ({
  issueObj, modalOpen, setModalOpen,
}) => {
  const handleClose = () => setModalOpen(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleLinkClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLinkClose = () => {
    setAnchorEl(null);
  };

  const generateLink = () => {
    if (issueObj.isSpecial) {
      return `https://studlife.com/pdf?iaYear=${issueSchoolYear(issueObj.date)}&iaCategory=${issueObj.category}&iaDate=${issueObj.date}&iaIsSpecial=${true}`;
    }
    const issueJSDate = new Date(issueObj.date);
    const semester = (issueJSDate.getMonth() + 1) <= 6 ? 'Spring' : 'Fall';
    const month = monthArr[issueJSDate.getMonth()];
    return `https://studlife.com/pdf?iaYear=${issueSchoolYear(issueObj.date)}&iaCategory=${semester}&iaMonth=${month}&iaDate=${issueObj.date}`;
  };

  const open = Boolean(anchorEl);
  const id = open ? 'link-popover' : undefined;
  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="article-headline">{issueObj.issueName}</h1>
          <Box sx={{ mb: 1 }}>
            {ReactHtmlParser(issueObj.embed)}
          </Box>
          <Box sx={{ display: 'inline' }}>
            <Button aria-describedby={id} variant="contained" onClick={handleLinkClick}>
              Link to this issue
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleLinkClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box p={2}>{generateLink()}</Box>
            </Popover>
          </Box>

          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={() => setCopied(false)}
            open={copied}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Copied"
          >
            <CopyToClipboard
              text={generateLink()}
              onCopy={() => setCopied(true)}
            >
              <Box sx={{ ml: 2, display: 'inline' }}>
                <Button aria-describedby="copy-to-clipboard" variant="contained">
                  Copy link
                </Button>
              </Box>
            </CopyToClipboard>
          </Tooltip>

        </Box>
      </Modal>
    </div>
  );
};

export default SelectedIssueModal;
