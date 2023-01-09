import * as React from 'react';

interface EditOptionsMenuProps {
  color: string;
  onColorChange: (color: string) => void;
}

const EditOptionsMenu: React.FC<EditOptionsMenuProps> = ({ color, onColorChange }) => {
  const [numShades, setNumShades] = React.useState(0);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumShades(parseInt(event.target.value));
  };
  const [showRangeInput, setShowRangeInput] = React.useState(false);


  const shades = [];
  for (let i = 0; i < numShades; i++) {
    shades.push( <> <br/>
      <button
        key={i}
        onClick={() => onColorChange(`#ff${9999 - i * (9999 / numShades)}`)}
      >
        Treatment zone {i + 1}
      </button></>
    );
  }

  return (
    <div>
      {showRangeInput ? ( <>
      <label>
        Number of shades:
        <input type="range" min={2} max={5} value={numShades} onChange={handleRangeChange} />
      </label>
      {shades}
      </>
      ) : (
        <button onClick={() => setShowRangeInput(true)}>Create treatment zones</button>
      )}
      
    </div>
  );
};

export default EditOptionsMenu;
