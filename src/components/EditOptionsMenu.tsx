import * as React from 'react';

interface EditOptionsMenuProps {
  color: string;
  onColorChange: (color: string) => void;
}

const EditOptionsMenu: React.FC<EditOptionsMenuProps> = ({ color, onColorChange }) => {
  return (
    <div>
      <button onClick={() => onColorChange('red')}>Set to red</button>
      <button onClick={() => onColorChange('green')}>Set to green</button>
      <button onClick={() => onColorChange('blue')}>Set to blue</button>
    </div>
  );
};

export default EditOptionsMenu;
