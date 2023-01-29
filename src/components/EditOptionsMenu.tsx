import * as React from "react";
import UnitSelector from "./UnitSelector";

interface EditOptionsMenuProps {
  color: string;
  rate: number;
  onColorChange: (color: string, rate:number) => void;
}

const EditOptionsMenu: React.FC<EditOptionsMenuProps> = ({
  color,
  rate,
  onColorChange,
}) => {
  const [numInputValuesEl, setNumInputValuesEl] = React.useState(2);
  const [showRangeInput, setShowRangeInput] = React.useState(false);
  const [showTreatmentZones, setShowTreatmentZones] = React.useState(false);
  const [unit, setUnit] = React.useState("kg/ha");
  const [zoneValues, setZoneValues] = React.useState(Array(numInputValuesEl).fill(0));


  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumInputValuesEl(parseInt(event.target.value));
  };
  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(event.target.value);
  };
  const setTreatmentZones = () => {
    setShowRangeInput(false);
    setShowTreatmentZones(true);

  };
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff"];
  
  const buttons = [];
  for (let i = 0; i < numInputValuesEl; i++) {
    buttons.push(
      <div key={i}>
        <button
          style={{ backgroundColor: colors[i % colors.length] }}
          // eslint-disable-next-line no-loop-func
          onClick={() => onColorChange(colors[i % colors.length], rate = zoneValues[i])}
        >
          {`Zone ${i + 1}: ${zoneValues[i]} ${unit}`}
        </button>
        <br />
      </div>
    );
  }
  


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
            onChange={(e) => {
              const newZoneValues = [...zoneValues];
              newZoneValues[i] = parseInt(e.target.value);
              setZoneValues(newZoneValues);
              console.log(zoneValues)
            }}
          />
        </label>
        <br />
      </>
    );
  }
  const selectNumberOfZones = (
    <>
      <label>
      <div>
        Number of zones:
        </div>
        <div>
        <input
          type="range"
          min={2}
          max={5}
          value={numInputValuesEl}
          onChange={handleRangeChange}
        />
        </div>
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
        <>
        {showTreatmentZones && buttons}
        {!showTreatmentZones && (
        <button onClick={() => setShowRangeInput(true)}>
          Create treatment zones
        </button>)}
        </>
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
