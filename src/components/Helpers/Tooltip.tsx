import {useState} from 'react';
import {Html} from '@react-three/drei';
import CyberButtonUI from "../CyberButtonUI/CyberButtonUI.tsx";

const Tooltip = ({position, children, resetComponent}: any) => {
  const [minimized, setMinimized] = useState(false);

  // Styles for the tooltip container
  const containerStyle: any = {
    zIndex: 9999999,
    position: "fixed",
    left: 20,
    top: 20,
    color: 'white',
    background: 'rgba(255, 0, 0, 0.1)',
    padding: '20px',
    width: !minimized ?'220px': "100px",
    borderRadius: '8px',
    overflow: 'hidden', // Ensure content does not spill out when minimized
    height: minimized ? '40px' : 'auto', // Control height based on minimized state
    transition: 'height 0.3s', // Smooth transition for height change
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  };

  // Style for the minimize/maximize button
  const buttonStyle = {
    marginTop: '10px',
    cursor: 'pointer', // Make it clear it's clickable
  };

  return (
      <div style={containerStyle}>
        {!minimized && children}
        <div style={{display: "flex", gap:"16px"}}>
          {!minimized && resetComponent}
          <CyberButtonUI
            onClick={() => setMinimized(!minimized)} // Toggle minimized state
            style={buttonStyle}
          >
            {minimized ? 'Expand' : 'Minimize'}
          </CyberButtonUI>
        </div>
      </div>
  );
};

export default Tooltip;