import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { withRouter } from "next/router";

import Highlighter from "react-highlight-words";

import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

import { call_api } from "../Redux/Action/DataAction";

const Home = withRouter((props) => {
  const nomor = props.router.query.row;
  var final = Math.ceil(nomor / 10);
  var akhir = final;
  isNaN(final) ? (akhir = 1) : (akhir = final);

  const dispatch = useDispatch();
  const response = useSelector((state) => state.DataReducer);

  useEffect(() => {
    dispatch(call_api());
  }, [dispatch]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columnss = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "50%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Action",

      key: "action",
      render: (record) => (
        <Space size="middle">
          <Link href={`/Request/?id=${record.id}&title=${record.title}`}>
            Request
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        style={{ padding: "50px" }}
        columns={columnss}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <p>Body isi</p>
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.body}
              </p>
            </>
          ),
          rowExpandable: (record) => record.id !== "Not Expandable",
        }}
        dataSource={response.data}
        rowKey={"id"}
        pagination={{ defaultCurrent: akhir }}
      />
      ;
    </>
  );
});

export default Home;
