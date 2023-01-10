import * as React from "react";
import UnitSelector from "./UnitSelector";

interface EditOptionsMenuProps {
  color: string;
  onColorChange: (color: string) => void;
}

const EditOptionsMenu: React.FC<EditOptionsMenuProps> = ({
  color,
  onColorChange,
}) => {
  const [numInputValuesEl, setNumInputValuesEl] = React.useState(2);
  const [showRangeInput, setShowRangeInput] = React.useState(false);
  const [unit, setUnit] = React.useState("kg/ha");

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumInputValuesEl(parseInt(event.target.value));
  };
  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(event.target.value);
  };
  const setTreatmentZones = () => {
    setShowRangeInput(false);
  };
  const inputValuesEl = [];
  for (let i = 0; i < numInputValuesEl; i++) {
    inputValuesEl.push(
      <>
        <br />
        <label>
          Zone {i + 1}
          <input
            type="number"
            id={`treatmentZoneValue${i + 1}`}
            min={0}
            max={10_000}
          />
        </label>
        <br />
      </>
    );
  }
  const selectNumberOfZones = (
    <>
      <label>
        Number of zones:
        <input
          type="range"
          min={2}
          max={5}
          value={numInputValuesEl}
          onChange={handleRangeChange}
        />
      </label>
    </>
  );

  return (
    <div>
      {showRangeInput ? (
        <>
          {selectNumberOfZones}
          <UnitSelector value={unit} onChange={handleUnitChange} />
          {inputValuesEl}
          <button onClick={setTreatmentZones}>Set treatment zones</button>
        </>
      ) : (
        <button onClick={() => setShowRangeInput(true)}>
          Create treatment zones
        </button>
      )}
    </div>
  );
};

export default EditOptionsMenu;

/*
<button
        key={i}
        onClick={() => onColorChange(`#ff${9999 - i * (9999 / numShades)}`)}
      >
        Treatment zone {i + 1}
      </button> */
