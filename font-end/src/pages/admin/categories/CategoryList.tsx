import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Space, Table, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { CategoryType } from "../../../types/category";
import { listCategory, removeCategory } from "../../../api/category";
import swal from "sweetalert";



const { Text, Title } = Typography;

const CategoryList = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    const getCategories = async () => {
      const { data } = await listCategory();
      setCategories(data);
    };
    getCategories();
  }, []);



  // xu ly search

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<CategoryType[] | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const results = categories.filter(item =>
      item.name.toLowerCase().includes(term),
    );
    setSearchResults(results.length ? results : null);
  };





  const onHandleRemove = (record: CategoryType) => {
    try {
      swal({
        title: "Are you sure you want to delete?",
        text: "You cannot undo after deleting!",
        icon: "warning",
        // buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          removeCategory(record._id)
          
            .then(() => {
              swal("You have successfully deleted", {
                icon: "success",
              }).then(() => {
                setCategories(
                  categories.filter((item) => item._id !== record._id)
                );
              });
            })
            .catch(() => {
              swal(
                "Deletion failed, Please delete all products in this category !",
                {
                  icon: "error",
                }
              );
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (record: CategoryType) => (
        <Space size="middle">
          <NavLink to={"/admin/category/edit/" + record._id}>
            <EditOutlined />
          </NavLink>
          <Text type="danger">
            <DeleteOutlined onClick={() => onHandleRemove(record)} />
          </Text>
        </Space>
      ),
    },
  ];
  const data = categories?.map((item, index) => {
    return {
      key: index + 1,
      _id: item._id,
      name: item.name,
    };
  });

  const dataSearch = searchResults?.map((item, index) => {
    return {
      key: index + 1,
      _id: item._id,
      name: item.name,
    }
  })
  return (
    <div>

      <section className="home-section">
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Categories</Breadcrumb.Item>
          {/* <input type="text" value={searchTerm} onChange={handleSearch} /> */}
        </Breadcrumb>

        <div className="home-content" style={{ padding: 40 }}>
          <Title level={2}>CATEGORY LIST</Title>
          <Button type="primary" style={{ marginBottom: 16 }} ghost>
            <NavLink to={"add"}>Add Category</NavLink>
          </Button>
          <input type="text" value={searchTerm} onChange={handleSearch} />
          {searchResults ? (
            <Table columns={columns} dataSource={dataSearch} pagination={{ pageSize: 5 }} />
          ) : (
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
          )}
        </div>




      </section>



    </div>


  );
};

export default CategoryList;
