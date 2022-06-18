import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import monent from "moment";
import "./less/List.less";

import { Space, Table, Button, message } from "antd";
import { useState } from "react";

import { ListApi, ArticleDelApi } from "../request/api";

function MyTitle(props) {
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.subTitle}</div>
    </div>
  );
}

export default function List() {
  const navigate = useNavigate();
  const [pagination, setPagenation] = useState({
    current: 1,
    pageSize: 6,
    totoal: 6,
  });

  const [arr, setArr] = useState([
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
  ]);

  const getList = (current, pageSize) => {
    ListApi({
      num: current,
      count: pageSize,
    }).then((res) => {
      console.log(res);
      if (res.errCode === 0) {
        let { num, count, total } = res.data;
        setPagenation({
          current: num,
          total: total,
          pageSize: count,
        });
        let newArr = JSON.parse(JSON.stringify(res.data.arr));
        let myArr = [];
        newArr.map((item) => {
          let obj = {
            author: item.author,
            key: item.id,
            date: monent(item.data).format("YYYY - MM - DD hh:mm:ss"),
            mytitle: <MyTitle title={item.title} subTitle={item.subTitle} />,
          };
          myArr.push(obj);
        });
        setArr(myArr);
      }
    });
  };
  const delFn = (id) => {
    ArticleDelApi({ id }).then((res) => {
      if (res.errCode === 0) {
        message.success("Delete Successfully");
        window.reload();
      } else {
        message.error(res.message);
      }
    });
  };

  useEffect(() => {
    getList(pagination.current, pagination.pageSize);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Title",
      dataIndex: "mytitle",
      key: "mytitle",
    },
    {
      title: "Action",
      key: "action",
      render: (text) => (
        <Space size="middle">
          <Button
            size="small"
            type="primary"
            onClick={() => {
              navigate("/edit/" + text.key);
            }}
          >
            Edit{" "}
          </Button>
          <Button size="small" type="danger" onClick={() => delFn(text.key)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const pageChange = (args) => {
    getList(args.current, args.pageSize);
  };

  return (
    <div className="listTable">
      <Table
        columns={columns}
        dataSource={arr}
        pagination={pagination}
        onChange={pageChange}
      />
    </div>
  );
}
