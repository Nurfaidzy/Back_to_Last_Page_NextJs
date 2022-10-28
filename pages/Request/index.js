import React from "react";
import { withRouter } from "next/router";
import { Button } from "antd";
import Link from "next/link";

const index = withRouter((props) => {
  const id = props.router.query.id;
  const title = props.router.query.title;
  return (
    <div style={{ padding: "30px" }}>
      <div>
        <p>id : {id}</p>
        <p>Title : {title}</p>
      </div>
      <div>
        <Button>
          <Link href={`/?row=${id}`}>Kembali</Link>
        </Button>
      </div>
    </div>
  );
});

export default index;
