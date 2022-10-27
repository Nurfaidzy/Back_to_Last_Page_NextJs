import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "antd";
import Link from "next/link";
export default function CariId() {
  const [datas, setDatas] = useState([]);
  const router = useRouter();
  const { data } = router.query;
  const sinomor = data;
  const res = async () => {
    try {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/" + sinomor
      );
      setDatas(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    res();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <div>id : {datas.id}</div>
      <div>Title : {datas.title}</div>
      <div>Body : {datas.body}</div>
      <Button>
        <Link href={`/${datas.id}`}>Kembali</Link>
      </Button>
    </div>
  );
}
