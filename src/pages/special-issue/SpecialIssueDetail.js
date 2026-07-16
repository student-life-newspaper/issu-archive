import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  Box, Button, Popover, Tooltip,
} from '@material-ui/core';
import FeaturedIssue from '../../components/FeaturedIssue';

const SpecialIssueDetail = ({ issue, onBack }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [copied, setCopied] = useState(false);
  const issueLink = window.location.href;
  const popoverOpen = Boolean(anchorEl);
  const popoverId = popoverOpen ? 'special-issue-link-popover' : undefined;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article className="special-issue-detail">
      <button type="button" className="special-issue-detail__back" onClick={onBack}>
        Back to special issues
      </button>

      <div className="special-issue-detail__embed">
        <FeaturedIssue issueName={issue.issueName} embed={issue.embed} />
      </div>

      <Box className="special-issue-detail__buttons">
        <Button
          aria-describedby={popoverId}
          variant="contained"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          Link to this issue
        </Button>
        <Popover
          id={popoverId}
          open={popoverOpen}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Box p={2}>{issueLink}</Box>
        </Popover>
        <Tooltip
          PopperProps={{ disablePortal: true }}
          onClose={() => setCopied(false)}
          open={copied}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title="Copied"
        >
          <CopyToClipboard text={issueLink} onCopy={handleCopy}>
            <Button aria-describedby="copy-special-issue-link" variant="contained">
              Copy Link
            </Button>
          </CopyToClipboard>
        </Tooltip>
      </Box>
    </article>
  );
};

export default SpecialIssueDetail;
