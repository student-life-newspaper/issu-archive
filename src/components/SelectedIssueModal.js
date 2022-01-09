import React from 'react';
import '../App.css';
import ReactHtmlParser from 'react-html-parser';
import {
  Box,
  Modal,
} from '@material-ui/core';

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
  issueName, embed, modalOpen, setModalOpen,
}) => {
  const handleClose = () => setModalOpen(false);

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="article-headline">{issueName}</h1>
          {ReactHtmlParser(embed)}
        </Box>
      </Modal>
    </div>
  );
};

export default SelectedIssueModal;
