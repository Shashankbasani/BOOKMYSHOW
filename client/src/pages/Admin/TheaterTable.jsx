import { useEffect, useState } from "react";
import { Table, Button, Tag } from "antd";
import { GetAllTheaters } from "../../API/theater";
import TheaterForm from "./TheaterForm";

function TheaterList() {
  const [theater, setTheater] = useState([]); 
  const [ismodel, setIsmodel] = useState(false); 

  async function getData() {
    const response = await GetAllTheaters();
    const allTheaters = response.data;

    setTheater(
      allTheaters.map((i) => ({
        ...JSON.parse(JSON.stringify(i)),
        key: i._id, 
      }))
    );
  }

  useEffect(() => {
    getData();
  }, []);

  const TableHeading = [
    {
      title: "Theater Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Owner ID",
      dataIndex: "owner",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setIsmodel(true);
        }}
        style={{ marginBottom: "16px" }}
      >
        Add a Theater
      </Button>

      {ismodel && (
        <TheaterForm
          ismodel={ismodel}
          setIsmodel={setIsmodel}
          setTheater={setTheater}
        />
      )}

      <Table columns={TableHeading} dataSource={theater} />
    </div>
  );
}

export default TheaterList;
