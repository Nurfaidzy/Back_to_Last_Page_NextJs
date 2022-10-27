import { useRouter } from "next/router";
import Index from "./index";
export default function idIndex() {
  const router = useRouter();
  const { id } = router.query;
  const nomor = parseInt(id);
  return <Index nomor={nomor} />;
}
