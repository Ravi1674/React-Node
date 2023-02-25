import axios from "axios";
import React, { useEffect, useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import "./Dashboard.css";
import Table from "react-bootstrap/Table";

const Dashboard = () => {
    const baseURL = "http://www.mocky.io/v2/5d889c8a3300002c0ed7da42";

    const [userData, setUserData] = useState([]);
    const [filteredUser, setFilteredUser] = useState([]);
    const [filterType, setFilterType] = useState([]);
    useEffect(() => {
        async function getUserData() {
            const response = await axios.get(baseURL);
            const data = await response.data.items;
            setUserData(data);
            setFilteredUser(data);
        }

        getUserData();
    }, []);
    useEffect(() => {
        const data = userData?.filter((user) =>
            filterType.length > 0 && !filterType.includes(5 + "")
                ? filterType.includes(user.type + "")
                : userData
        );
        setFilteredUser(data);
    }, [filterType]);
    const checkboxList = [
        "All",
        "Type 0",
        "Type 1",
        "Type 2",
        "Type 3",
        "Type 4",
    ];
    const checkboxValue = [5, 0, 1, 2, 3, 4];
    const TYPE_COLORS = [
        "#48BEFF",
        "#3DFAFF",
        "#43C59E",
        "#3D7068",
        "#455b80",
        "#FFFFFF",
    ];

    return (
        <div style={{ padding: "0 5% 5%" }}>
            <form>
                <Table>
                    <tbody>
                        <tr>
                            {checkboxList.map((value, index) => (
                                <td>
                                    <Checkbox
                                        value={value}
                                        checkboxValue={checkboxValue[index]}
                                        filterType={filterType}
                                        setFilterType={setFilterType}
                                        colorVal={
                                            TYPE_COLORS[checkboxValue[index]]
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </Table>
            </form>
            <Table
                striped
                bordered
                hover
                responsive="lg"
                style={{
                    border: "2px solid #002d40",
                    marginTop: "1%",
                    wordWrap: "break-word",
                }}
            >
                <thead>
                    <tr className="first-tr">
                        <th>#</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Wallet-1</th>
                        <th>Wallet-2</th>
                        <th>Wallet-3</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUser.map((user, index) => (
                        <tr>
                            <td
                                style={{
                                    backgroundColor:
                                        TYPE_COLORS[`${user.type}`],
                                }}
                            >
                                {user.index}
                            </td>
                            <td>{user.email}</td>
                            <td>{user.fullName}</td>
                            <td>{user.wallet1}</td>
                            <td>{user.wallet2}</td>
                            <td>{user.wallet3}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Dashboard;
