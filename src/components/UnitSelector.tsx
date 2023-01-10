import * as React from "react";

interface UnitSelectorProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
        <br/>
      <select value={value} onChange={onChange}>
        <option value="kg/ha">kg/ha</option>
        <option value="l/ha">l/ha</option>
        <option value="lbs/ac">lbs/ac</option>
        <option value="gal/ac">gal/ac</option>
      </select>
    </div>
  );
};

export default UnitSelector;
