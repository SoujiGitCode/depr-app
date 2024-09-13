import { Typography } from '@mui/material';

interface CustomLabelProps {
  name: string;
  required: boolean;
}

const CustomLabel = ({ name, required }: CustomLabelProps) => (




  <label style={{
    padding: '8px 0',
    fontFamily: 'Montserrat-Medium',
    fontWeight: 'normal',
    fontSize: '1rem',
    lineHeight: 1.5
  }}>
    {name}{required && <span style={{ color: 'red', position: 'relative', bottom: '-0.2em' }}>*</span>}
  </label>
);

export default CustomLabel;
