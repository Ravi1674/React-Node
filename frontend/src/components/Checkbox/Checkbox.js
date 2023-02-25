import React from "react";
import Form from "react-bootstrap/Form";

const Checkbox = (props) => {
    const { value, checkboxValue, filterType, setFilterType, colorVal } = props;
    const handleCheckBoxCheck = (e) => {
        if (e.target.checked) {
            setFilterType([...filterType, e.target.value]);
        } else {
            setFilterType(filterType.filter((type) => type !== e.target.value));
        }
    };
    return (
        <div
            style={{
                borderBottom: `10px solid ${colorVal}`,
                textAlign: "center",
            }}
        >
            <Form.Group className="mb-6">
                <Form.Check
                    type="checkbox"
                    value={checkboxValue}
                    // value={value.length>4 ? value.substr(5) : 5}
                    label={value}
                    onChange={(e) => handleCheckBoxCheck(e)}
                />
            </Form.Group>
        </div>
    );
};

export default Checkbox;
