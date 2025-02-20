import React, { useState } from 'react';
import '../App.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Popover,
  Tooltip,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
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
  maxHeight: '80vh',
};

const SelectedIssueModal = ({ issueObj, modalOpen, setModalOpen }) => {
  const handleClose = () => setModalOpen(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleLinkClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLinkClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const generateLink = () => {
    if (issueObj.specialCategory) {
      return `https://www.studlife.com/pdf?iaYear=${issueSchoolYear(issueObj.date)}&iaCategory=${issueObj.specialCategory}&iaDate=${issueObj.date}&iaIsSpecial=${true}`;
    }
    const issueJSDate = new Date(issueObj.date);
    const semester = issueJSDate.getMonth() + 1 <= 6 ? 'Spring' : 'Fall';
    const month = monthArr[issueJSDate.getMonth()];
    return `https://www.studlife.com/pdf?iaYear=${issueSchoolYear(issueObj.date)}&iaCategory=${semester}&iaMonth=${month}&iaDate=${issueObj.date}`;
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1 className="article-headline">{issueObj.issueName}</h1>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box id="modal-buttons-wrapper" sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
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
              <CopyToClipboard text={generateLink()} onCopy={handleCopy}>
                <Box sx={{ ml: 2, display: 'inline' }}>
                  <Button aria-describedby="copy-to-clipboard" variant="contained">
                    Copy Link
                  </Button>
                </Box>
              </CopyToClipboard>
            </Tooltip>
          </Box>
          <Box sx={{ mb: 1 }} id="modal-embed-wrapper">
            <span dangerouslySetInnerHTML={{ __html: issueObj.embed }} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SelectedIssueModal;
